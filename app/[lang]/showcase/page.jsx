import { Showcases } from "../../_components/showcases/showcases.jsx"
import { GoogleAnalytics } from '@next/third-parties/google'

export async function generateMetadata(props) {
  const { lang } = await props.params;
  return {
    alternates: {
      canonical: `https://webnn.io/${lang}/showcase`,
      languages: {
        'en': 'https://webnn.io/en/showcase',
        'zh': 'https://webnn.io/zh/showcase',
        'x-default': 'https://webnn.io/en/showcase',
      },
    },
  };
}

export default async function Page() {
  return (
    <div className="md:px-8 xl:px-8">
      <Showcases />
      <GoogleAnalytics gaId="G-0MBRQQNHVC" />
    </div>
  )
}