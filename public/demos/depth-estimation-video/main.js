import * as transformers from "https://ibelem.github.io/transformersjs-dists/3.7.3_1.23.0-dev.20250906/transformers.js";
transformers.env.backends.onnx.wasm.proxy = false;
transformers.env.backends.onnx.wasm.simd = true;
transformers.env.backends.onnx.wasm.numThreads = 1;
transformers.env.backends.onnx.wasm.wasmPaths = "https://ibelem.github.io/transformersjs-dists/3.7.3_1.23.0-dev.20250906/";

// import {
//   env,
//   AutoModel,
//   AutoImageProcessor,
//   RawImage,
// } from "@huggingface/transformers";

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

// Reference the elements that we will need
const deviceLabel = document.getElementById("device");
const status = document.getElementById("status");
const canvas = document.createElement("canvas");
const outputCanvas = document.getElementById("output-canvas");
const video = document.getElementById("video");
const sizeSlider = document.getElementById("size");
const sizeLabel = document.getElementById("size-value");
const scaleSlider = document.getElementById("scale");
const scaleLabel = document.getElementById("scale-value");

function setStreamSize(width, height) {
  video.width = outputCanvas.width = canvas.width = Math.round(width);
  video.height = outputCanvas.height = canvas.height = Math.round(height);
}

status.textContent = "Loading model...";

function getDeviceConfig(deviceParam, dtypeParam) {
  const defaultDevice = 'webnn-gpu';
  const defaultDtype = 'fp16';
  const webnnDevices = ['webnn-gpu', 'webnn-cpu', 'webnn-npu'];
  const supportedDtypes = ['fp16', 'fp32', 'int8'];

  const device = (deviceParam || defaultDevice).toLowerCase();
  const dtype = (dtypeParam && supportedDtypes.includes(dtypeParam.toLowerCase())) 
    ? dtypeParam.toLowerCase() 
    : (webnnDevices.includes(device) ? defaultDtype : 'fp32');

  const FREE_DIMENSION_HEIGHT = 504;
  const FREE_DIMENSION_WIDTH = 504;

  const sessionOptions = webnnDevices.includes(device)
    ? {
        freeDimensionOverrides: {
          batch_size: 1,
          height: FREE_DIMENSION_HEIGHT,
          width: FREE_DIMENSION_WIDTH,
        },
        logSeverityLevel: 0
      }
    : {
      logSeverityLevel: 0
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
  transformers.env.remoteHost = `https://${remoteHost}`; 
}

// Load model and processor
const model_id = "onnx-community/depth-anything-v2-small";

let model;
try {
  model = await transformers.AutoModel.from_pretrained(model_id, {
    device: device,
    dtype: dtype,
    session_options: sessionOptions
  });
} catch (err) {
  status.textContent = err.message;
  alert(err.message);
  throw err;
}

const processor = await transformers.AutoImageProcessor.from_pretrained(model_id);

// Set up controls
let size = 504;
processor.size = { width: size, height: size };
sizeSlider.addEventListener("input", () => {
  size = Number(sizeSlider.value);
  processor.size = { width: size, height: size };
  sizeLabel.textContent = size;
});
sizeSlider.disabled = false;

let scale = 0.4;
scaleSlider.addEventListener("input", () => {
  scale = Number(scaleSlider.value);
  setStreamSize(video.videoWidth * scale, video.videoHeight * scale);
  scaleLabel.textContent = scale;
});
scaleSlider.disabled = false;

status.textContent = "Ready";

let isProcessing = false;
let previousTime;
const context = canvas.getContext("2d", { willReadFrequently: true });
const outputContext = outputCanvas.getContext("2d", {
  willReadFrequently: true,
});
function updateCanvas() {
  const { width, height } = canvas;

  if (!isProcessing) {
    isProcessing = true;
    (async function () {
      // Read the current frame from the video
      context.drawImage(video, 0, 0, width, height);
      const currentFrame = context.getImageData(0, 0, width, height);
      const image = new transformers.RawImage(currentFrame.data, width, height, 4);

      // Pre-process image
      const inputs = await processor(image);

      // Predict depth map
      const { predicted_depth } = await model(inputs);
      const data = predicted_depth.data;
      const [bs, oh, ow] = predicted_depth.dims;

      // Normalize the depth map
      let min = Infinity;
      let max = -Infinity;
      outputCanvas.width = ow;
      outputCanvas.height = oh;
      for (let i = 0; i < data.length; ++i) {
        const v = data[i];
        if (v < min) min = v;
        if (v > max) max = v;
      }
      const range = max - min;

      const imageData = new Uint8ClampedArray(4 * data.length);
      for (let i = 0; i < data.length; ++i) {
        const offset = 4 * i;
        imageData[offset] = 255; // Set base color to red

        // Set alpha to normalized depth value
        imageData[offset + 3] = 255 * (1 - (data[i] - min) / range);
      }
      const outPixelData = new ImageData(imageData, ow, oh);
      outputContext.putImageData(outPixelData, 0, 0);

      if (previousTime !== undefined) {
        const fps = 1000 / (performance.now() - previousTime);
        status.textContent = `FPS: ${fps.toFixed(2)}`;
      }
      previousTime = performance.now();

      isProcessing = false;
    })();
  }

  window.requestAnimationFrame(updateCanvas);
}

// Start the video stream
navigator.mediaDevices
  .getUserMedia(
    { video: { width: 720, height: 720 } }, // Ask for square video
  )
  .then((stream) => {
    // Set up the video and canvas elements.
    video.srcObject = stream;
    video.play();

    const videoTrack = stream.getVideoTracks()[0];
    const { width, height } = videoTrack.getSettings();

    setStreamSize(width * scale, height * scale);

    // Start the animation loop
    setTimeout(updateCanvas, 50);
  })
  .catch((error) => {
    alert(error);
  });
