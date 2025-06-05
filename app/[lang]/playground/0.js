// Create WebNN context
async function createWebNNContext() {
  if (!('ml' in navigator)) {
    throw new Error('WebNN API is not supported. Try enabling it in chrome://flags or using a compatible browser.');
  }
  try {
    return await navigator.ml.createContext({ deviceType: 'cpu' });
  } catch (e) {
    throw new Error('Failed to create WebNN context: ' + e.message);
  }
}

// Create input tensor
function createInputTensor(builder, shape, data) {
  return builder.input('input', { dataType: 'float32', shape });
}

// Create filter tensor
function createFilterTensor(builder, shape, data) {
  return builder.constant({ dataType: 'float32', shape }, data);
}

// Create bias tensor
function createBiasTensor(builder, shape, data) {
  return builder.constant({ dataType: 'float32', shape }, data);
}

// Execute approximate ConvTranspose2d operation
async function runConvTranspose(context, builder, input, filter, options, inputData, outputShape) {
  const strides = options.strides;
  const resized_input = builder.resize(input, { scales: [strides[0], strides[1]], interpolation: 'nearest' });
  const con_options = {
    inputLayout: 'nchw',
    filterLayout: 'oihw',
    bias: options.bias,
    padding: options.padding,
    strides: [1, 1], // Post-resize, typically set to 1
    dilations: options.dilations,
    groups: options.groups
  };
  const con = builder.conv2d(resized_input, filter, con_options);
  const graph = await builder.build({ 'output': con });

  const inputTensor = await context.createTensor({
    dataType: 'float32',
    shape: input.shape,
    writable: true
  });
  await context.writeTensor(inputTensor, inputData);

  const outputTensor = await context.createTensor({
    dataType: 'float32',
    shape: outputShape,
    readable: true
  });

  const inputs = { 'input': inputTensor };
  const outputs = { 'output': outputTensor };
  await context.dispatch(graph, inputs, outputs);
  return await context.readTensor(outputTensor);
}

// Run function
async function run() {
  try {
    const context = await createWebNNContext();
    const builder = new MLGraphBuilder(context);

    const inputShape = [1, 1, 4, 4]; // [batches, inputChannels, height, width]
    const inputData = new Float32Array([
      1, 1, 1, 1, // First row
      1, 1, 1, 1, // Second row
      1, 1, 1, 1, // Third row
      1, 1, 1, 1  // Fourth row
    ]);
    const input = createInputTensor(builder, inputShape, inputData);

    const filterShape = [1, 1, 3, 3]; // [outputChannels, inputChannels/groups, height, width]
    const filterData = new Float32Array([
      1, 1, 1,
      1, 1, 1,
      1, 1, 1
    ]);
    const filter = createFilterTensor(builder, filterShape, filterData);

    const biasShape = [1]; // 1 bias for 1 output channel
    const biasData = new Float32Array([0]); // Zero bias
    const bias = createBiasTensor(builder, biasShape, biasData);

    const options = {
      inputLayout: 'nchw',  // [batch, channels, height, width]
      filterLayout: 'oihw', // [outputChannels, inputChannels, height, width]
      bias: bias,
      padding: [1, 1, 1, 1], // [beginningHeight, endingHeight, beginningWidth, endingWidth]
      strides: [2, 2],       // [height, width]
      dilations: [1, 1],     // [height, width]
      groups: 1              // number of groups
    };

    // Approximate output shape for stride=2, adjust based on calculation
    const outputShape = [1, 1, 9, 9]; // Example, calculate based on (H-1)*S - 2*P + K
    const outputData = await runConvTranspose(context, builder, input, filter, options, inputData, outputShape);
    return {
      input: { shape: inputShape, data: Array.from(inputData) },
      options: options,
      filter: { shape: filterShape, data: Array.from(filterData) },
      output: { shape: outputShape, data: Array.from(new Float32Array(outputData)) }
    };
  } catch (error) {
    console.error('WebNN error:', error);
    throw error;
  }
}

function createOptionsTable(element, options) {
  const table = document.createElement('table');
  const thead = document.createElement('thead');
  const tbody = document.createElement('tbody');

  const headerRow = document.createElement('tr');
  const headers = ['Option', 'Value', 'Option', 'Value'];
  headers.forEach(text => {
    const th = document.createElement('th');
    th.textContent = text;
    headerRow.appendChild(th);
  });
  thead.appendChild(headerRow);

  const entries = Object.entries(options);
  const halfLength = Math.ceil(entries.length / 2);
  const leftColumn = entries.slice(0, halfLength);
  const rightColumn = entries.slice(halfLength);

  for (let i = 0; i < halfLength; i++) {
    const row = document.createElement('tr');

    const leftKeyCell = document.createElement('td');
    const leftValueCell = document.createElement('td');
    if (leftColumn[i]) {
      leftKeyCell.textContent = leftColumn[i][0];
      const value = leftColumn[i][1];
      if (value && value.dataType && value.shape) {
        leftValueCell.textContent = 'Tensor(' + value.dataType + ', shape=[' + value.shape.join(',') + '])';
      } else if (Array.isArray(value)) {
        leftValueCell.textContent = '[' + value.join(', ') + ']';
      } else {
        leftValueCell.textContent = String(value);
      }
    }

    const rightKeyCell = document.createElement('td');
    const rightValueCell = document.createElement('td');
    if (rightColumn[i]) {
      rightKeyCell.textContent = rightColumn[i][0];
      const value = rightColumn[i][1];
      if (value && value.dataType && value.shape) {
        rightValueCell.textContent = 'Tensor(' + value.dataType + ', shape=[' + value.shape.join(',') + '])';
      } else if (Array.isArray(value)) {
        rightValueCell.textContent = '[' + value.join(', ') + ']';
      } else {
        rightValueCell.textContent = String(value);
      }
    }

    row.appendChild(leftKeyCell);
    row.appendChild(leftValueCell);
    row.appendChild(rightKeyCell);
    row.appendChild(rightValueCell);
    tbody.appendChild(row);
  }

  table.appendChild(thead);
  table.appendChild(tbody);
  element.innerHTML = '';
  element.appendChild(table);
}

function displayResults(results) {
  const resultDiv = document.getElementById('result');
  if (!resultDiv) return;

  // Input grid
  const inputHeight = results.input.shape[2];
  const inputWidth = results.input.shape[3];
  let inputGrid = '';
  for (let i = 0; i < inputHeight; i++) {
    const row = results.input.data.slice(i * inputWidth, (i + 1) * inputWidth);
    inputGrid += row.join(' ') + '<br>';
  }

  // Filter grid
  const filterHeight = results.filter.shape[2];
  const filterWidth = results.filter.shape[3];
  let filterGrid = '';
  for (let i = 0; i < filterHeight; i++) {
    const row = results.filter.data.slice(i * filterWidth, (i + 1) * filterWidth);
    filterGrid += row.join(' ') + '<br>';
  }
  
  // Output grid
  const outputHeight = results.output.shape[2];
  const outputWidth = results.output.shape[3];
  let outputGrid = '';
  for (let i = 0; i < outputHeight; i++) {
    const row = results.output.data.slice(i * outputWidth, (i + 1) * outputWidth)
      .map(x => x.toFixed(1));
    outputGrid += row.join(' ') + '<br>';
  }

  resultDiv.innerHTML = 
    '<div class="grid-container">' +
      '<div class="grid-item">' +
        '<h4>Input (' + inputHeight + 'x' + inputWidth + ')</h4>' +
        '<div class="grid">' + inputGrid + '</div>' +
      '</div>' +
      '<div class="grid-item">' +
        '<h4>Filter (' + filterHeight + ' x ' + filterWidth + ')</h4>' +
        '<div class="grid">' + filterGrid + '</div>' +
      '</div>' +
      '<div class="grid-item">' +
        '<h4>Output (' + outputHeight + ' x ' + outputWidth + ')</h4>' +
        '<div class="grid">' + outputGrid + '</div>' +
      '</div>' +
    '</div>';
}

async function initialize() {
  const statusDiv = document.getElementById('status');
  if (statusDiv) {
    statusDiv.textContent = 'Running convTranspose2d with WebNN...';
  }
  try {
    const results = await run();
    if (results) {
      if (statusDiv) {
        createOptionsTable(statusDiv, results.options);
      }
      displayResults(results);
    }
  } catch (error) {
    console.error('Error:', error);
    if (statusDiv) {
      statusDiv.textContent = 'Error: ' + error.message;
    }
  }
}

document.addEventListener('DOMContentLoaded', initialize, false);