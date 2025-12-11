import * as transformers from "https://ibelem.github.io/transformersjs-dists/3.7.3_1.23.0-dev.20250906/transformers.js";
transformers.env.backends.onnx.wasm.proxy = false;
transformers.env.backends.onnx.wasm.simd = true;
transformers.env.backends.onnx.wasm.numThreads = 1;
transformers.env.backends.onnx.wasm.wasmPaths = "https://ibelem.github.io/transformersjs-dists/3.7.3_1.23.0-dev.20250906/";

// import { AutoModel, AutoProcessor, RawImage, env } from "@huggingface/transformers";

// Reference the elements that we will need
const deviceLabel = document.getElementById("device");
const status = document.getElementById("status");
const container = document.getElementById("container");
const overlay = document.getElementById("overlay");
const canvas = document.getElementById("canvas");
const video = document.getElementById("video");
const thresholdSlider = document.getElementById("threshold");
const thresholdLabel = document.getElementById("threshold-value");
const sizeSlider = document.getElementById("size");
const sizeLabel = document.getElementById("size-value");
const scaleSlider = document.getElementById("scale");
const scaleLabel = document.getElementById("scale-value");

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

function setStreamSize(width, height) {
  video.width = canvas.width = Math.round(width);
  video.height = canvas.height = Math.round(height);
  
  // Make sure overlay matches canvas exactly
  overlay.style.width = `${canvas.width}px`;
  overlay.style.height = `${canvas.height}px`;
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

  const sessionOptions = { logSeverityLevel: 0 };
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
const model_id = "webnn/yolo12n";
let model, processor;

try {
  status.textContent = "Loading model...";
  
  model = await transformers.AutoModel.from_pretrained(model_id, {
    device: device,
    dtype: dtype,
    session_options: sessionOptions
  });
  
  processor = await transformers.AutoProcessor.from_pretrained(model_id);

  // Configure processor to match model's expected input size (640x640)
  processor.feature_extractor.size = { width: 640, height: 640 };
  
  status.textContent = "Model loaded successfully!";
} catch (err) {
  console.error(err);
  let errorMessage = `Error: ${err.message}`;
  status.textContent = errorMessage;
  status.style.color = "red";
  
  // Stop execution
  throw err;
}

// Set up controls
let scale = 1;
scaleSlider.addEventListener("input", () => {
  scale = Number(scaleSlider.value);
  setStreamSize(video.videoWidth * scale, video.videoHeight * scale);
  scaleLabel.textContent = scale;
});
scaleSlider.disabled = false;

let threshold = 0.25;
thresholdSlider.addEventListener("input", () => {
  threshold = Number(thresholdSlider.value);
  thresholdLabel.textContent = threshold.toFixed(2);
});
thresholdSlider.disabled = false;

let size = 640;
sizeSlider.addEventListener("input", () => {
  size = Number(sizeSlider.value);
  processor.feature_extractor.size = { width: size, height: size };
  sizeLabel.textContent = size;
});
sizeSlider.disabled = false;

status.textContent = "Ready";

const COLOURS = [
  "#EF4444",
  "#4299E1",
  "#059669",
  "#FBBF24",
  "#4B52B1",
  "#7B3AC2",
  "#ED507A",
  "#1DD1A1",
  "#F3873A",
  "#4B5563",
  "#DC2626",
  "#1852B4",
  "#18A35D",
  "#F59E0B",
  "#4059BE",
  "#6027A5",
  "#D63D60",
  "#00AC9B",
  "#E64A19",
  "#272A34",
];

// Render a bounding box and label on the image
function renderBox(detection, canvasWidth, canvasHeight) {
  const { bbox, score, class: classId } = detection;
  if (score < threshold) return; // Skip boxes with low confidence

  const [x, y, width, height] = bbox;
  const color = COLOURS[classId % COLOURS.length];

  // Ensure coordinates are within bounds
  const clampedX = Math.max(0, Math.min(x, canvasWidth - width));
  const clampedY = Math.max(0, Math.min(y, canvasHeight - height));
  const clampedWidth = Math.max(1, Math.min(width, canvasWidth - clampedX));
  const clampedHeight = Math.max(1, Math.min(height, canvasHeight - clampedY));

  // Draw the box
  const boxElement = document.createElement("div");
  boxElement.className = "bounding-box";
  Object.assign(boxElement.style, {
    position: "absolute",
    left: `${clampedX}px`,
    top: `${clampedY}px`,
    width: `${clampedWidth}px`,
    height: `${clampedHeight}px`,
    border: `2px solid ${color}`,
    backgroundColor: "transparent",
    pointerEvents: "none",
    boxSizing: "border-box"
  });

  // Draw label
  const labelElement = document.createElement("span");
  labelElement.textContent = `${model.config.id2label[classId]} (${(100 * score).toFixed(1)}%)`;
  labelElement.className = "bounding-box-label";
  Object.assign(labelElement.style, {
    backgroundColor: color,
    color: "white",
    padding: "2px 6px",
    fontSize: "12px",
    position: "absolute",
    top: "-22px",
    left: "0px",
    whiteSpace: "nowrap",
    borderRadius: "2px"
  });

  boxElement.appendChild(labelElement);
  overlay.appendChild(boxElement);
}

function calculateIoU(boxA, boxB) {
  const [xA, yA, wA, hA] = boxA;
  const [xB, yB, wB, hB] = boxB;

  const x1 = Math.max(xA, xB);
  const y1 = Math.max(yA, yB);
  const x2 = Math.min(xA + wA, xB + wB);
  const y2 = Math.min(yA + hA, yB + hB);

  const intersection = Math.max(0, x2 - x1) * Math.max(0, y2 - y1);
  const areaA = wA * hA;
  const areaB = wB * hB;

  const union = areaA + areaB - intersection;
  return intersection / union;
}

function applyNMS(detections, iouThreshold = 0.5) {
  // Sort detections by confidence score in descending order
  detections.sort((a, b) => b.score - a.score);

  const filteredDetections = [];
  const used = new Array(detections.length).fill(false);

  for (let i = 0; i < detections.length; i++) {
    if (used[i]) continue;

    const detectionA = detections[i];
    filteredDetections.push(detectionA);

    for (let j = i + 1; j < detections.length; j++) {
      if (used[j]) continue;

      const detectionB = detections[j];
      
      // Only apply NMS to boxes of the same class
      if (detectionA.class === detectionB.class) {
        const iou = calculateIoU(detectionA.bbox, detectionB.bbox);
        if (iou > iouThreshold) {
          used[j] = true; // Suppress overlapping box
        }
      }
    }
  }

  return filteredDetections;
}

function processDetections(outputs, canvasWidth, canvasHeight) {
  // Clear previous detections
  overlay.innerHTML = "";

  // Process YOLOv12 outputs
  const predictions = outputs.tolist()[0]; // Get the first batch
  const numClasses = predictions.length - 4; // Subtract 4 for bbox coordinates
  const numPredictions = predictions[0].length; // Number of predictions

  let detections = [];

  // Process each prediction
  for (let i = 0; i < numPredictions; i++) {
    const x = predictions[0][i]; // center x (0-640)
    const y = predictions[1][i]; // center y (0-640)
    const w = predictions[2][i]; // width (0-640)
    const h = predictions[3][i]; // height (0-640)

    let maxScore = 0;
    let maxClassIndex = -1;

    for (let c = 0; c < numClasses; c++) {
      const score = predictions[c + 4][i];
      if (score > maxScore) {
        maxScore = score;
        maxClassIndex = c;
      }
    }

    if (maxScore < threshold) continue;

    // Convert from center coordinates to top-left coordinates
    // Scale from 640x640 model output to canvas dimensions
    const scaleX = canvasWidth / 640;
    const scaleY = canvasHeight / 640;
    
    const centerX = x * scaleX;
    const centerY = y * scaleY;
    const boxWidth = w * scaleX;
    const boxHeight = h * scaleY;
    
    const xmin = centerX - (boxWidth / 2);
    const ymin = centerY - (boxHeight / 2);

    detections.push({
      bbox: [xmin, ymin, boxWidth, boxHeight],
      score: maxScore,
      class: maxClassIndex,
    });
  }

  // Apply Non-Maximum Suppression to remove duplicate detections
  const filteredDetections = applyNMS(detections, 0.45); // Lower IoU threshold for better suppression

  // Debug: Log detection info
  if (filteredDetections.length > 0) {
    console.log(`Found ${filteredDetections.length} detections:`, 
      filteredDetections.map(d => ({
        class: model.config.id2label[d.class],
        score: d.score.toFixed(3),
        bbox: d.bbox.map(v => Math.round(v))
      }))
    );
  }

  // Render filtered detections
  filteredDetections.forEach((detection) => {
    renderBox(detection, canvasWidth, canvasHeight);
  });

  return filteredDetections.length;
}

let isProcessing = false;
let previousTime;
const context = canvas.getContext("2d", { willReadFrequently: true });
function updateCanvas() {
  const { width, height } = canvas;
  context.drawImage(video, 0, 0, width, height);

  if (!isProcessing) {
    isProcessing = true;
    (async function () {
      try {
        // Read the current frame from the video
        const pixelData = context.getImageData(0, 0, width, height).data;
        const image = new transformers.RawImage(pixelData, width, height, 4);

        // Process the image and run the model
        const inputs = await processor(image);
        const { outputs } = await model(inputs);

        // Process detections and render boxes
        const detectionCount = processDetections(outputs, width, height);

        if (previousTime !== undefined) {
          const fps = 1000 / (performance.now() - previousTime);
          status.textContent = `FPS: ${fps.toFixed(2)} | Detections: ${detectionCount}`;
        }
        previousTime = performance.now();
      } catch (error) {
        console.error("Detection error:", error);
        status.textContent = `Error: ${error.message}`;
      } finally {
        isProcessing = false;
      }
    })();
  }

  window.requestAnimationFrame(updateCanvas);
}

// Start the video stream
navigator.mediaDevices
  .getUserMedia(
    { video: true }, // Ask for video
  )
  .then((stream) => {
    // Set up the video and canvas elements.
    video.srcObject = stream;
    video.play();

    const videoTrack = stream.getVideoTracks()[0];
    const { width, height } = videoTrack.getSettings();

    setStreamSize(width * scale, height * scale);

    // Set container width and height depending on the image aspect ratio
    const ar = width / height;
    const [cw, ch] = ar > 720 / 405 ? [720, 720 / ar] : [405 * ar, 405];
    container.style.width = `${cw}px`;
    container.style.height = `${ch}px`;

    // Start the animation loop
    window.requestAnimationFrame(updateCanvas);
  })
  .catch((error) => {
    alert(error);
  });
