/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://webnn.io',
  generateRobotsTxt: false,
  generateIndexSitemap: false,
  outDir: 'public',
  exclude: ['/icon.svg', '/apple-icon.png', '/manifest.webmanifest', '/twitter-image.png', '/opengraph-image.png'],
}
