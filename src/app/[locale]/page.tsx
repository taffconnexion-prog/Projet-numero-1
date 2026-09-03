import { isLocale } from '@/lib/i18n'
import { Hero } from '@/components/sections/Hero'
import { SignatureSection } from '@/components/sections/SignatureSection'
import { MenuPreview } from '@/components/sections/MenuPreview'
import { GalleryMosaic } from '@/components/sections/GalleryMosaic'
import { LocationSection } from '@/components/sections/LocationSection'

export default function HomePage({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) return null
  const locale = params.locale

  return (
    <>
      <Hero locale={locale} />
      <SignatureSection locale={locale} />
      <MenuPreview locale={locale} />
      <GalleryMosaic locale={locale} />
      <LocationSection locale={locale} />
    </>
  )
}
