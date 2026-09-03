import type { Locale } from '@/types'
import { LOCALES } from '@/types'
import { fr } from '@/locales/fr'
import { en } from '@/locales/en'
import type { Dict } from '@/locales/dict'

export function isLocale(value: string): value is Locale {
  return (LOCALES as string[]).includes(value)
}

export function dict(locale: Locale): Dict {
  return locale === 'en' ? en : fr
}

export function otherLocale(locale: Locale): Locale {
  return locale === 'fr' ? 'en' : 'fr'
}

// Même page dans l'autre locale : /fr/menu → /en/menu, /fr → /en.
export function switchLocalePath(pathname: string, to: Locale): string {
  const match = pathname.match(/^\/(fr|en)(\/.*)?$/)
  const rest = match ? (match[2] ?? '/') : pathname
  return `/${to}${rest === '/' ? '' : rest}`
}

// Date lisible : mardi 12 septembre 2026 / Tuesday 12 September 2026.
export function formatDate(iso: string, locale: Locale): string {
  const date = new Date(`${iso}T12:00:00`)
  if (Number.isNaN(date.getTime())) return iso
  return date.toLocaleDateString(locale === 'fr' ? 'fr-FR' : 'en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}
