import { Showcases } from "../../_components/showcases/showcases.jsx"
import { GoogleAnalytics } from '@next/third-parties/google'

export default async function Page() {
  return (
    <div className="md:px-8 xl:px-8">
      <Showcases />
      <GoogleAnalytics gaId="G-0MBRQQNHVC" />
    </div>
  )
}