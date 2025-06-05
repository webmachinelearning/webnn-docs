export default function manifest() {
  return {
    name: 'WebNN Documentation',
    short_name: 'WebNN',
    icons: [
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png'
      }
    ],
    theme_color: '#fff',
    background_color: '#fff',
    display: 'standalone'
  }
}