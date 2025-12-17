export { middleware } from 'nextra/locales'

export const config = {
  // Matcher ignoring `/_next/`, `/api/`, and static files like `llms.txt` and the `netron` folder
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|icon.svg|apple-icon.png|android-chrome-512x512.png|manifest|_pagefind|llms.txt|netron|demos|robots.txt|sitemap.xml).*)'
  ]
}