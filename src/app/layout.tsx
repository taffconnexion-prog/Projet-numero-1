import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { PageTransition } from '@/components/layout/PageTransition'
import { site } from '@/lib/site'

// Polices Google auto-hébergées via next/font/local — aucune dépendance
// à un CDN externe, chargement fiable au build, pas de FOUT.
// Fichiers variables SIL OFL dans public/fonts/ (voir OFL.txt).
const display = localFont({
  src: [{ path: '../../public/fonts/cormorant-garamond.ttf', weight: '300 700', style: 'normal' }],
  variable: '--font-display',
  display: 'swap',
})

const body = localFont({
  src: [{ path: '../../public/fonts/dm-sans.ttf', weight: '100 1000', style: 'normal' }],
  variable: '--font-body',
  display: 'swap',
})

const accent = localFont({
  src: [{ path: '../../public/fonts/playfair-display-italic.ttf', weight: '400 900', style: 'italic' }],
  variable: '--font-accent',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    template: "%s | Vers l'Océan — Restaurant Béninois à Cotonou",
    default: "Vers l'Océan — Restaurant Béninois en Bord de Mer à Cotonou",
  },
  description:
    "Restaurant de cuisine béninoise raffinée sur la plage de Fidjrossè à Cotonou. Saveurs authentiques, produits locaux, vue sur l'Atlantique. Réservation : +229 01 23 45 67",
  keywords: [
    'restaurant béninois',
    'Cotonou',
    'cuisine africaine',
    'Fidjrossè',
    'bord de mer',
    'gastronomie béninoise',
  ],
  openGraph: {
    type: 'website',
    locale: 'fr_BJ',
    url: 'https://verslocean.bj',
    siteName: "Vers l'Océan",
    images: [{ url: '/og-image.jpg', width: 1200, height: 630 }],
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${display.variable} ${body.variable} ${accent.variable}`}>
      <body className="bg-ocean-deep font-sans text-sand-pale antialiased">
        <a
          href="#contenu"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:bg-ocean-mid focus:px-4 focus:py-2 focus:text-sand-pale"
        >
          Aller au contenu principal
        </a>
        <Header />
        <PageTransition>
          <main id="contenu">{children}</main>
        </PageTransition>
        <Footer />
      </body>
    </html>
  )
}
