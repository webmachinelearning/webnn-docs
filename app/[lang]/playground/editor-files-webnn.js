
export const webnnEditorFiles = {
  "hello-webnn": {
    "title": "Hello WebNN",
    "description": "Hello WebNN",
    "static": {
      '/webnn.js': {
        active: true,
        code: `'use strict';

/**
 * Checks if the WebNN API is supported in the current browser
 * @returns {Promise<void>}
 */
async function checkWebNNSupport() {
  const statusElement = document.querySelector('#status');
  const messages = {
    checking: 'Checking WebNN API support...',
    supported: 'WebNN API is supported in this browser.',
    unsupported: 'WebNN API is not supported in this browser.',
    missingNavigatorML: 'WebNN is not available in this browser. Try using a compatible browser like Chrome with WebNN enabled.',
    error: 'An error occurred while checking WebNN support: ',
  };

  // Ensure status element exists
  if (!statusElement) {
    console.error('Status element not found.');
    return;
  }

  // Set initial loading state
  statusElement.textContent = messages.checking;

  try {
    // Check if navigator.ml exists
    if (!('ml' in navigator)) {
      throw new Error(messages.missingNavigatorML);
    }

    // Attempt to create WebNN context and builder
    const context = await navigator.ml.createContext();
    if (!window.MLGraphBuilder) {
      throw new Error('MLGraphBuilder is not available.');
    }
    new MLGraphBuilder(context);

    // Success case
    statusElement.textContent = messages.supported;
    console.log(messages.supported);
  } catch (error) {
    // Handle errors with specific messaging
    const errorMessage = messages.error + ' ' + error.message;
    statusElement.textContent = error.message.includes('not available')
      ? messages.unsupported
      : errorMessage;
    console.error(errorMessage, error.stack);
  }
}

/**
 * Initializes the WebNN support check on DOM content load.
 */
function initialize() {
  document.addEventListener('DOMContentLoaded', checkWebNNSupport, { once: true });
}

// Run initialization
initialize();`},
      '/index.html': {
        code: `<!DOCTYPE html>
<html lang="en">
<head>
    <title>Hello WebNN</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="./styles.css" />
</head>
<body>
    <h1>Hello WebNN</h1>
    <p id="status"></p>
    <script src="./webnn.js"></script>
</body>
</html>`},
      '/styles.css': {
        code: `body {
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  color: #333;
}`}
    },
    "vanilla": {
      '/index.js': {
        active: true,
        code: `import "./styles.css";

/**
 * Checks if the WebNN API is supported in the current browser
 * @returns {Promise<void>}
 */
async function checkWebNNSupport() {  
  const titleElement = '<h1>Hello WebNN</h1>';
  const appElement = document.getElementById("app");
  const messages = {
    checking: 'Checking WebNN API support...',
    supported: 'WebNN API is supported in this browser.',
    unsupported: 'WebNN API is not supported in this browser.',
    missingNavigatorML: 'WebNN is not available in this browser. Try using a compatible browser like Chrome with WebNN enabled.',
    error: 'An error occurred while checking WebNN support: ',
  };

  // Ensure status element exists
  if (!appElement) {
    console.error('App element not found.');
    return;
  }

  // Set initial loading state
  appElement.innerHTML = titleElement + messages.checking;

  try {
    // Check if navigator.ml exists
    if (!('ml' in navigator)) {
      throw new Error(messages.missingNavigatorML);
    }

    // Attempt to create WebNN context and builder
    const context = await navigator.ml.createContext();
    if (!window.MLGraphBuilder) {
      throw new Error('MLGraphBuilder is not available.');
    }
    new MLGraphBuilder(context);

    // Success case
    appElement.innerHTML = titleElement + messages.supported;
    console.log(messages.supported);
  } catch (error) {
    // Handle errors with specific messaging
    const errorMessage = messages.error + ' ' + error.message;
    appElement.innerHTML = titleElement + errorMessage;
    console.error(errorMessage, error.stack);
  }
}

checkWebNNSupport();`},
      '/styles.css': {
        code: `body {
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  color: #333;
}`}
    },
    "svelte": {
      '/App.svelte': {
        active: true,
        code: `<script>
  import { onMount } from 'svelte';
  import { checkWebNNSupport } from './webnn.js';

  let status = 'Checking WebNN API support...';

  onMount(async () => {
    try {
      status = await checkWebNNSupport();
    } catch (error) {
      status = 'Error: ' + error.message;
      console.error('Failed to check WebNN support:', error);
    }
  });
</script>

<main>
  <h1>Hello WebNN</h1>
  <div>
    {status}
  </div>
</main>

<style>
  /* Optional: Add custom styles if Tailwind is not used */
  main {
    font-family: Arial, sans-serif;
  }
</style>`},
      '/webnn.js': {
        code: `/**
 * Checks if the WebNN API is supported in the current browser.
 * @returns {Promise<string>} A message indicating WebNN support status.
 * @throws {Error} If an unexpected error occurs during the check.
 */
export async function checkWebNNSupport() {
  const messages = {
    checking: 'Checking WebNN API support...',
    supported: 'WebNN API is supported in this browser.',
    unsupported: 'WebNN API is not supported in this browser.',
    missingNavigatorML: 'WebNN is not available in this browser. Try using a compatible browser like Chrome with WebNN enabled.',
    error: 'An error occurred while checking WebNN support:',
  };

  try {
    // Check if navigator.ml exists
    if (!('ml' in navigator)) {
      throw new Error(messages.missingNavigatorML);
    }

    // Attempt to create WebNN context and builder
    const context = await navigator.ml.createContext();
    if (!window.MLGraphBuilder) {
      throw new Error('MLGraphBuilder is not available.');
    }
    new MLGraphBuilder(context);

    // Success case
    console.log(messages.supported);
    return messages.supported;
  } catch (error) {
    // Handle errors with specific messaging
    const errorMessage = messages.error + ' ' + error.message;
    console.error(errorMessage, error.stack);
    return error.message.includes('not available') ? messages.unsupported : errorMessage;
  }
}`},
    },
    "react": {
      '/webnn.js': {
        active: true,
        code: `/**
 * Checks if the WebNN API is supported in the current browser.
 * @returns {Promise<string>} The status message indicating support or error.
 */
export async function checkWebNNSupport() {
  'use strict';

  const messages = {
    checking: 'Checking WebNN API support...',
    supported: 'WebNN API is supported in this browser.',
    unsupported: 'WebNN API is not supported in this browser.',
    missingNavigatorML: 'WebNN is not available in this browser. Try using a compatible browser like Chrome with WebNN enabled.',
    error: 'An error occurred while checking WebNN support: ',
  };

  try {
    // Check if navigator.ml exists
    if (!('ml' in navigator)) {
      throw new Error(messages.missingNavigatorML);
    }

    // Attempt to create WebNN context and builder
    const context = await navigator.ml.createContext();
    if (!window.MLGraphBuilder) {
      throw new Error('MLGraphBuilder is not available.');
    }
    new MLGraphBuilder(context);

    // Success case
    console.log(messages.supported);
    return messages.supported;
  } catch (error) {
    // Handle errors with specific messaging
    const errorMessage = messages.error + ' ' + error.message;
    console.error(errorMessage, error.stack);
    return error.message.includes('not available') ? messages.unsupported : errorMessage;
  }
}`
      },
      '/App.js': {
        code: `import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { checkWebNNSupport } from './webnn.js';

export default function App() {
  const [status, setStatus] = useState('Checking WebNN API support...');

  useEffect(() => {
    async function initialize() {
      const result = await checkWebNNSupport();
      setStatus(result);
    }
    initialize();
  }, []);

  return (
    <div className="container">
      <h1 className="title">Hello WebNN</h1>
      <p
        className={status.includes('supported') ? 'status-supported' : 'status-error'}
        aria-live="polite"
      >
        {status}
      </p>
    </div>
  );
};
` }
    },
    "vue": {
      '/src/webnn.js': {
        code: `'use strict';

/**
 * Checks if the WebNN API is supported in the current browser.
 * @returns {Promise<{ isSupported: boolean, message: string }>} Result object with support status and message.
 * @throws {Error} If an error occurs during the check.
 */
export async function checkWebNNSupport() {
  const messages = {
    checking: 'Checking WebNN API support...',
    supported: 'WebNN API is supported in this browser.',
    unsupported: 'WebNN API is not supported in this browser.',
    missingNavigatorML: 'WebNN is not available in this browser. Try using a compatible browser like Chrome with WebNN enabled.',
    error: 'An error occurred while checking WebNN support:',
  };

  try {
    // Check if navigator.ml exists
    if (!('ml' in navigator)) {
      throw new Error(messages.missingNavigatorML);
    }

    // Attempt to create WebNN context and builder
    const context = await navigator.ml.createContext();
    if (!window.MLGraphBuilder) {
      throw new Error('MLGraphBuilder is not available.');
    }
    new MLGraphBuilder(context);

    // Success case
    return { isSupported: true, message: messages.supported };
  } catch (error) {
    // Handle errors with specific messaging
    const errorMessage = error.message.includes('not available')
      ? messages.unsupported
      : messages.error + ' '+ error.message;
    console.error(errorMessage, error.stack);
    return { isSupported: false, message: errorMessage };
  }
}` },
      '/src/App.vue': {
        code: `<template>
  <div id="app">
    <h1>WebNN API Support Check</h1>
    <div :class="statusClass" id="status">{{ status }}</div>
  </div>
</template>

<script>
import { checkWebNNSupport } from './webnn.js';

export default {
  name: 'App',
  data() {
    return {
      status: 'Checking WebNN API support...',
      statusClass: 'checking',
    };
  },
  async mounted() {
    try {
      const result = await checkWebNNSupport();
      this.status = result.message;
      this.statusClass = result.isSupported ? 'success' : 'error';
    } catch (error) {
      this.status = error.message;
      this.statusClass = 'error';
    }
  },
};
</script>` },
      '/src/styles.css': {
        code: `#app {
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  color: #333;
}

#status {
  font-size: 16px;
  padding: 10px;
  border-radius: 4px;
}

.checking {
  color: #666;
  background-color: #f0f0f0;
}

.success {
  color: #2f8d46;
  background-color: #e6f4ea;
}

.error {
  color: #d32f2f;
  background-color: #fce4e4;
}`
      }
    }
  },
  "add-mul": {
    "title": "C = 0.2 * A + B",
    "description": "Compute the element-wise binary addition and multiplication of the two input tensors",
    "static": {
      '/webnn.js': {
        active: true,
        code: `// Named constants for clarity and maintainability
const DEFAULT_SHAPE = [2, 2];
const SCALE_FACTOR = 0.2;
const INPUT_A_VALUE = 1.0;
const INPUT_B_VALUE = 0.8;

// Main WebNN function with configurable parameters
async function webnn({
  shape = DEFAULT_SHAPE,
  scale = SCALE_FACTOR,
  aValues = INPUT_A_VALUE,
  bValues = INPUT_B_VALUE,
} = {}) {
  // Check for WebNN API support
  if (!navigator.ml) {
    throw new Error("WebNN API is not supported");
  }

  // Define tensor descriptor
  const descriptor = { dataType: "float32", shape };
  const context = await navigator.ml.createContext();
  const builder = new MLGraphBuilder(context);

  // 1. Create a computational graph: C = scale * A + B
  const constant = builder.constant(descriptor, new Float32Array(shape[0] * shape[1]).fill(scale)); // Scaling factor
  const A = builder.input("A", descriptor); // First input matrix
  const B = builder.input("B", descriptor); // Second input matrix
  const C = builder.add(builder.mul(A, constant), B); // C = scaled A + B

  // 2. Compile the graph
  const graph = await builder.build({ "C": C });

  // 3. Create reusable input and output tensors with error handling
  const [inputTensorA, inputTensorB, outputTensorC] = await Promise.all([
    context.createTensor({ dataType: A.dataType, shape: A.shape, writable: true }).catch(err => {
      throw new Error("Failed to create inputTensorA: " + err.message);
    }),
    context.createTensor({ dataType: B.dataType, shape: B.shape, writable: true }).catch(err => {
      throw new Error("Failed to create inputTensorB: " + err.message);
    }),
    context.createTensor({ dataType: C.dataType, shape: C.shape, readable: true }).catch(err => {
      throw new Error("Failed to create outputTensorC: " + err.message);
    }),
  ]);

  // 4. Initialize the inputs efficiently
  context.writeTensor(inputTensorA, new Float32Array(shape[0] * shape[1]).fill(aValues));
  context.writeTensor(inputTensorB, new Float32Array(shape[0] * shape[1]).fill(bValues));

  // 5. Execute the graph
  const inputs = { "A": inputTensorA, "B": inputTensorB };
  const outputs = { "C": outputTensorC };
  context.dispatch(graph, inputs, outputs);

  // 6. Read back the computed result
  const result = await context.readTensor(outputTensorC);
  return { data: new Float32Array(result), shape }; // Return data and shape for formatting
}

// Utility function to format tensor output as a matrix
function formatTensorResult(array, shape) {
  const [rows, cols] = shape;
  let output = "<br/>";
  for (let i = 0; i < rows; i++) {
    output += array.slice(i * cols, (i + 1) * cols).join(" ") + "<br/>";
  }
  return output;
}

// Debounce utility to prevent rapid successive clicks
function debounce(func, wait) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

// Event listener with debouncing
document.querySelector("#run").addEventListener(
  "click",
  debounce(async () => {
    const output = document.querySelector("#output");
    output.textContent = "Inferencing...";
    try {
      const { data, shape } = await webnn(); // Use default values
      console.log(data);
      output.innerHTML = "Output value:" + formatTensorResult(data, shape);
    } catch (error) {
      console.log(error.message);
      output.textContent = "Error: " + error.message;
    }
  }, 300) // 300ms debounce
);`
      },
      '/index.html': {
        code: `<!DOCTYPE html>
<html>

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="./styles.css" />
  <title>C = 0.2 * A + B</title>
</head>

<body>
  <h1>C = 0.2 * A + B</h1>
  <div>
    <p>This example demonstrates a simple neural network computation using WebNN:</p>
    <p>C = 0.2 * A + B</p>
    <p>Where:</p>
    <ul>
      <li>A is initialized with all 1.0</li>
      <li>B is initialized with all 0.8</li>
    </ul>
  </div>
  <button id="run">Run WebNN</button>
  <div id="output">Click "Run WebNN" to start</div>
  <script src="./webnn.js"></script>
</body>

</html>` },
      '/styles.css': {
        code: `body {
  font-family: 'Intel One Mono', 'Trebuchet MS', sans-serif;
  padding: 0 1rem;
}

h1 {
  color: #E44D26;
}

button {
  margin: 0.5rem 0;
}`}
    },
    "vanilla": {
      '/index.js': {
        active: true,
        code: `import "./styles.css";

async function webnn() {
  const descriptor = {dataType: 'float32', shape: [2, 2]};
  const context = await navigator.ml.createContext();
  const builder = new MLGraphBuilder(context);

  // 1. Create a computational graph 'C = 0.2 * A + B'.
  const constant = builder.constant(descriptor, new Float32Array(4).fill(0.2));
  const A = builder.input('A', descriptor);
  const B = builder.input('B', descriptor);
  const C = builder.add(builder.mul(A, constant), B);

  // 2. Compile the graph.
  const graph = await builder.build({'C': C});

  // 3. Create reusable input and output tensors.
  const [inputTensorA, inputTensorB, outputTensorC] =
    await Promise.all([
      context.createTensor({
        dataType: A.dataType, shape: A.shape, writable: true
      }),
      context.createTensor({
        dataType: B.dataType, shape: B.shape, writable: true
      }),
      context.createTensor({
        dataType: C.dataType, shape: C.shape, readable: true
      })
    ]);

  // 4. Initialize the inputs.
  context.writeTensor(inputTensorA, new Float32Array(4).fill(1.0));
  context.writeTensor(inputTensorB, new Float32Array(4).fill(0.8));

  // 5. Execute the graph.
  const inputs = {
    'A': inputTensorA,
    'B': inputTensorB
  };
  const outputs = {
    'C': outputTensorC
  };
  context.dispatch(graph, inputs, outputs);
    
  // 6. Read back the computed result.
  const result = await context.readTensor(outputTensorC);
  return new Float32Array(result).toString();
}

document.querySelector("#run").addEventListener("click", async () => {
  const output = document.querySelector("#output");
  output.textContent = "Inferencing...";
  try {
    const result = await webnn();
    output.textContent = 'Output value: ' + result;
  } catch (error) {
    output.textContent = 'Error: ' + error.message;
  }
});`
      },
      '/index.html': {
        code: `<!DOCTYPE html>
<html>

<head>
  <title>C = 0.2 * A + B</title>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="./styles.css" />
</head>

<body>
  <h1>C = 0.2 * A + B</h1>
  <div>
    <p>This example demonstrates a simple neural network computation using WebNN:</p>
    <p>C = 0.2 * A + B</p>
    <p>Where:</p>
    <ul>
      <li>A is initialized with all 1.0</li>
      <li>B is initialized with all 0.8</li>
    </ul>
  </div>
  <button id="run">Run WebNN</button>
  <div id="output">Click "Run WebNN" to start</div>
  <script src="./index.js"></script>
</body>

</html>` },
      '/styles.css': {
        code: `body {
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  color: #333;
}

h1 {
  color: #F7DF1E;
}

button {
  margin: 0.5rem 0;
}`}
    },
    "svelte": {
      '/webnn.js': {
        active: true,
        code: `export async function webnn() {
  try {
    const descriptor = { dataType: 'float32', shape: [2, 2] };
    const context = await navigator.ml.createContext();
    const builder = new MLGraphBuilder(context);
    
    // 1. Create a computational graph 'C = 0.2 * A + B'.
    const constant = builder.constant(descriptor, new Float32Array(4).fill(0.2));
    const A = builder.input('A', descriptor);
    const B = builder.input('B', descriptor);
    const C = builder.add(builder.mul(A, constant), B);
    
    // 2. Compile the graph.
    const graph = await builder.build({ 'C': C });
    
    // 3. Create reusable input and output tensors.
    const [inputTensorA, inputTensorB, outputTensorC] = await Promise.all([
      context.createTensor({
        dataType: A.dataType, 
        shape: A.shape, 
        writable: true
      }),
      context.createTensor({
        dataType: B.dataType, 
        shape: B.shape, 
        writable: true
      }),
      context.createTensor({
        dataType: C.dataType, 
        shape: C.shape, 
        readable: true
      })
    ]);
    
    // 4. Initialize the inputs.
    context.writeTensor(inputTensorA, new Float32Array(4).fill(1.0));
    context.writeTensor(inputTensorB, new Float32Array(4).fill(0.8));
    
    // 5. Execute the graph.
    const inputs = {
      'A': inputTensorA,
      'B': inputTensorB
    };
    const outputs = {
      'C': outputTensorC
    };
    await context.dispatch(graph, inputs, outputs);
    
    // 6. Read back the computed result.
    const result = await context.readTensor(outputTensorC);
    console.log(result);
    return new Float32Array(result).toString();
  } catch (error) {
    console.log(error.message);
    throw error;
  }
}` },
      '/App.svelte': {
        code: `<script>
  import { webnn } from './webnn.js';
  let result = $state("");
  async function run() {
    try {
      result = "Computing...";
      result = await webnn();
    } catch (error) {
      result = 'Error: ' + error.message;
    }
  }
</script>

<main>
  <h1>C = 0.2 * A + B</h1>
  <div>
    <p>This example demonstrates a simple neural network computation using WebNN:</p>
    <p>C = 0.2 * A + B</p>
    <p>Where:</p>
    <ul>
      <li>A is initialized with all 1.0</li>
      <li>B is initialized with all 0.8</li>
    </ul>
  </div>

  <button onclick={run}>Run WebNN</button>

  <div id="output">
    {#if result}
      <p>Output value: {result}</p>
    {:else}
      <p>Click "Run WebNN" to start</p>
    {/if}
  </div>
</main>` },
      '/styles.css': {
        code: `main {
  padding: 0 1rem;
  font-family: 'Intel One Mono', 'Helvetica Neue', sans-serif;
}

h1 {
  color: #ff3e00;
}

button {
  margin: 0.5rem 0;
}` },
    },
    "react": {
      '/webnn.js': {
        active: true,
        code: `export async function webnn() {
  try {
    const descriptor = { dataType: 'float32', shape: [2, 2] };
    const context = await navigator.ml.createContext();
    const builder = new MLGraphBuilder(context);
    
    // 1. Create a computational graph 'C = 0.2 * A + B'.
    const constant = builder.constant(descriptor, new Float32Array(4).fill(0.2));
    const A = builder.input('A', descriptor);
    const B = builder.input('B', descriptor);
    const C = builder.add(builder.mul(A, constant), B);
    
    // 2. Compile the graph.
    const graph = await builder.build({ 'C': C });
    
    // 3. Create reusable input and output tensors.
    const [inputTensorA, inputTensorB, outputTensorC] = await Promise.all([
      context.createTensor({
        dataType: A.dataType, 
        shape: A.shape, 
        writable: true
      }),
      context.createTensor({
        dataType: B.dataType, 
        shape: B.shape, 
        writable: true
      }),
      context.createTensor({
        dataType: C.dataType, 
        shape: C.shape, 
        readable: true
      })
    ]);
    
    // 4. Initialize the inputs.
    context.writeTensor(inputTensorA, new Float32Array(4).fill(1.0));
    context.writeTensor(inputTensorB, new Float32Array(4).fill(0.8));
    
    // 5. Execute the graph.
    const inputs = {
      'A': inputTensorA,
      'B': inputTensorB
    };
    const outputs = {
      'C': outputTensorC
    };
    await context.dispatch(graph, inputs, outputs);
    
    // 6. Read back the computed result.
    const result = await context.readTensor(outputTensorC);
    return new Float32Array(result).toString();
  } catch (error) {
    console.error("WebNN error:", error);
    throw error;
  }
}` },
      '/App.js': {
        code: `import React, { useState } from 'react';
import { webnn } from './webnn.js';

export default function App() {
  const [result, setResult] = useState('Click "Run WebNN" to start');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handlewebnn() {
    setLoading(true);
    setError(null);
    setResult("");

    try {
      const webNNResult = await webnn();
      setResult(webNNResult);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="App" style={styles.container}>
      <h1 style={styles.heading}>C = 0.2 * A + B</h1>
      <div>
        <p>This example demonstrates a simple neural network computation using WebNN:</p>
        <p>C = 0.2 * A + B</p>
        <p>Where:</p>
        <ul>
          <li>A is initialized with all 1.0</li>
          <li>B is initialized with all 0.8</li>
        </ul>
      </div>

      <button style={styles.button} onClick={handlewebnn} disabled={loading}>
        {loading ? "Computing..." : "Run WebNN"}
      </button>

      <div id="output">
        {error ? <p style={{ color: "red" }}>Error: {error}</p> : result && <p>Output value: {result}</p>}
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: '0 1rem',
    fontFamily: '"Intel One Mono", "Helvetica Neue", sans-serif',
  },
  heading: {
    color: '#61DAFB',
  },
  button: {
    cursor: 'pointer',
    margin: '0.5rem 0',
  }
};` }
    },
    "vue": {
      '/src/webnn.js': { code: `` },
      '/src/App.vue': {
        active: true,
        code: `<template>
  <div>
      <h1>C = 0.2 * A + B</h1>
      <div>
        <p>This example demonstrates a simple neural network computation using WebNN:</p>
        <p>C = 0.2 * A + B</p>
        <p>Where:</p>
        <ul>
          <li>A is initialized with all 1.0</li>
          <li>B is initialized with all 0.8</li>
        </ul>
      </div>
    <button @click="webnn">Run WebNN</button>
    <div id="output">{{ outputText }}</div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      outputText: 'Click "Run WebNN" to start'
    }
  },
  methods: {
    async webnn() {
      try {
        const descriptor = {dataType: 'float32', shape: [2, 2]};
        const context = await navigator.ml.createContext();
        const builder = new MLGraphBuilder(context);
        
        // 1. Create a computational graph 'C = 0.2 * A + B'.
        const constant = builder.constant(descriptor, new Float32Array(4).fill(0.2));
        const A = builder.input('A', descriptor);
        const B = builder.input('B', descriptor);
        const C = builder.add(builder.mul(A, constant), B);
        
        // 2. Compile the graph.
        const graph = await builder.build({'C': C});
        
        // 3. Create reusable input and output tensors.
        const [inputTensorA, inputTensorB, outputTensorC] = 
          await Promise.all([
            context.createTensor({
              dataType: A.dataType, shape: A.shape, writable: true
            }),
            context.createTensor({
              dataType: B.dataType, shape: B.shape, writable: true
            }),
            context.createTensor({
              dataType: C.dataType, shape: C.shape, readable: true
            })
          ]);
        
        // 4. Initialize the inputs.
        context.writeTensor(inputTensorA, new Float32Array(4).fill(1.0));
        context.writeTensor(inputTensorB, new Float32Array(4).fill(0.8));
        
        // 5. Execute the graph.
        const inputs = {
          'A': inputTensorA,
          'B': inputTensorB
        };
        const outputs = {
          'C': outputTensorC
        };
        await context.dispatch(graph, inputs, outputs);
        
        // 6. Read back the computed result.
        const result = await context.readTensor(outputTensorC);
        this.outputText = 'Output value: ' + new Float32Array(result);
      } catch (error) {
        this.outputText = 'Error: ' + error.message;
        console.error('WebNN error:', error);
      }
    }
  }
}
</script>` },
      '/src/styles.css': {
        code: `#app {
  font-family: 'Intel One Mono', 'Helvetica Neue', sans-serif;
  padding: 0 1rem;
}

h1 {
  color: #41B883;
}
  
button {
  margin: 0.5rem 0;
}`},
    },
  },
  "conv2d": {
    "title": "conv2d",
    "description": "Compute a 2-D convolution given 4-D input and filter tensors",
    "static": {
      '/webnn.js': {
        active: true,
        code: `// Create WebNN context
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

// Execute Conv2D operation
async function runConv2d(context, builder, input, filter, options, inputData, outputShape) {
  const conv = builder.conv2d(input, filter, options);
  const graph = await builder.build({ 'output': conv });

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

  const inputs = {
    'input': inputTensor
  };
    
  const outputs = {
    'output': outputTensor
  };
 
  await context.dispatch(graph, inputs, outputs);
  return await context.readTensor(outputTensor);
}

async function run() {
  try {
    const context = await createWebNNContext();
    const builder = new MLGraphBuilder(context);

    const inputShape = [1, 1, 4, 4]; // [batches, inputChannels, height, width]
    // const inputData = new Float32Array(16).fill(1);
    const inputData = new Float32Array([
      1, 1, 1, 1, // First row
      1, 1, 1, 1, // Second row
      1, 1, 1, 1, // Third row
      1, 1, 1, 1  // Fourth row
    ]);
    const input = createInputTensor(builder, inputShape, inputData);

    const filterShape = [1, 1, 3, 3]; // [outputChannels, inputChannels/groups, height, width]
    // const filterData = new Float32Array(9).fill(1); // 3x3 of ones
    const filterData = new Float32Array([
      1, 1, 1, 
      1, 1, 1, 
      1, 1, 1
    ]);
    const filter = createFilterTensor(builder, filterShape, filterData);

    // An 1-D tensor with the shape of [outputChannels] whose values are to be added to the convolution result
    const biasShape = [1]; // 1 bias for 1 output channel
    const biasData = new Float32Array([0]); // Zero bias
    const bias = createBiasTensor(builder, biasShape, biasData);

    const options = {
      inputLayout: 'nchw',  // [batch, channels, height, width]
      filterLayout: 'oihw', // [outputChannels, inputChannels, height, width]
      bias,
      padding: [1, 1, 1, 1], // [beginningHeight, endingHeight, beginningWidth, endingWidth]
      strides: [1, 1],       // [height, width]
      dilations: [1, 1],     // [height, width]
      groups: 1              // number of groups that input channels and output channels are divided into
    };

    const outputShape = [1, 1, 4, 4]; // [batches, outputChannels, height, width]
    const outputData = await runConv2d(context, builder, input, filter, options, inputData, outputShape);
    console.log('Output Shape:', outputShape);
    console.log('Output:', Array.from(new Float32Array(outputData)));
    return {
      input: { shape: inputShape, data: Array.from(inputData) },
      options,
      filter: { shape: filterShape, data: Array.from(filterData) },
      output: { shape: outputShape, data: Array.from(new Float32Array(outputData)) }
    };
    
  } catch (error) {
    console.error('WebNN error:', error);
    throw error;
  }
}`},
      '/ui.js': {
        code: `function createOptionsTable(element, options) {
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
    const row = results.input.data.slice(i * inputWidth, (i + 1) * inputWidth)
      .map(x => x.toFixed(1));
    let rowElements = '';
    row.forEach(r => {
      const element = '<div>'+ r + '</div>';
      rowElements += element;
    })
    inputGrid += rowElements;
  }

  // Filter grid
  const filterHeight = results.filter.shape[2];
  const filterWidth = results.filter.shape[3];
  let filterGrid = '';
  for (let i = 0; i < filterHeight; i++) {
    const row = results.filter.data.slice(i * filterWidth, (i + 1) * filterWidth)
      .map(x => x.toFixed(1));
    let rowElements = '';
    row.forEach(r => {
      const element = '<div>'+ r + '</div>';
      rowElements += element;
    })
    filterGrid += rowElements;
  }
  
  // Output grid
  const outputHeight = results.output.shape[2];
  const outputWidth = results.output.shape[3];
  let outputGrid = '';
  for (let i = 0; i < outputHeight; i++) {
    const row = results.output.data.slice(i * outputWidth, (i + 1) * outputWidth)
      .map(x => x.toFixed(1));
    let rowElements = '';
    row.forEach(r => {
      const element = '<div>'+ r + '</div>';
      rowElements += element;
    })
    outputGrid += rowElements;
  }

  resultDiv.innerHTML = 
    '<div class="grid-container">' +
      '<div class="grid-item">' +
        '<h4>Input ' + inputHeight + 'x' + inputWidth + '</h4>' +
        '<div class="grid g'+ results.input.shape[3] +'">' + inputGrid + '</div>' +
      '</div>' +
      '<div class="grid-item">' +
        '<h4>Filter ' + filterHeight + 'x' + filterWidth + '</h4>' +
        '<div class="grid g'+ results.filter.shape[3] +'">' + filterGrid + '</div>' +
      '</div>' +
      '<div class="grid-item">' +
        '<h4>Output ' + outputHeight + 'x' + outputWidth + '</h4>' +
        '<div class="grid g'+ results.output.shape[3] +'">' + outputGrid + '</div>' +
      '</div>' +
    '</div>';
}

async function initialize() {
  const statusDiv = document.getElementById('status');
  if (statusDiv) {
    statusDiv.textContent = 'Running Conv2D with WebNN...';
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

document.addEventListener('DOMContentLoaded', initialize, false);` },
      '/index.html': {
        code: `<!DOCTYPE html>
<html lang="en">
  <head>
    <title>WebNN Conv2d</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="./styles.css" />
  </head>
  <body>
    <h1>WebNN Conv2D</h1>
    <div id="status"></div>
    <div id="result"></div>
    <script src="./webnn.js"></script>
    <script src="./ui.js"></script>
  </body>
</html>` },
      '/styles.css': {
        code: `body {
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  color: #333;
  font-size: 0.8rem;
}

table {
  border-collapse: collapse;
  margin: 0.5rem 0;
}

th, td {
  border: 1px solid #eee;
  padding: 0.2rem 0.5rem;
  text-align: center;
}

th {
  background-color: #fafafa;
}

.grid-container {
  display: flex;
  justify-content: start;
  margin: 0;
  gap: 10px;
}

.grid-item {
  text-align: center;
}

.grid-item h4 {
  margin: 0.5rem 0;
}

.grid {
  display: grid;
  font-family: monospace;
  font-size: 0.9rem;
  padding: 10px;
  border: 1px solid #ccc;
  gap: 6px;
}

.grid div {
  justify-self: end;
}

.g1 {
  grid-template-columns: repeat(1, 1fr);
}

.g2 {
  grid-template-columns: repeat(2, 1fr);
}

.g3 {
  grid-template-columns: repeat(3, 1fr);
}

.g4 {
  grid-template-columns: repeat(4, 1fr);
}

.g5 {
  grid-template-columns: repeat(5, 1fr);
}

.g6 {
  grid-template-columns: repeat(6, 1fr);
}

.g7 {
  grid-template-columns: repeat(7, 1fr);
}

.g8 {
  grid-template-columns: repeat(8, 1fr);
}

.g9 {
  grid-template-columns: repeat(9, 1fr);
}

.g10 {
  grid-template-columns: repeat(10, 1fr);
}`}
    },
  },
  "convTranspose2d": {
    "title": "convTranspose2d",
    "description": "Compute a 2-D transposed convolution given 4-D input and filter tensors",
    "static": {
      '/webnn.js': {
        active: true,
        code: `// Create WebNN context
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
function createInputTensor(builder, shape) {
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

// Execute ConvTranspose2D operation
async function runConvTranspose2d(context, builder, input, filter, options, inputData, outputShape) {
  const convTranspose = builder.convTranspose2d(input, filter, options);
  const graph = await builder.build({ 'output': convTranspose });

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

  const inputs = {
    'input': inputTensor
  };
    
  const outputs = {
    'output': outputTensor
  };
 
  await context.dispatch(graph, inputs, outputs);
  return await context.readTensor(outputTensor);
}

async function run() {
  try {
    const context = await createWebNNContext();
    const builder = new MLGraphBuilder(context);

    // For ConvTranspose2d, the input is typically smaller than the output
    const inputShape = [1, 1, 2, 2]; // [batches, inputChannels, height, width]
    const inputData = new Float32Array([
      1, 2, // First row
      3, 4  // Second row
    ]);
    const input = createInputTensor(builder, inputShape);

    // For ConvTranspose2d, the filter is flipped compared to Conv2d
    const filterShape = [1, 1, 3, 3]; // [inputChannels, outputChannels/groups, height, width]
    const filterData = new Float32Array([
      1, 1, 1, 
      1, 1, 1, 
      1, 1, 1
    ]);
    const filter = createFilterTensor(builder, filterShape, filterData);

    // Bias is similar to Conv2d
    const biasShape = [1]; // 1 bias for 1 output channel
    const biasData = new Float32Array([0]); // Zero bias
    const bias = createBiasTensor(builder, biasShape, biasData);

    const options = {
      inputLayout: 'nchw',    // [batch, channels, height, width]
      filterLayout: 'iohw',   // [inputChannels, outputChannels, height, width] - note the change from 'oihw'
      bias,
      padding: [0, 0, 0, 0],  // [beginningHeight, endingHeight, beginningWidth, endingWidth]
      strides: [3, 3],        // [height, width] - using stride 2 for upsampling
      outputPadding: [0, 0],  // Additional padding for output
      dilations: [1, 1],      // [height, width]
      groups: 1               // number of groups that input channels and output channels are divided into
    };

    // The output shape will be larger due to the upsampling nature of ConvTranspose2d
    const outputShape = [1, 1, 6, 6]; // [batches, outputChannels, height, width]
    const outputData = await runConvTranspose2d(context, builder, input, filter, options, inputData, outputShape);
    console.log('Output Shape:', outputShape);
    console.log('Output:', Array.from(new Float32Array(outputData)));
    return {
      input: { shape: inputShape, data: Array.from(inputData) },
      options,
      filter: { shape: filterShape, data: Array.from(filterData) },
      output: { shape: outputShape, data: Array.from(new Float32Array(outputData)) }
    };
    
  } catch (error) {
    console.error('WebNN error:', error);
    throw error;
  }
}`},
      '/ui.js': {
        code: `function createOptionsTable(element, options) {
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
    const row = results.input.data.slice(i * inputWidth, (i + 1) * inputWidth)
      .map(x => x.toFixed(1));
    let rowElements = '';
    row.forEach(r => {
      const element = '<div>'+ r + '</div>';
      rowElements += element;
    })
    inputGrid += rowElements;
  }

  // Filter grid
  const filterHeight = results.filter.shape[2];
  const filterWidth = results.filter.shape[3];
  let filterGrid = '';
  for (let i = 0; i < filterHeight; i++) {
    const row = results.filter.data.slice(i * filterWidth, (i + 1) * filterWidth)
      .map(x => x.toFixed(1));
    let rowElements = '';
    row.forEach(r => {
      const element = '<div>'+ r + '</div>';
      rowElements += element;
    })
    filterGrid += rowElements;
  }
  
  // Output grid
  const outputHeight = results.output.shape[2];
  const outputWidth = results.output.shape[3];
  let outputGrid = '';
  for (let i = 0; i < outputHeight; i++) {
    const row = results.output.data.slice(i * outputWidth, (i + 1) * outputWidth)
      .map(x => x.toFixed(1));
    let rowElements = '';
    row.forEach(r => {
      const element = '<div>'+ r + '</div>';
      rowElements += element;
    })
    outputGrid += rowElements;
  }

  resultDiv.innerHTML = 
    '<div class="grid-container">' +
      '<div class="grid-item">' +
        '<h4>Input ' + inputHeight + 'x' + inputWidth + '</h4>' +
        '<div class="grid g'+ results.input.shape[3] +'">' + inputGrid + '</div>' +
      '</div>' +
      '<div class="grid-item">' +
        '<h4>Filter ' + filterHeight + 'x' + filterWidth + '</h4>' +
        '<div class="grid g'+ results.filter.shape[3] +'">' + filterGrid + '</div>' +
      '</div>' +
      '<div class="grid-item">' +
        '<h4>Output ' + outputHeight + 'x' + outputWidth + '</h4>' +
        '<div class="grid g'+ results.output.shape[3] +'">' + outputGrid + '</div>' +
      '</div>' +
    '</div>';
}

async function initialize() {
  const statusDiv = document.getElementById('status');
  if (!statusDiv) {
    const statusDiv = document.createElement('div');
    statusDiv.id = 'status';
    document.body.appendChild(statusDiv);
  }
  
  const resultDiv = document.getElementById('result');
  if (!resultDiv) {
    const resultDiv = document.createElement('div');
    resultDiv.id = 'result';
    document.body.appendChild(resultDiv);
  }

  if (statusDiv) {
    statusDiv.textContent = 'Running ConvTranspose2D with WebNN...';
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

document.addEventListener('DOMContentLoaded', initialize, false);`},
      '/index.html': {
        code: `<!DOCTYPE html>
<html lang="en">
  <head>
    <title>WebNN convTranspose2d</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="./styles.css" />
  </head>
  <body>
    <h1>WebNN convTranspose2d</h1>
    <div id="status"></div>
    <div id="result"></div>
    <script src="./webnn.js"></script>
    <script src="./ui.js"></script>
  </body>
</html>` },
      '/styles.css': {
        code: `body {
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  color: #333;
  font-size: 0.8rem;
}

table {
  border-collapse: collapse;
  margin: 0.5rem 0;
}

th, td {
  border: 1px solid #eee;
  padding: 0.2rem 0.5rem;
  text-align: center;
}

th {
  background-color: #fafafa;
}

.grid-container {
  display: flex;
  justify-content: start;
  margin: 0;
  gap: 10px;
}

.grid-item {
  text-align: center;
}

.grid-item h4 {
  margin: 0.5rem 0;
}

.grid {
  display: grid;
  font-family: monospace;
  font-size: 0.9rem;
  padding: 10px;
  border: 1px solid #ccc;
  gap: 6px;
}

.grid div {
  justify-self: end;
}

.g1 {
  grid-template-columns: repeat(1, 1fr);
}

.g2 {
  grid-template-columns: repeat(2, 1fr);
}

.g3 {
  grid-template-columns: repeat(3, 1fr);
}

.g4 {
  grid-template-columns: repeat(4, 1fr);
}

.g5 {
  grid-template-columns: repeat(5, 1fr);
}

.g6 {
  grid-template-columns: repeat(6, 1fr);
}

.g7 {
  grid-template-columns: repeat(7, 1fr);
}

.g8 {
  grid-template-columns: repeat(8, 1fr);
}

.g9 {
  grid-template-columns: repeat(9, 1fr);
}

.g10 {
  grid-template-columns: repeat(10, 1fr);
}`}
    },
  },
  "matmul": {
    "title": "matmul (Matrix Multiplication)",
    "description": "Compute the matrix product of two input tensors",
    "static": {
      '/webnn.js': {
        active: true,
        code: `// Create WebNN context
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
function createInputTensor(builder, shape, name) {
  return builder.input(name, { dataType: 'float32', shape });
}

// Execute matmul operation
async function runMatmul(context, builder, inputA, inputB, inputAData, inputBData, outputShape) {
  const matmul = builder.matmul(inputA, inputB);
  const graph = await builder.build({ 'output': matmul });
  
  const inputATensor = await context.createTensor({
    dataType: 'float32',
    shape: inputA.shape,
    writable: true
  });
  
  const inputBTensor = await context.createTensor({
    dataType: 'float32',
    shape: inputB.shape,
    writable: true
  });
  
  await context.writeTensor(inputATensor, inputAData);
  await context.writeTensor(inputBTensor, inputBData);
  
  const outputTensor = await context.createTensor({
    dataType: 'float32',
    shape: outputShape,
    readable: true
  });
  
  const inputs = {
    'inputA': inputATensor,
    'inputB': inputBTensor
  };
    
  const outputs = {
    'output': outputTensor
  };
 
  await context.dispatch(graph, inputs, outputs);
  return await context.readTensor(outputTensor);
}

async function run() {
  try {
    const context = await createWebNNContext();
    const builder = new MLGraphBuilder(context);
    
    // Create input matrices
    // Matrix A: [2, 3] (2 rows, 3 columns)
    const inputAShape = [2, 3];
    const inputASize = inputAShape.reduce((a, b) => a * b, 1);
    const inputAData = new Float32Array(inputASize);
    for (let i = 0; i < inputASize; i++) {
      inputAData[i] = i + 1; // Fill with sequential values 1,2,3,4,5,6
    }
    
    // Matrix B: [3, 4] (3 rows, 4 columns)
    const inputBShape = [3, 4];
    const inputBSize = inputBShape.reduce((a, b) => a * b, 1);
    const inputBData = new Float32Array(inputBSize);
    for (let i = 0; i < inputBSize; i++) {
      inputBData[i] = i + 1; // Fill with sequential values 1,2,3,4,5,6,7,8,9,10,11,12
    }
    
    // For matmul of A[m,k] and B[k,n], output shape is [m,n]
    // Here: A[2,3] × B[3,4] = C[2,4]
    const outputShape = [inputAShape[0], inputBShape[1]];
    
    const inputA = createInputTensor(builder, inputAShape, 'inputA');
    const inputB = createInputTensor(builder, inputBShape, 'inputB');
    
    const outputData = await runMatmul(context, builder, inputA, inputB, inputAData, inputBData, outputShape);
    
    // Format input and output for display
    const formattedInputA = formatTensor(inputAData, inputAShape);
    const formattedInputB = formatTensor(inputBData, inputBShape);
    const formattedOutput = formatTensor(new Float32Array(outputData), outputShape);
    
    console.log('Input A Shape:', inputAShape);
    console.log('Input A Data:', Array.from(inputAData));
    console.log('Input B Shape:', inputBShape);
    console.log('Input B Data:', Array.from(inputBData));
    console.log('Output Shape:', outputShape);
    console.log('Output Data:', Array.from(new Float32Array(outputData)));
    
    return {
      inputA: { 
        shape: inputAShape, 
        data: Array.from(inputAData),
        formatted: formattedInputA
      },
      inputB: { 
        shape: inputBShape, 
        data: Array.from(inputBData),
        formatted: formattedInputB
      },
      output: { 
        shape: outputShape, 
        data: Array.from(new Float32Array(outputData)),
        formatted: formattedOutput
      }
    };
    
  } catch (error) {
    console.error('WebNN error:', error);
    throw error;
  }
}

// Helper function to format tensor data for display
function formatTensor(data, shape) {
  if (shape.length === 1) {
    return Array.from(data);
  }
  
  const result = [];
  const size = shape.slice(1).reduce((a, b) => a * b, 1);
  
  for (let i = 0; i < shape[0]; i++) {
    const slice = data.subarray(i * size, (i + 1) * size);
    result.push(formatTensor(slice, shape.slice(1)));
  }
  
  return result;
}

run()
  .then(result => {
    console.log('Result: ', JSON.stringify(result, null, 2));
  })
  .catch(error => {
    console.error('Error: ', error);
  });` },
      '/ui.js': {
        code: `/**
 * Create an HTML table representation of a multi-dimensional array
 * @param {Array} arr - The array to display
 * @returns {HTMLElement} Table element 
 */
function createArrayTable(arr) {
  if (!Array.isArray(arr)) {
    const span = document.createElement('span');
    span.textContent = String(arr);
    return span;
  }
  
  // Determine if this is the deepest level (contains no more arrays)
  const isDeepestLevel = arr.every(item => !Array.isArray(item));
  
  if (isDeepestLevel) {
    // Create a row for a 1D array
    const table = document.createElement('table');
    table.className = 'deep-table';
    
    const tr = document.createElement('tr');
    arr.forEach(item => {
      const td = document.createElement('td');
      td.textContent = String(item);
      tr.appendChild(td);
    });
    
    table.appendChild(tr);
    return table;
  } else {
    // Create a container for nested arrays
    const div = document.createElement('div');
    div.className = 'nested-arrays';
    // div.style.flexDirection = arr[0] && Array.isArray(arr[0][0]) ? 'column' : 'row';

    arr.forEach((item, index) => {
      const itemContainer = document.createElement('div');
      itemContainer.appendChild(createArrayTable(item));
      div.appendChild(itemContainer);
    });
    
    return div;
  }
}

// Helper function to create a visual representation of tensor data
function createTensorVisual(tensorInfo, maxDimensions = 2) {
  const { shape, data, formatted } = tensorInfo;
  const container = document.createElement('div');
  container.classList.add('tensor-container');
  
  const infoDiv = document.createElement('div');
  infoDiv.classList.add('tensor-info');
  
  infoDiv.innerHTML = '<p>Tensor [' + shape.join(' × ') + '] · ' + + shape.length + 'D · ' + data.length + ' elements</p>';

  container.appendChild(infoDiv);
  container.appendChild(createArrayTable(formatted));
  return container;
}

function displayMatmulResults(results) {
  const resultDiv = document.getElementById('result');
  if (!resultDiv) return;
  
  const container = document.createElement('div');
  container.classList.add('grid-container');
  
  // Input A visualization
  const inputAContainer = document.createElement('div');
  inputAContainer.classList.add('grid-item');
  const inputATitle = document.createElement('h4');
  inputATitle.textContent = 'Matrix A';
  inputAContainer.appendChild(inputATitle);
  inputAContainer.appendChild(createTensorVisual(results.inputA));
  
  // Input B visualization
  const inputBContainer = document.createElement('div');
  inputBContainer.classList.add('grid-item');
  const inputBTitle = document.createElement('h4');
  inputBTitle.textContent = 'Matrix B';
  inputBContainer.appendChild(inputBTitle);
  inputBContainer.appendChild(createTensorVisual(results.inputB));

  // Matrix multiplication information
  const matmulContainer = document.createElement('div');
  matmulContainer.classList.add('grid-item');
  const matmulInfo = document.createElement('div');
  matmulInfo.innerHTML = ''
    + '<h4>Matrix Multiplication</h4>'
    + '<div class="matmul-info">'
    + '<div class="matmul-arrow">[' + results.inputA.shape.join(', ') + '] × [' + results.inputB.shape.join(', ') + '] → [' + results.output.shape.join(', ') + ']</div>'
    + '<div class="matmul-description">'
      + '<p>A: [' + results.inputA.shape.join(' × ') + ']</p>'
      + '<p>B: [' + results.inputB.shape.join(' × ') + ']</p>'
      + '<p>Output: [' + results.output.shape.join(' × ') + ']</p>'
    + '</div>'
    + '</div>';
  matmulContainer.appendChild(matmulInfo);
  
  // Output visualization
  const outputContainer = document.createElement('div');
  outputContainer.classList.add('grid-item');
  const outputTitle = document.createElement('h4');
  outputTitle.textContent = 'Result Matrix';
  outputContainer.appendChild(outputTitle);
  outputContainer.appendChild(createTensorVisual(results.output));
  
  container.appendChild(inputAContainer);
  container.appendChild(inputBContainer);
  container.appendChild(matmulContainer);
  container.appendChild(outputContainer);
  
  resultDiv.innerHTML = '';
  resultDiv.appendChild(container);
}

async function initialize() {
  const statusDiv = document.getElementById('status');
  if (statusDiv) {
    statusDiv.textContent = 'Running matrix multiplication with WebNN...';
  }

  try {
    const results = await run();
    if (results) {
      if (statusDiv) {
        statusDiv.textContent = '';
      }
      displayMatmulResults(results);
    }
  } catch (error) {
    console.error('Error:', error);
    if (statusDiv) {
      statusDiv.textContent = 'Error: ' + error.message;
    }
  }
}

document.addEventListener('DOMContentLoaded', initialize, false);` },
      '/index.html': {
        code: `<!DOCTYPE html>
<html lang="en">
<head>
  <title>WebNN Matrix Multiplication (matmul)</title>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="./styles.css" />
</head>
<body>
  <h1>WebNN Matrix Multiplication (matmul)</h1>
  <div id="status"></div>
  <div id="result"></div>
  <script src="./webnn.js"></script>
  <script src="./ui.js"></script>
</body>
</html>` },
      '/styles.css': {
        code: `body {
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  color: #333;
  font-size: 0.8rem;
  margin: 20px;
}

h1 {
  margin: 0 0 0.5rem 0;
}

table {
  border-collapse: collapse;
}

table td {
  padding: 4px 2px;
  text-align: center;
  min-width: 24px;
  border: 1px solid #eee;
  border-collapse: collapse;
}

.nested-arrays {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0;
  align-items: center;

}

.nested-arrays div {
  text-align: center;
}

th {
  background-color: #fafafa;
}

.grid-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 0;
  gap: 10px;
}

.grid-item {
  text-align: center;
  flex: 1;
  min-width: 200px;
  padding: 10px;
  border: 1px solid #eee;
  border-radius: 4px;
}

.grid-item h4 {
  margin: 0 0 8px 0;
}

.matmul-info .matmul-arrow {
  margin: 0 0 8px 0;
  font-weight: normal;
}

.tensor-info, .matmul-info {
  margin-bottom: 10px;
}

.tensor-info p, .matmul-info p {
  margin: 2px;
}

.matmul-arrow {
  font-weight: bold;
  margin: 10px 0;
}

#status {
  margin: 10px 0;
  color: #666;
}`}
    },
  },
  "pooling": {
    "title": "pooling",
    "description": "Compute a pooling operation (average, l2, max) across all the elements within the moving window over the input tensor",
    "static": {
      '/webnn.js': {
        active: true,
        code: `// Create WebNN context
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
function createInputTensor(builder, shape) {
  return builder.input('input', { dataType: 'float32', shape });
}

// Execute pooling operation
async function runPooling(context, builder, input, poolingType, options, inputData, outputShape) {
  let poolOperation;
  // Select the appropriate pooling operation based on the type
  switch(poolingType) {
    case 'averagePool2d':
      poolOperation = builder.averagePool2d(input, options);
      break;
    case 'maxPool2d':
      poolOperation = builder.maxPool2d(input, options);
      break;
    case 'l2Pool2d':
      poolOperation = builder.l2Pool2d(input, options);
      break;
    default:
      throw new Error('Unsupported pooling type: ' + poolingType);
  }
  
  const graph = await builder.build({ 'output': poolOperation });

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

async function run(poolingType = 'maxPool2d') {
  try {
    const context = await createWebNNContext();
    const builder = new MLGraphBuilder(context);

    const inputShape = [1, 1, 4, 4]; // [batches, channels, height, width]
    const inputData = new Float32Array([
      1, 2, 3, 4,    // First row
      5, 6, 7, 8,    // Second row
      9, 10, 11, 12, // Third row
      13, 14, 15, 16 // Fourth row
    ]);
    const input = createInputTensor(builder, inputShape);

    // Updated options according to the WebNN spec
    const options = {
      windowDimensions: [2, 2],     // Size of the pooling window [height, width]
      padding: [0, 0, 0, 0],        // [top, bottom, left, right]
      strides: [2, 2],              // [height, width]
      layout: 'nchw',               // [batch, channels, height, width]
      // dilations property is valid for maxPool but not averagePool in WebNN spec
      ...(poolingType === 'maxPool2d' ? { dilations: [1, 1] } : {})
    };

    const outputShape = [1, 1, 2, 2]; // [batches, channels, height, width]
    const outputData = await runPooling(context, builder, input, poolingType, options, inputData, outputShape);
    
    return {
      poolingType,
      input: { shape: inputShape, data: Array.from(inputData) },
      options,
      output: { shape: outputShape, data: Array.from(new Float32Array(outputData)) }
    };
    
  } catch (error) {
    console.error('WebNN error:', error);
    throw error;
  }
}`},
      '/ui.js': {
        code: `function createOptionsTable(element, options) {
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
    let rowElements = '';
    row.forEach(r => {
      const element = '<div>'+ r + '</div>';
      rowElements += element;
    })
    inputGrid += rowElements;
  }
  
  // Output grid
  const outputHeight = results.output.shape[2];
  const outputWidth = results.output.shape[3];
  let outputGrid = '';
  for (let i = 0; i < outputHeight; i++) {
    const row = results.output.data.slice(i * outputWidth, (i + 1) * outputWidth)
      .map(x => x.toFixed(2));
    let rowElements = '';
    row.forEach(r => {
      const element = '<div>'+ r + '</div>';
      rowElements += element;
    })
    outputGrid += rowElements;
  }

  document.querySelector('h1').innerHTML = 'WebNN Pooling ' + results.poolingType;
  
  resultDiv.innerHTML = '<div class="grid-container">' +
      '<div class="grid-item">' +
        '<h4>Input ' + inputHeight + 'x' + inputWidth + '</h4>' +
        '<div class="grid g'+ results.input.shape[3] +'">' + inputGrid + '</div>' +
      '</div>' +
      '<div class="grid-item">' +
        '<h4>Output ' + outputHeight + 'x' + outputWidth + '</h4>' +
        '<div class="grid g'+ results.output.shape[3] +'">' + outputGrid + '</div>' +
      '</div>' +
    '</div>';
}

async function runPoolingOperation(poolingType) {
  const statusDiv = document.getElementById('status');
  if (statusDiv) {
    statusDiv.textContent = 'Running ' + poolingType + ' with WebNN...';
  }
  
  try {
    const results = await run(poolingType);
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

async function initialize() {
  const statusDiv = document.getElementById('status');
  if (!statusDiv) {
    const statusDiv = document.createElement('div');
    statusDiv.id = 'status';
    document.body.appendChild(statusDiv);
  }
  
  const resultDiv = document.getElementById('result');
  if (!resultDiv) {
    const resultDiv = document.createElement('div');
    resultDiv.id = 'result';
    document.body.appendChild(resultDiv);
  }

  // Run with default pooling type (maxPool2d)
  await runPoolingOperation('maxPool2d');
}

document.querySelector('#runPooling').addEventListener('click', async () => {
  const selectedRadio = document.querySelector('input[name="model"]:checked');
  if (selectedRadio) {
    const poolingType = selectedRadio.value;
    await runPoolingOperation(poolingType);
  } else {
    console.error('No pooling type selected');
  }
});

document.addEventListener('DOMContentLoaded', initialize, false);` },
      '/index.html': {
        code: `<!DOCTYPE html>
<html lang="en">
<head>
  <title>WebNN Pooling</title>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="./styles.css" />
</head>
<body>
  <h1>WebNN Pooling</h1>
  <div id="status"></div>
  <div id="result"></div>
  <div id="controls">
    <div>
      <input type="radio" id="maxPool2d" name="model" value="maxPool2d">
      <label for="maxPool2d">Max Pooling</label>
      <input type="radio" id="averagePool2d" name="model" value="averagePool2d" checked>
      <label for="averagePool2d">Average Pooling</label>
      <input type="radio" id="l2Pool2d" name="model" value="l2Pool2d">
      <label for="l2Pool2d">L2 Pooling</label>
    </div>
    <button id="runPooling">Run</button>
  </div>
  <script src="./webnn.js"></script>
  <script src="./ui.js"></script>
</body>
</html>` },
      '/styles.css': {
        code: `body {
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  color: #333;
  margin: 0;
  padding: 0 10px;
  font-size: 0.8rem;
}

table {
  border-collapse: collapse;
}

th,
td {
  border: 1px solid #f2f2f2;
  padding: 4px 8px;
  text-align: center;
}

th {
  background-color: #fafafa;
}

h1 { margin: 10px 0; }

h4 { margin: 0; }

select,
button {
  padding: 8px 12px;
  border-radius: 4px;
  border: 1px solid #ddd;
}

button {
  cursor: pointer;
  margin-top: 10px;
  width: 80px;
}

button:hover {
  background-color: #eee;
}

#status {
  margin: 0;
  background-color: #fff;
}

#result {
  padding: 10px 0;
}

.grid-container {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.grid-item h4 {
  text-align: center;
  margin-bottom: 6px;
}

.grid {
  display: grid;
  font-family: monospace;
  padding: 6px;
  border: 1px solid #ddd;
  gap: 6px;
}

.grid div {
  justify-self: end;
}

.g1 {
  grid-template-columns: repeat(1, 1fr);
}

.g2 {
  grid-template-columns: repeat(2, 1fr);
}

.g3 {
  grid-template-columns: repeat(3, 1fr);
}

.g4 {
  grid-template-columns: repeat(4, 1fr);
}

.g5 {
  grid-template-columns: repeat(5, 1fr);
}

.g6 {
  grid-template-columns: repeat(6, 1fr);
}

.g7 {
  grid-template-columns: repeat(7, 1fr);
}

.g8 {
  grid-template-columns: repeat(8, 1fr);
}

.g9 {
  grid-template-columns: repeat(9, 1fr);
}

.g10 {
  grid-template-columns: repeat(10, 1fr);
}`}
    },
  },
  "transpose": {
    "title": "transpose",
    "description": "Permute the dimensions of the input tensor according to permutation",
    "static": {
      '/webnn.js': {
        active: true,
        code: `// Create WebNN context
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

// Execute transpose operation
async function runTranspose(context, builder, input, permutation, inputData, outputShape) {
  const transpose = builder.transpose(input, { permutation });
  const graph = await builder.build({ 'output': transpose });
  
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
  
  const inputs = {
    'input': inputTensor
  };
    
  const outputs = {
    'output': outputTensor
  };
 
  await context.dispatch(graph, inputs, outputs);
  return await context.readTensor(outputTensor);
}

async function run() {
  try {
    const context = await createWebNNContext();
    const builder = new MLGraphBuilder(context);
    
    // Create a 3D tensor with shape [2, 3, 4]
    const inputShape = [2, 3, 4];
    const inputSize = inputShape.reduce((a, b) => a * b, 1);
    
    // Fill with sequential values for easy identification after transpose
    const inputData = new Float32Array(inputSize);
    for (let i = 0; i < inputSize; i++) {
      inputData[i] = i + 1;
    }
    
    const input = createInputTensor(builder, inputShape, inputData);
    
    // Permutation pattern: [2, 0, 1] means:
    // - dimension 0 moves to position 1
    // - dimension 1 moves to position 2
    // - dimension 2 moves to position 0
    // So [2, 3, 4] becomes [4, 2, 3]
    const permutation = [2, 0, 1];
    
    // Calculate output shape based on the permutation
    const outputShape = permutation.map(p => inputShape[p]);
    
    const outputData = await runTranspose(context, builder, input, permutation, inputData, outputShape);
    
    // Format output for display
    const formattedInput = formatTensor(inputData, inputShape);
    const formattedOutput = formatTensor(new Float32Array(outputData), outputShape);
    console.log('Input Shape:', inputShape);
    console.log('Input Data:', Array.from(inputData));
    console.log('Permutation:', permutation);
    console.log('Output Shape:', outputShape);
    console.log('Output Data:', Array.from(new Float32Array(outputData)));
    console.log('Formatted Output:', formattedOutput);
    
    return {
      input: { 
        shape: inputShape, 
        data: Array.from(inputData),
        formatted: formattedInput
      },
      permutation,
      output: { 
        shape: outputShape, 
        data: Array.from(new Float32Array(outputData)),
        formatted: formattedOutput
      }
    };
    
  } catch (error) {
    console.error('WebNN error:', error);
    throw error;
  }
}

// Helper function to format tensor data for display
function formatTensor(data, shape) {
  if (shape.length === 1) {
    return Array.from(data);
  }
  
  const result = [];
  const size = shape.slice(1).reduce((a, b) => a * b, 1);
  
  for (let i = 0; i < shape[0]; i++) {
    const slice = data.subarray(i * size, (i + 1) * size);
    result.push(formatTensor(slice, shape.slice(1)));
  }
  
  return result;
}

run()
  .then(result => {
    console.log('Result: ', JSON.stringify(result, null, 2));
  })
  .catch(error => {
    console.error('Error: ', error);
  });`},
      '/ui.js': {
        code: `/**
 * Create an HTML table representation of a multi-dimensional array
 * @param {Array} arr - The array to display
 * @returns {HTMLElement} Table element 
 */
function createArrayTable(arr) {
  if (!Array.isArray(arr)) {
    const span = document.createElement('span');
    span.textContent = String(arr);
    return span;
  }
  
  // Determine if this is the deepest level (contains no more arrays)
  const isDeepestLevel = arr.every(item => !Array.isArray(item));
  
  if (isDeepestLevel) {
    // Create a row for a 1D array
    const table = document.createElement('table');
    table.className = 'deep-table';
    
    const tr = document.createElement('tr');
    arr.forEach(item => {
      const td = document.createElement('td');
      td.textContent = String(item);
      tr.appendChild(td);
    });
    
    table.appendChild(tr);
    return table;
  } else {
    // Create a container for nested arrays
    const div = document.createElement('div');
    div.className = 'nested-arrays';
    // div.style.flexDirection = arr[0] && Array.isArray(arr[0][0]) ? 'column' : 'row';

    arr.forEach((item, index) => {
      const itemContainer = document.createElement('div');
      
      // Add a label for this dimension
      // const label = document.createElement('div');
      // label.textContent = index;
      // itemContainer.appendChild(label);
      
      // Add the nested array
      itemContainer.appendChild(createArrayTable(item));
      div.appendChild(itemContainer);
    });
    
    return div;
  }
}

// Helper function to create a visual representation of tensor data
function createTensorVisual(tensorInfo, maxDimensions = 2) {
  const { shape, data, formatted } = tensorInfo;
  const container = document.createElement('div');
  container.classList.add('tensor-container');
  
  // Create heading showing the shape
  const heading = document.createElement('h4');
  heading.textContent = 'Tensor [' + shape.join(' × ') +']';
  container.appendChild(heading);
  

  const infoDiv = document.createElement('div');
  infoDiv.classList.add('tensor-info');
  
  infoDiv.innerHTML = '<p>Dimensions: ' + shape.length + 'D</p>'
    + '<p>Total elements: ' + data.length + '</p>';

  container.appendChild(infoDiv);
  container.appendChild(createArrayTable(formatted));
  return container;
}

function displayTransposeResults(results) {
  const resultDiv = document.getElementById('result');
  if (!resultDiv) return;
  
  const container = document.createElement('div');
  container.classList.add('grid-container');
  
  // Input tensor visualization
  const inputContainer = document.createElement('div');
  inputContainer.classList.add('grid-item');
  inputContainer.appendChild(createTensorVisual(results.input));
  
  // Permutation information
  const permutationContainer = document.createElement('div');
  permutationContainer.classList.add('grid-item');
  const permInfo = document.createElement('div');
  permInfo.innerHTML = ''
    + '<h4>Permutation</h4>'
    + '<div class="permutation-info">'
    + '<div class="perm-arrow">[' + results.permutation.join(', ') + ']</div>'
    + '<div class="perm-description">'
      + '<p>Input shape: [' + results.input.shape.join(', ') + ']</p>'
      + '<p>Output shape: [' + results.output.shape.join(', ') + ']</p>'
    + '</div>'
    + '</div>';
  permutationContainer.appendChild(permInfo);
  
  // Output tensor visualization
  const outputContainer = document.createElement('div');
  outputContainer.classList.add('grid-item');
  outputContainer.appendChild(createTensorVisual(results.output));
  
  container.appendChild(inputContainer);
  container.appendChild(permutationContainer);
  container.appendChild(outputContainer);
  
  resultDiv.innerHTML = '';
  resultDiv.appendChild(container);
}

async function initialize() {
  const statusDiv = document.getElementById('status');
  if (statusDiv) {
    statusDiv.textContent = 'Running transpose with WebNN...';
  }

  try {
    const results = await run();
    if (results) {
      // For transpose, we don't have options like in conv2d
      // but we can display the permutation information
      if (statusDiv) {
        statusDiv.textContent = '';
      }
      displayTransposeResults(results);
    }
  } catch (error) {
    console.error('Error:', error);
    if (statusDiv) {
      statusDiv.textContent = 'Error: ' + error.message;
    }
  }
}

document.addEventListener('DOMContentLoaded', initialize, false);
` },
      '/index.html': {
        code: `<!DOCTYPE html>
<html lang="en">
<head>
  <title>WebNN Transpose</title>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="./styles.css" />
</head>
<body>
  <h1>WebNN Transpose</h1>
  <div id="status"></div>
  <div id="result"></div>
  <script src="./webnn.js"></script>
  <script src="./ui.js"></script>
</body>
</html>` },
      '/styles.css': {
        code: `body {
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  color: #333;
  font-size: 0.8rem;
}

h1 {
  margin: 0 0 0.5rem 0;
}

table {
  border-collapse: collapse;
  margin: 0;
}

table td {
  border: 1px solid #ccc;
  padding: 4px;
  min-width: 16px;
  text-align: center;
}

.nested-arrays {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 4px 0;
  align-items: center;
}

th,
td {
  border: 1px solid #eee;
  padding: 0.2rem 0.5rem;
  text-align: center;
}

th {
  background-color: #fafafa;
}

.grid-container {
  display: flex;
  justify-content: start;
  margin: 0;
  gap: 4px;
}

.grid-item {
  text-align: center;
  flex: 1;
}

.grid-item h4 {
  margin: 0;
}

.tensor-info, .permutation-info {
  padding: 4px;
  border-radius: 4px;
}

.tensor-info p, .permutation-info p {
  margin: 2px;
}

.g1 {
  grid-template-columns: repeat(1, 1fr);
}

.g2 {
  grid-template-columns: repeat(2, 1fr);
}

.g3 {
  grid-template-columns: repeat(3, 1fr);
}

.g4 {
  grid-template-columns: repeat(4, 1fr);
}

.g5 {
  grid-template-columns: repeat(5, 1fr);
}

.g6 {
  grid-template-columns: repeat(6, 1fr);
}

.g7 {
  grid-template-columns: repeat(7, 1fr);
}

.g8 {
  grid-template-columns: repeat(8, 1fr);
}

.g9 {
  grid-template-columns: repeat(9, 1fr);
}

.g10 {
  grid-template-columns: repeat(10, 1fr);
}`}
    },
  },
}