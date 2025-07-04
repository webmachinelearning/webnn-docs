import { getDictionary } from '../_dictionaries/get-dictionary'

export const TopContent = async ({ title, date, authors, lang }) => {
  const dictionary = await getDictionary(lang)
  const dateObj = new Date(date)
  return (
    <>
      <h1 className="x:tracking-tight x:text-slate-900 x:dark:text-slate-100 x:font-bold x:mt-2 x:text-4xl">{title}</h1>
      <div className="my-4 text-sm text-gray-400">
        <time dateTime={dateObj.toISOString()}>
          {dateObj.toLocaleDateString(lang, {
            month: 'long',
            day: 'numeric',
            year: 'numeric'
          })}
        </time>{' '}
        {dictionary.by}{' '}
        {authors.map(author => (
          <span key={author.name} className="not-last:after:content-[',_']">
            <a
              href={author.link}
              target="_blank"
              rel="noreferrer"
              className="text-gray-800 dark:text-gray-100"
            >
              {author.name}
            </a>
          </span>
        ))}
      </div>
    </>
  )
}