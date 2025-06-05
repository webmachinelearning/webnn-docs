export const extractIdFromWebNNPath = () => {
  const pathSegments = window.location.pathname.split('/');
  // Find the index of 'webnn' and get the next segment
  const webnnIndex = pathSegments.findIndex(segment => segment === 'webnn');
  
  if (webnnIndex !== -1 && webnnIndex + 1 < pathSegments.length) {
    return pathSegments[webnnIndex + 1];
  }
  
  return 'add-mul';
};

export const extractIdFromOnnxRuntimePath = () => {
  const pathSegments = window.location.pathname.split('/');
  // Find the index of 'webnn' and get the next segment
  const webnnIndex = pathSegments.findIndex(segment => segment === 'onnxruntime');
  
  if (webnnIndex !== -1 && webnnIndex + 1 < pathSegments.length) {
    return pathSegments[webnnIndex + 1];
  }
  
  return 'image-classification-mobilenet-v2';
};

export const extractIdFromTransformersjsPath = () => {
  const pathSegments = window.location.pathname.split('/');
  // Find the index of 'webnn' and get the next segment
  const webnnIndex = pathSegments.findIndex(segment => segment === 'transformersjs');
  
  if (webnnIndex !== -1 && webnnIndex + 1 < pathSegments.length) {
    return pathSegments[webnnIndex + 1];
  }
  
  return 'image-classification-mobilenet-v2';
};

export const extractIdFromLiteRTPath = () => {
  const pathSegments = window.location.pathname.split('/');
  // Find the index of 'webnn' and get the next segment
  const webnnIndex = pathSegments.findIndex(segment => segment === 'litert');
  
  if (webnnIndex !== -1 && webnnIndex + 1 < pathSegments.length) {
    return pathSegments[webnnIndex + 1];
  }
  
  return 'todo';
};