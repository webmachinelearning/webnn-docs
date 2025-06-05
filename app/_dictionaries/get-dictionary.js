// import 'server-only'

const dictionaries = {
  en: () => import('./en'),
  zh: () => import('./zh'),
}

export async function getDictionary(locale) {
  const { default: dictionary } = await (
    dictionaries[locale] || dictionaries.en
  )()
  return dictionary
}

export function getDirection(locale) {
  return locale === 'es' ? 'rtl' : 'ltr'
}