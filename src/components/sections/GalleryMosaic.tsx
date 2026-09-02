'use client'

import Image from 'next/image'
import { useReducedMotion } from 'framer-motion'
import { gallery } from '@/data/gallery'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { useRevealedOnce } from '@/hooks/useRevealedOnce'
import styles from './GalleryMosaic.module.css'

// Emplacement de chaque photo dans la mosaïque (grid custom, pas de librairie).
const SPANS = [
  'col-span-2 row-span-2',
  '',
  '',
  'col-span-2',
  '',
]

export function GalleryMosaic() {
  const { ref, revealed } = useRevealedOnce<HTMLDivElement>('vers-locean:gallery')
  const reduceMotion = useReducedMotion()
  const shown = revealed || Boolean(reduceMotion)

  return (
    <section className="bg-mangrove text-sand-pale" aria-labelledby="ambiance">
      <div className="mx-auto max-w-content px-5 py-20 md:px-8 md:py-28">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionTitle id="ambiance" title="L’ambiance" accent="La rive, à la tombée du jour." />
          <p className="text-sm tracking-nav text-mist">
            Fidjrossè, Cotonou
          </p>
        </div>

        <div
          ref={ref}
          className={`mt-12 grid auto-rows-[160px] grid-cols-2 gap-3 md:auto-rows-[200px] md:grid-cols-4 md:gap-4 ${
            shown ? styles.revealed : styles.mask
          }`}
        >
          {gallery.map((item, position) => (
            <figure key={item.id} className={`relative overflow-hidden ${SPANS[position] ?? ''}`}>
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes="(min-width: 768px) 25vw, 50vw"
                loading="lazy"
                className="object-cover"
              />
            </figure>
          ))}

          <figure className="col-span-2 flex flex-col justify-center gap-2 bg-ocean-deep p-6 md:col-span-3">
            <p className="font-accent text-lg italic text-sand-warm">La terrasse, les lanternes, l’océan.</p>
            <p className="text-sm leading-relaxed text-mist">
              Du déjeuner aux derniers verres, la rive change avec la lumière.
            </p>
          </figure>
        </div>
      </div>
    </section>
  )
}
