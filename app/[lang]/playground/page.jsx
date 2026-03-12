import { Playground } from '../../_components/playground'
import { GoogleAnalytics } from '@next/third-parties/google'

export async function generateMetadata(props) {
  const { lang } = await props.params;
  return {
    alternates: {
      canonical: `https://webnn.io/${lang}/playground`,
      languages: {
        'en': 'https://webnn.io/en/playground',
        'zh': 'https://webnn.io/zh/playground',
        'x-default': 'https://webnn.io/en/playground',
      },
    },
  };
}

export default function Page() {
  return (
    <div>
      <Playground isEditorPage={false} />
      <GoogleAnalytics gaId="G-0MBRQQNHVC" />
    </div>
  );
}