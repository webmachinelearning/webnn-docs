import { generateStaticParamsFor, importPage } from 'nextra/pages'
import { useMDXComponents } from '../../../mdx-components'

export const generateStaticParams = generateStaticParamsFor('mdxPath')

// Unknown paths must return a real 404 status, not a 200 "soft 404" with noindex
export const dynamicParams = false

export async function generateMetadata(props) {
  const params = await props.params;
  const { metadata } = await importPage(params.mdxPath, params.lang);
  const pagePath = params.mdxPath ? params.mdxPath.join('/') : '';
  return {
    ...metadata,
    alternates: {
      canonical: `https://webnn.io/${params.lang}${pagePath ? '/' + pagePath : ''}`,
      languages: {
        'en': `https://webnn.io/en${pagePath ? '/' + pagePath : ''}`,
        'zh': `https://webnn.io/zh${pagePath ? '/' + pagePath : ''}`,
        'x-default': `https://webnn.io/en${pagePath ? '/' + pagePath : ''}`,
      },
    },
  };
}

const Wrapper = useMDXComponents().wrapper;

export default async function Page(props) {
  const params = await props.params;
  // console.log('++++++++++++++++++++++')
  // console.log(`++++ ${params.lang} ++++`);

  const result = await importPage(params.mdxPath, params.lang);
  const { default: MDXContent, toc, metadata } = result;
  return (
    <Wrapper toc={toc} metadata={metadata}>
      <MDXContent {...props} params={params} />
    </Wrapper>
  )
}