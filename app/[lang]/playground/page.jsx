import { Playground } from '../../_components/playground'
import { GoogleAnalytics } from '@next/third-parties/google'

export default function Page() {
  return (
    <div>
      <Playground isEditorPage={false} />
      <GoogleAnalytics gaId="G-0MBRQQNHVC" />
    </div>
  );
}