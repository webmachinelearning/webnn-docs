export { middleware } from 'nextra/locales'

export const config = {
  // Matcher for locale routing - includes root path
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|icon.svg|apple-icon.png|android-chrome-512x512.png|manifest|_pagefind|llms.txt|netron|demos|robots.txt|sitemap.xml|.well-known).*)'
  ]
}
