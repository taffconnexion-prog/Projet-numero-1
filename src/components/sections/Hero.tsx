'use client'

import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'
import type { Locale } from '@/types'
import { dict } from '@/lib/i18n'
import { CtaLink } from '@/components/ui/Cta'

// Hero plein écran — l’océan, sans marges.
// Animation d’entrée du titre : translateY(40 → 0) + opacity, 1.1s, une seule fois.
export function Hero({ locale }: { locale: Locale }) {
  const t = dict(locale).hero
  const reduceMotion = useReducedMotion()

  return (
    <section className="relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-ocean-deep">
      <Image
        src="/images/hero.jpg"
        alt={t.alt}
        width={1920}
        height={1080}
        priority
        sizes="100vw"
        className="absolute inset-0 h-full w-full object-cover"
      />
      {/* Overlay océan nuit (jamais noir pur), minimum 0.4 d’opacité */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-b from-ocean-deep/75 via-ocean-deep/55 to-ocean-deep/90"
      />

      <div className="relative z-10 mx-auto max-w-4xl px-5 pb-28 pt-40 text-center md:px-8">
        <motion.h1
          initial={reduceMotion ? false : { y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.1, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="font-display text-5xl font-semibold leading-display tracking-tightest text-sand-warm md:text-[4.5rem]"
        >
          Vers l’Océan
        </motion.h1>
        <p className="mx-auto mt-7 max-w-xl font-accent text-xl italic leading-relaxed text-sand-pale/90 md:text-2xl">
          {t.subtitle}
        </p>
        <div className="mt-12 flex flex-wrap items-center justify-center gap-5">
          <CtaLink href={`/${locale}/reservation`}>{t.reserve}</CtaLink>
          <CtaLink href={`/${locale}/menu`} variant="ghost">
            {t.menu}
          </CtaLink>
        </div>
      </div>

      {reduceMotion ? null : (
        <motion.a
          href="#maison"
          aria-label={t.scroll}
          className="absolute bottom-9 left-1/2 z-10 -translate-x-1/2"
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <svg viewBox="0 0 52 24" fill="none" className="h-6 w-14 text-sand-warm" aria-hidden="true">
            <path
              d="M2 12q6.5-8 13 0t13 0 13 0 9 0"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
            />
          </svg>
        </motion.a>
      )}
    </section>
  )
}
