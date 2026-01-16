/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://webnn.io',
  generateRobotsTxt: false,
  generateIndexSitemap: false,
  outDir: 'public',
  exclude: ['/icon.svg', '/apple-icon.png', '/manifest.webmanifest', '/twitter-image.png', '/opengraph-image.png'],
  additionalPaths: async (config) => [
    { loc: '/', changefreq: 'daily', priority: 1.0, lastmod: new Date().toISOString() },
    { loc: '/en/', changefreq: 'daily', priority: 0.9, lastmod: new Date().toISOString() },
    { loc: '/zh/', changefreq: 'daily', priority: 0.9, lastmod: new Date().toISOString() },
  ],
  changefreq: 'daily',
  priority: 0.7,
  transform: async (config, path) => {
    // Increase priority for key pages
    let priority = 0.7;
    if (path === '/' || path === '/en' || path === '/zh') {
      priority = 1.0;
    } else if (path.includes('/learn/introduction') || path.includes('/api-reference')) {
      priority = 0.9;
    } else if (path.includes('/learn/') || path.includes('/blog/')) {
      priority = 0.8;
    }
    
    return {
      loc: path,
      changefreq: 'daily',
      priority,
      lastmod: new Date().toISOString(),
    };
  },
}
