import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'
import { notFound } from 'next/navigation'
import { isLocale, dict } from '@/lib/i18n'
import { site } from '@/lib/site'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { PageTransition } from '@/components/layout/PageTransition'
import { SmoothScroll } from '@/components/layout/SmoothScroll'
import { RouteProgress } from '@/components/layout/RouteProgress'
import { CustomCursor } from '@/components/layout/CustomCursor'

// Deux familles seulement : Cormorant Garamond (titres + italiques) et
// DM Sans (corps). Fichiers variables SIL OFL dans public/fonts/.
const display = localFont({
  src: [{ path: '../../../public/fonts/cormorant-garamond.ttf', weight: '300 700', style: 'normal' }],
  variable: '--font-display',
  display: 'swap',
})

const accent = localFont({
  src: [{ path: '../../../public/fonts/cormorant-garamond-italic.ttf', weight: '300 700', style: 'italic' }],
  variable: '--font-accent',
  display: 'swap',
})

const body = localFont({
  src: [{ path: '../../../public/fonts/dm-sans.ttf', weight: '100 1000', style: 'normal' }],
  variable: '--font-body',
  display: 'swap',
})

// Toutes les pages sont pré-rendues statiquement pour les deux locales.
export const generateStaticParams = () => [
  { locale: 'fr' },
  { locale: 'en' },
]

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const locale = isLocale(params.locale) ? params.locale : 'fr'
  const t = dict(locale)
  return {
    metadataBase: new URL(site.url),
    title: {
      template: `%s | ${t.meta.site}`,
      default: t.meta.default,
    },
    description: t.meta.description,
    openGraph: {
      type: 'website',
      locale: t.meta.ogLocale,
      url: site.url,
      siteName: site.name,
      title: t.meta.default,
      description: t.meta.description,
      images: [{ url: '/og-image.jpg', width: 1200, height: 630 }],
    },
    alternates: {
      languages: { fr: '/fr', en: '/en' },
    },
    robots: { index: true, follow: true },
  }
}

export default function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  if (!isLocale(params.locale)) notFound()
  const t = dict(params.locale)

  return (
    <html lang={params.locale} className={`${display.variable} ${accent.variable} ${body.variable}`}>
      <body className="bg-ocean-deep font-sans text-base text-sand-pale">
        <SmoothScroll />
        <RouteProgress />
        <CustomCursor />
        <a
          href="#contenu"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[90] focus:bg-ocean-mid focus:px-5 focus:py-3 focus:text-sm focus:text-sand-pale"
        >
          {t.skip}
        </a>
        <Header locale={params.locale} t={t} />
        <PageTransition>
          <main id="contenu">{children}</main>
        </PageTransition>
        <Footer locale={params.locale} t={t} />
      </body>
    </html>
  )
}
