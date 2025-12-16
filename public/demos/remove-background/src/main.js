import { AutoModel, AutoProcessor, RawImage, env } from "@huggingface/transformers";
// import * as transformers from "https://ibelem.github.io/webnn-developer-preview/assets/dist_transformers/1.22.0-dev.20250325/transformers.js";

// Constants
const EXAMPLE_URL =
  "https://images.pexels.com/photos/5965592/pexels-photo-5965592.jpeg?auto=compress&cs=tinysrgb&w=1024";

// Reference the elements that we will need
const status = document.getElementById("status");
const deviceLabel = document.getElementById("device");
const fileUpload = document.getElementById("upload");
const imageContainer = document.getElementById("container");
const example = document.getElementById("example");

let cachedHfDomain = null;

const getHuggingFaceDomain = async () => {
  if (cachedHfDomain) {
    return cachedHfDomain;
  }

  const mainDomain = "huggingface.co";
  const mirrorDomain = "hf-mirror.com";
  const testPath = "/webml/models-moved/resolve/main/01.onnx";

  // Helper to test a specific domain with a timeout
  const checkDomain = async domain => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2000); // 2 second timeout

    try {
      const response = await fetch(`https://${domain}${testPath}`, {
        method: "HEAD", // Use HEAD to download headers only (lighter than GET)
        signal: controller.signal,
        cache: "no-store",
      });
      clearTimeout(timeoutId);
      return response.ok;
    } catch (error) {
      console.log(`Error reaching ${domain}:`, error);
      clearTimeout(timeoutId);
      return false;
    }
  };

  // 1. Try the main domain first
  const isMainReachable = await checkDomain(mainDomain);
  if (isMainReachable) {
    cachedHfDomain = mainDomain;
    return mainDomain;
  }

  // 2. If main fails, try the mirror
  const isMirrorReachable = await checkDomain(mirrorDomain);
  if (isMirrorReachable) {
    console.log(`Hugging Face main domain unreachable. Switching to mirror: ${mirrorDomain}`);
    cachedHfDomain = mirrorDomain;
    return mirrorDomain;
  }

  // 3. Default fallback
  cachedHfDomain = mainDomain;
  return mainDomain;
};

status.textContent = "Loading model...";

function getDeviceConfig(deviceParam, dtypeParam) {
  const defaultDevice = 'webnn-gpu';
  const defaultDtype = 'fp16';
  const webnnDevices = ['webnn-gpu', 'webnn-cpu', 'webnn-npu'];
  const supportedDtypes = ['fp16', 'fp32', 'int8'];

  const device = (deviceParam || defaultDevice).toLowerCase();
  const dtype = (dtypeParam && supportedDtypes.includes(dtypeParam.toLowerCase()))
    ? dtypeParam.toLowerCase()
    : (webnnDevices.includes(device) ? defaultDtype : 'fp16');

  // const FREE_DIMENSION_HEIGHT = 1024;
  // const FREE_DIMENSION_WIDTH = 1024;

  const sessionOptions = webnnDevices.includes(device)
    ? {
      freeDimensionOverrides: {
        batch_size: 1,
        // height: FREE_DIMENSION_HEIGHT,
        // width: FREE_DIMENSION_WIDTH,
      },
      logSeverityLevel: 0,
      model_type: "custom"
    }
    : {
      logSeverityLevel: 0,
      model_type: "custom"
    };

  return { device, dtype, sessionOptions };
}

const urlParams = new URLSearchParams(window.location.search);
let { device, dtype, sessionOptions } = getDeviceConfig(urlParams.get('device'), urlParams.get('dtype'));

let deviceValue = 'WebNN GPU';
switch (device) {
  case 'webgpu':
    deviceValue = 'WebGPU';
    break;
  case 'webnn-gpu':
    deviceValue = 'WebNN GPU';
    break;
  case 'webnn-cpu':
    deviceValue = 'WebNN CPU';
    break;
  case 'webnn-npu':
    deviceValue = 'WebNN NPU';
    break;
  default:
    deviceValue = 'WebNN GPU';
}

deviceLabel.textContent = deviceValue;
if (!['webgpu', 'webnn-gpu', 'webnn-cpu', 'webnn-npu'].includes(device)) {
  status.textContent = `Unsupported device ${device}. Falling back to WebNN GPU.`;
  device = 'webnn-gpu';
}

// Default remoteHost is https://huggingface.co
// Comment the following line if you are not in China
let remoteHost = await getHuggingFaceDomain();
if (remoteHost !== 'huggingface.co') {
  // PRC users only, set remote host to mirror site of huggingface for model loading
  console.log(`Using alternative Hugging Face mirror: ${remoteHost}`);
  env.remoteHost = `https://${remoteHost}`;
}

const model = await AutoModel.from_pretrained("briaai/RMBG-1.4", {
  device: device,
  dtype: dtype,
  session_options: sessionOptions
});

const processor = await AutoProcessor.from_pretrained("briaai/RMBG-1.4", {
  // Do not require config.json to be present in the repository
  config: {
    do_normalize: true,
    do_pad: false,
    do_rescale: true,
    do_resize: true,
    image_mean: [0.5, 0.5, 0.5],
    feature_extractor_type: "ImageFeatureExtractor",
    image_std: [1, 1, 1],
    resample: 2,
    rescale_factor: 0.00392156862745098,
    size: { width: 1024, height: 1024 },
  },
});

status.textContent = "Ready";

example.addEventListener("click", (e) => {
  e.preventDefault();
  predict(EXAMPLE_URL);
});

fileUpload.addEventListener("change", function (e) {
  const file = e.target.files[0];
  if (!file) {
    return;
  }

  const reader = new FileReader();

  // Set up a callback when the file is loaded
  reader.onload = (e2) => predict(e2.target.result);

  reader.readAsDataURL(file);
});

// Predict foreground of the given image
async function predict(url) {
  // Read image
  const image = await RawImage.fromURL(url);

  // Update UI
  imageContainer.innerHTML = "";
  imageContainer.style.backgroundImage = `url(${url})`;

  // Set container width and height depending on the image aspect ratio
  const ar = image.width / image.height;
  const [cw, ch] = ar > 720 / 480 ? [720, 720 / ar] : [480 * ar, 480];
  imageContainer.style.width = `${cw}px`;
  imageContainer.style.height = `${ch}px`;

  status.textContent = "Analysing...";

  // Preprocess image
  const { pixel_values } = await processor(image);

  // Predict alpha matte
  const start = performance.now();
  const { output } = await model({ input: pixel_values });
  const end = performance.now();
  console.log(`AutoModel.from_pretrained("briaai/RMBG-1.4") execution time: ${(end - start).toFixed(2)} ms`);

  status.textContent = `AutoModel.from_pretrained("briaai/RMBG-1.4") execution time: ${(end - start).toFixed(2)} ms`;

  // Resize mask back to original size
  const mask = await RawImage.fromTensor(output[0].mul(255).to("uint8")).resize(
    image.width,
    image.height,
  );
  image.putAlpha(mask);

  // Create new canvas
  const canvas = document.createElement("canvas");
  canvas.width = image.width;
  canvas.height = image.height;
  const ctx = canvas.getContext("2d");
  ctx.drawImage(image.toCanvas(), 0, 0);

  // Update UI
  imageContainer.append(canvas);
  imageContainer.style.removeProperty("background-image");
  imageContainer.style.background = `url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAMAAADt3eJSAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAGUExURb+/v////5nD/3QAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAUSURBVBjTYwABQSCglEENMxgYGAAynwRB8BEAgQAAAABJRU5ErkJggg==")`;
}
