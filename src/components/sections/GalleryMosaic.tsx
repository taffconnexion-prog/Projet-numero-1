'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import type { Locale } from '@/types'
import { dict } from '@/lib/i18n'
import { gallery } from '@/data/gallery'
import { SectionTitle } from '@/components/ui/SectionTitle'
import styles from './GalleryMosaic.module.css'

const SESSION_KEY = 'vers-locean:gallery'

// Emplacement de chaque photo dans la mosaïque (grid custom, pas de librairie).
const SPANS = ['col-span-2 row-span-2', '', '', 'col-span-2', '']

type RevealState = 'visible' | 'masked' | 'reveal' | 'shown'

export function GalleryMosaic({ locale }: { locale: Locale }) {
  const t = dict(locale).ambiance
  const { ref, revealed, shown } = useGalleryReveal()
  const reduceMotion = useReducedMotion()

  const state: RevealState = reduceMotion || shown ? 'shown' : revealed ? 'reveal' : 'masked'

  return (
    <section className="bg-mangrove text-sand-pale" aria-labelledby="ambiance-titre">
      <div className="mx-auto max-w-content px-5 py-20 md:px-8 md:py-[120px]">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <SectionTitle id="ambiance-titre" title={t.title} accent={t.accent} />
          <p className="text-sm tracking-nav text-mist">{t.location}</p>
        </div>

        <div
          ref={ref}
          className={`mt-14 grid auto-rows-[170px] grid-cols-2 gap-3 md:auto-rows-[210px] md:grid-cols-4 md:gap-4 ${
            state === 'masked' ? styles.masked : state === 'reveal' ? styles.reveal : ''
          }`}
        >
          {gallery.map((item, position) => (
            <figure
              key={item.id}
              className={`relative overflow-hidden border border-sand-warm/15 ${SPANS[position] ?? ''}`}
            >
              <Image
                src={item.src}
                alt={item.alt[locale]}
                fill
                sizes="(min-width: 768px) 25vw, 50vw"
                loading="lazy"
                className="object-cover"
              />
            </figure>
          ))}

          <figure className="col-span-2 flex flex-col justify-center gap-3 border border-sand-warm/15 bg-ocean-deep p-8 md:col-span-3">
            <p className="font-accent text-xl italic text-sand-warm">{t.caption}</p>
            <p className="max-w-xs text-sm leading-body text-mist">{t.subcaption}</p>
          </figure>
        </div>
      </div>
    </section>
  )
}

// Révélation une fois par session — IntersectionObserver + sessionStorage.
// Sans JS : « visible » par défaut (dégradation gracieuse).
function useGalleryReveal() {
  const ref = useRef<HTMLDivElement | null>(null)
  const [revealed, setRevealed] = useState(false)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    if (sessionStorage.getItem(SESSION_KEY) === '1') {
      setShown(true)
      return
    }
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          sessionStorage.setItem(SESSION_KEY, '1')
          setRevealed(true)
          observer.disconnect()
        }
      },
      { threshold: 0.15 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return { ref, revealed, shown }
}
