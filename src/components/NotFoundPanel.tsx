'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'
import { isLocale, dict } from '@/lib/i18n'

// 404 dans la charte — côté client car not-found.tsx (server) ne reçoit
// pas de params dans Next 14.
export function NotFoundPanel() {
  const params = useParams<{ locale: string }>()
  const locale = isLocale(params?.locale) ? params.locale : 'fr'
  const t = dict(locale)

  return (
    <section className="flex min-h-[75svh] items-center justify-center bg-ocean-deep px-5 pt-24">
      <div className="max-w-prose text-center">
        <p className="font-accent text-2xl italic text-sand-warm">{t.notFound.pre}</p>
        <h1 className="mt-6 font-display text-5xl font-semibold leading-display tracking-tightest text-sand-pale md:text-7xl">
          {t.notFound.title}
        </h1>
        <p className="mt-6 text-base leading-body text-mist">{t.notFound.sub}</p>
        <Link
          href={`/${locale}`}
          className="mt-10 inline-block text-sm font-medium text-sand-warm underline decoration-ocean-light decoration-1 underline-offset-[6px] transition-colors duration-300 hover:text-ocean-light"
        >
          {t.notFound.home}
        </Link>
      </div>
    </section>
  )
}
