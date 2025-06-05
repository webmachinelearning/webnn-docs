import nextra from 'nextra'
 
const withNextra = nextra({
  defaultShowCopyCode: true,
  latex: true,
  contentDirBasePath: '/',
  unstable_shouldAddLocaleToLinks: true
  // ... Other Nextra config options
})
 
// You can include other Next.js configuration options here, in addition to Nextra settings:
export default withNextra({
  redirects: async () => {
    return [
      {
        source: '/:locale(en|zh)/playground/webnn',
        destination: '/:locale/playground/',
        permanent: true,
      },
      {
        source: '/playground/webnn',
        destination: '/playground',
        permanent: true, 
      },
      {
        source: '/:locale(en|zh)/playground/onnxruntime',
        destination: '/:locale/playground/',
        permanent: true,
      },
      {
        source: '/playground/onnxruntime',
        destination: '/playground',
        permanent: true, 
      },
      {
        source: '/:locale(en|zh)/playground/transformersjs',
        destination: '/:locale/playground/',
        permanent: true,
      },
      {
        source: '/playground/transformersjs',
        destination: '/playground',
        permanent: true, 
      },
      {
        source: '/:locale(en|zh)/playground/litert',
        destination: '/:locale/playground/',
        permanent: true,
      },
      {
        source: '/playground/litert',
        destination: '/playground',
        permanent: true, 
      },
    ]
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true
  },
  i18n: {
    locales: ['en', 'zh'],
    defaultLocale: 'en'
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'microsoft.github.io',
        port: '',
        pathname: '/webnn-developer-preview/**',
        search: '',
      },
      {
        protocol: 'https',
        hostname: 'webmachinelearning.github.io',
        port: '',
        search: '',
      },
    ],
  },
})