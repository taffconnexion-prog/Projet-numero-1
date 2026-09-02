import { Hero } from '@/components/sections/Hero'
import { SignatureSection } from '@/components/sections/SignatureSection'
import { MenuPreview } from '@/components/sections/MenuPreview'
import { GalleryMosaic } from '@/components/sections/GalleryMosaic'
import { LocationSection } from '@/components/sections/LocationSection'

export default function HomePage() {
  return (
    <>
      <Hero />
      <SignatureSection />
      <MenuPreview />
      <GalleryMosaic />
      <LocationSection />
    </>
  )
}
