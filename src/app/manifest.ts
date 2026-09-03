import type { MetadataRoute } from 'next'
import { site } from '@/lib/site'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.name,
    short_name: "Vers l'Océan",
    description:
      'Restaurant de cuisine béninoise raffinée en bord d’Atlantique, à Fidjrossè — Cotonou.',
    start_url: '/fr',
    display: 'standalone',
    background_color: '#0A2E3C',
    theme_color: '#0A2E3C',
    icons: [
      { src: '/icon-512.png', sizes: '512x512', type: 'image/png' },
      { src: '/icon-512.png', sizes: '192x192', type: 'image/png' },
    ],
  }
}
