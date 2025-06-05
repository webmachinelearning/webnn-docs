
export const liteRTEditorFiles = {
  "todo": {
    "title": "To do",
    "description": "To do",
    "static": {
      '/index.html': {
        code: `<!DOCTYPE html>
<html>

<head>
  <title>WebNN / Lite RT</title>
  <meta charset="UTF-8" />
</head>

<body>
  <div id="app"></div>
  <script src="./webnn.js"></script>
</body>

</html>`},
      '/webnn.js': {
        active: true,
        code: `document.getElementById("app").innerHTML = '// Lite RT';
`},  '/styles.css': {
        code: `body {
}
`}
    },
    "vanilla": {
      '/index.html': { code: ``},
      '/index.js': {
        active: true,
        code: `document.getElementById("app").innerHTML = '// LiteRT + Vanilla JavaScript';
` }, '/styles.css': { code: ``},
    },
    "svelte": {
      '/webnn.js': { code: ``},
      '/App.svelte': {
        active: true,
        code: `<script>
  let name = '// LiteRT + Svelte';
</script>

<main>
  {name}
</main>
`}, 
'/styles.css': { code: ``},
    },
    "react": {
      '/webnn.js': { code: ``},
      '/App.js': {
        active: true,
        code: `export default function App() {
  return <div>// LiteRT + React</div>
}`},
    },
    "vue": {
      '/src/webnn.js': { code: ``},
      '/src/App.vue': {
        active: true,
        code: `<template>
  <div>{{ msg }}</div>
</template>

<script setup>
import { ref } from 'vue';
const msg = ref('// LiteRT + Vue');
</script>
`},
    }
  }
}