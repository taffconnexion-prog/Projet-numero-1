'use client'

import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'
import { CtaLink } from '@/components/ui/Cta'

// Hero plein écran — l'océan atlantique vu depuis la terrasse.
// Animation d'entrée du titre : translateY(40 → 0) + opacity, 900ms, une seule fois.
export function Hero() {
  const reduceMotion = useReducedMotion()

  return (
    <section className="relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-ocean-deep">
      <Image
        src="/images/hero.jpg"
        alt="L’océan Atlantique au coucher du soleil, vu depuis la terrasse en bois de Vers l’Océan à Fidjrossè"
        width={1920}
        height={1080}
        priority
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-b from-ocean-deep/70 via-ocean-deep/30 to-ocean-deep/80" />

      <div className="relative z-10 mx-auto max-w-4xl px-5 pb-24 pt-32 text-center md:px-8">
        <motion.h1
          initial={reduceMotion ? false : { y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
          className="font-display text-4xl font-semibold leading-[1.05] text-sand-warm md:text-[4.5rem]"
        >
          Vers l’Océan
        </motion.h1>
        <p className="mx-auto mt-6 max-w-2xl font-accent text-xl italic leading-relaxed text-sand-warm md:text-[1.4rem]">
          La cuisine béninoise dans sa plus noble expression, les pieds dans l’Atlantique
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <CtaLink href="/reservation" variant="primary">Réserver une table</CtaLink>
          <CtaLink href="/menu" variant="ghost">Découvrir la carte</CtaLink>
        </div>
      </div>

      {reduceMotion ? null : (
        <motion.a
          href="#maison"
          aria-label="Faire défiler vers la section suivante"
          className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <svg viewBox="0 0 52 24" fill="none" className="h-6 w-14 text-sand-warm" aria-hidden="true">
            <path
              d="M2 12q6.5-8 13 0t13 0 13 0 9 0"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
          </svg>
        </motion.a>
      )}
    </section>
  )
}
