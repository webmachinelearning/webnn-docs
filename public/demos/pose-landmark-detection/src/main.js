import { AutoModel, AutoProcessor, RawImage, env }from "@huggingface/transformers";

const deviceLabel = document.getElementById("device");
const status = document.getElementById("status");
const container = document.getElementById("container");
const canvas = document.getElementById("canvas");
const video = document.getElementById("video");
const thresholdSlider = document.getElementById("threshold");
const thresholdLabel = document.getElementById("threshold-value");
const kpThresholdSlider = document.getElementById("kp-threshold");
const kpThresholdLabel = document.getElementById("kp-threshold-value");

let cachedHfDomain = null;

const getHuggingFaceDomain = async () => {
  if (cachedHfDomain) {
    return cachedHfDomain;
  }

  const mainDomain = "huggingface.co";
  const mirrorDomain = "hf-mirror.com";
  const testPath = "/webml/models-moved/resolve/main/01.onnx";

  const checkDomain = async domain => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2000);

    try {
      const response = await fetch(`https://${domain}${testPath}`, {
        method: "HEAD",
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

  const isMainReachable = await checkDomain(mainDomain);
  if (isMainReachable) {
    cachedHfDomain = mainDomain;
    return mainDomain;
  }

  const isMirrorReachable = await checkDomain(mirrorDomain);
  if (isMirrorReachable) {
    console.log(`Hugging Face main domain unreachable. Switching to mirror: ${mirrorDomain}`);
    cachedHfDomain = mirrorDomain;
    return mirrorDomain;
  }

  cachedHfDomain = mainDomain;
  return mainDomain;
};

function setStreamSize(width, height) {
  video.width = canvas.width = Math.round(width);
  video.height = canvas.height = Math.round(height);
}

status.textContent = "Loading model...";

function getDeviceConfig(deviceParam, dtypeParam) {
  const defaultDevice = 'webnn-gpu';
  const defaultDtype = 'fp32';
  const webnnDevices = ['webnn-gpu', 'webnn-cpu', 'webnn-npu'];
  const supportedDtypes = ['fp16', 'fp32', 'int8'];

  const device = (deviceParam || defaultDevice).toLowerCase();
  const dtype = (dtypeParam && supportedDtypes.includes(dtypeParam.toLowerCase()))
    ? dtypeParam.toLowerCase()
    : (webnnDevices.includes(device) ? defaultDtype : 'fp32');

  const sessionOptions = webnnDevices.includes(device)
  ? {
    freeDimensionOverrides: {
      batch_size: 1,
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
  console.log(`Using alternative Hugging Face mirror: ${remoteHost}`);
  env.remoteHost = `https://${remoteHost}`;
}

// ============================================================
// COCO 17-keypoint pose skeleton definition (0-indexed)
// ============================================================
const SKELETON = [
  [0, 1], [0, 2],           // nose -> eyes
  [1, 3], [2, 4],           // eyes -> ears
  [3, 5], [4, 6],           // ears -> shoulders
  [5, 6],                   // left shoulder <-> right shoulder
  [5, 7], [7, 9],           // left arm
  [6, 8], [8, 10],          // right arm
  [5, 11], [6, 12],         // shoulders -> hips
  [11, 12],                 // left hip <-> right hip
  [11, 13], [13, 15],       // left leg
  [12, 14], [14, 16],       // right leg
];

// Per-limb colors for skeleton edges (matches SKELETON order)
const LIMB_COLORS = [
  '#FF6B6B', '#FF6B6B',     // nose -> eyes (coral)
  '#FFA07A', '#FFA07A',     // eyes -> ears (light salmon)
  '#FFD93D', '#FFD93D',     // ears -> shoulders (gold)
  '#6BCB77',                // shoulders (green)
  '#4D96FF', '#4D96FF',     // left arm (blue)
  '#9B59B6', '#9B59B6',     // right arm (purple)
  '#6BCB77', '#6BCB77',     // torso sides (green)
  '#6BCB77',                // hips (green)
  '#FF6B6B', '#FF6B6B',     // left leg (coral)
  '#FFA07A', '#FFA07A',     // right leg (salmon)
];

// Per-keypoint colors
const KEYPOINT_COLORS = [
  '#FF0000',  // 0: Nose
  '#FF4500',  // 1: Left Eye
  '#FF4500',  // 2: Right Eye
  '#FFA500',  // 3: Left Ear
  '#FFA500',  // 4: Right Ear
  '#00CC00',  // 5: Left Shoulder
  '#00CC00',  // 6: Right Shoulder
  '#4D96FF',  // 7: Left Elbow
  '#9B59B6',  // 8: Right Elbow
  '#4D96FF',  // 9: Left Wrist
  '#9B59B6',  // 10: Right Wrist
  '#FF6B6B',  // 11: Left Hip
  '#FFA07A',  // 12: Right Hip
  '#FF6B6B',  // 13: Left Knee
  '#FFA07A',  // 14: Right Knee
  '#FF6B6B',  // 15: Left Ankle
  '#FFA07A',  // 16: Right Ankle
];

// Person-level colors (for bounding box / label)
const PERSON_COLORS = [
  '#FF3838', '#48F90A', '#00C2FF', '#FFB21D', '#FF37C7',
  '#8438FF', '#3DDB86', '#FF9D97', '#CFD231', '#00D4BB',
];

// ============================================================
// Load model and processor
// ============================================================
const model_id = "webnn/yolo26n-pose-ONNX";
let model, processor;

try {
  status.textContent = "Loading model...";

  model = await AutoModel.from_pretrained(model_id, {
    device: device,
    dtype: dtype,
    session_options: sessionOptions,
  });

  processor = await AutoProcessor.from_pretrained(model_id);
  // Set the image size on the correct property
  const fe = processor.feature_extractor || processor;
  fe.size = { width: 640, height: 640 };

  status.textContent = "Model loaded successfully!";
} catch (err) {
  console.error(err);
  status.textContent = `Error: ${err.message}`;
  status.style.color = "red";
  throw err;
}

// ============================================================
// Controls
// ============================================================
let threshold = 0.35;
thresholdSlider.addEventListener("input", () => {
  threshold = Number(thresholdSlider.value);
  thresholdLabel.textContent = threshold.toFixed(2);
});
thresholdSlider.disabled = false;

let kpThreshold = 0.001;
kpThresholdSlider.addEventListener("input", () => {
  kpThreshold = Number(kpThresholdSlider.value);
  kpThresholdLabel.textContent = kpThreshold.toFixed(2);
});
kpThresholdSlider.disabled = false;

status.textContent = "Ready";

// ============================================================
// Drawing functions
// ============================================================

/**
 * Draw skeleton (bones + keypoints) and bounding box for all detected persons.
 */
function drawPose(ctx, detections) {
  for (let d = 0; d < detections.length; d++) {
    const { x1, y1, x2, y2, score, keypoints } = detections[d];
    const personColor = PERSON_COLORS[d % PERSON_COLORS.length];

    // --- Bounding box ---
    ctx.strokeStyle = personColor;
    ctx.lineWidth = 2;
    ctx.setLineDash([6, 3]);
    ctx.strokeRect(x1, y1, x2 - x1, y2 - y1);
    ctx.setLineDash([]);

    // --- Label ---
    const label = `Person ${(score * 100).toFixed(1)}%`;
    ctx.font = 'bold 13px sans-serif';
    const textMetrics = ctx.measureText(label);
    const textWidth = textMetrics.width;
    ctx.fillStyle = personColor;
    ctx.globalAlpha = 0.8;
    ctx.fillRect(x1, y1 - 20, textWidth + 10, 20);
    ctx.globalAlpha = 1.0;
    ctx.fillStyle = '#FFFFFF';
    ctx.fillText(label, x1 + 5, y1 - 5);

    // --- Skeleton bones ---
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    for (let e = 0; e < SKELETON.length; e++) {
      const [i, j] = SKELETON[e];
      const kpi = keypoints[i];
      const kpj = keypoints[j];
      if (kpi.vis > kpThreshold && kpj.vis > kpThreshold) {
        ctx.strokeStyle = LIMB_COLORS[e];
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(kpi.x, kpi.y);
        ctx.lineTo(kpj.x, kpj.y);
        ctx.stroke();
      }
    }

    // --- Keypoint circles ---
    for (let k = 0; k < keypoints.length; k++) {
      const kp = keypoints[k];
      if (kp.vis > kpThreshold) {
        ctx.beginPath();
        ctx.arc(kp.x, kp.y, 5, 0, 2 * Math.PI);
        ctx.fillStyle = KEYPOINT_COLORS[k];
        ctx.fill();
        ctx.strokeStyle = '#FFFFFF';
        ctx.lineWidth = 2;
        ctx.stroke();
      }
    }
  }
}

// ============================================================
// Output processing
// ============================================================

/**
 * Process end-to-end YOLO26-pose model outputs.
 *
 * Output tensor shape: [batch_size, 300, 57]
 * Per detection (57 values):
 *   [0-3]  : x1, y1, x2, y2  (bbox in 640x640 model space)
 *   [4]    : confidence score
 *   [5]    : class_id (0 = person)
 *   [6-56] : 17 keypoints × 3 (x, y, visibility)
 */
function processDetections(logits, canvasWidth, canvasHeight) {
  const data = logits.data; // Float32Array
  const numDetections = logits.dims[1]; // 300
  const detSize = logits.dims[2]; // 57

  // Model outputs normalized 0-1 coordinates, scale to canvas pixels
  const scaleX = canvasWidth;
  const scaleY = canvasHeight;

  const detections = [];

  for (let i = 0; i < numDetections; i++) {
    const offset = i * detSize;
    const score = data[offset + 4];

    if (score < threshold) continue;

    const x1 = data[offset + 0] * scaleX;
    const y1 = data[offset + 1] * scaleY;
    const x2 = data[offset + 2] * scaleX;
    const y2 = data[offset + 3] * scaleY;

    const keypoints = [];
    for (let k = 0; k < 17; k++) {
      keypoints.push({
        x: data[offset + 6 + k * 3] * scaleX,
        y: data[offset + 6 + k * 3 + 1] * scaleY,
        vis: data[offset + 6 + k * 3 + 2],
      });
    }

    detections.push({ x1, y1, x2, y2, score, keypoints });
  }

  // Sort by confidence descending
  detections.sort((a, b) => b.score - a.score);

  return detections;
}

// ============================================================
// Video capture and render loop
// ============================================================

let lastDetections = [];
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
        // Capture pixel data synchronously (clean video frame, before skeleton overlay)
        const pixelData = context.getImageData(0, 0, width, height).data;
        const image = new RawImage(pixelData, width, height, 4);

        // Preprocess and run model
        const inputs = await processor(image);
        const result = await model(inputs);

        // Extract the logits tensor (end-to-end output)
        const logits = result.logits;
        if (!logits) {
          console.warn("Model output keys:", Object.keys(result));
          throw new Error("Expected 'logits' in model output");
        }

        lastDetections = processDetections(logits, width, height);

        // Debug: log first detection values
        if (lastDetections.length > 0) {
          const d = lastDetections[0];
          console.log('logits dims:', logits.dims);
          console.log('Detection bbox:', { x1: d.x1, y1: d.y1, x2: d.x2, y2: d.y2, score: d.score });
          console.log('Keypoints[0-4]:', d.keypoints.slice(0, 5));
          // Log raw values from offset 0 for first valid detection
          const raw = logits.data;
          for (let ri = 0; ri < logits.dims[1]; ri++) {
            if (raw[ri * 57 + 4] >= threshold) {
              console.log('Raw all 57 values of detection:', Array.from(raw.slice(ri * 57, ri * 57 + 57)));
              break;
            }
          }
        }

        if (previousTime !== undefined) {
          const fps = 1000 / (performance.now() - previousTime);
          status.textContent = `FPS: ${fps.toFixed(2)} | Persons: ${lastDetections.length}`;
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

  // Draw cached detections every frame (avoids flickering)
  drawPose(context, lastDetections);

  window.requestAnimationFrame(updateCanvas);
}

// Start the video stream
navigator.mediaDevices
  .getUserMedia(
    { video: true },
  )
  .then((stream) => {
    video.srcObject = stream;
    video.play();

    const videoTrack = stream.getVideoTracks()[0];
    const { width, height } = videoTrack.getSettings();

    setStreamSize(width, height);

    // Set container dimensions based on video aspect ratio
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
