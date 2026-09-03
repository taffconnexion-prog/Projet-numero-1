import type { MetadataRoute } from 'next'
import { site } from '@/lib/site'

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ['', '/menu', '/about', '/contact', '/reservation']
  const entries: MetadataRoute.Sitemap = []

  for (const path of paths) {
    const fr = `${site.url}/fr${path}`
    const en = `${site.url}/en${path}`
    const alternates = { languages: { fr, en } }
    entries.push({ url: fr, lastModified: new Date(), changeFrequency: 'monthly', priority: path === '' ? 1 : 0.8, alternates })
    entries.push({ url: en, lastModified: new Date(), changeFrequency: 'monthly', priority: path === '' ? 0.9 : 0.7, alternates })
  }

  return entries
}
