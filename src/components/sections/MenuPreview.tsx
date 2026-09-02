'use client'

import Image from 'next/image'
import { useState } from 'react'
import { dishes } from '@/data/menu'
import { Badge } from '@/components/ui/Badge'
import { CtaLink } from '@/components/ui/Cta'
import { SectionTitle } from '@/components/ui/SectionTitle'

// Les trois plats signature mis en avant — navigation manuelle au clic
// (aucune rotation automatique).
const FEATURED_IDS = ['1', '2', '3']
const FEATURED = dishes.filter((dish) => FEATURED_IDS.includes(dish.id))

function ArrowButton({ direction, onClick }: { direction: 'prev' | 'next'; onClick: () => void }) {
  const isPrev = direction === 'prev'
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={isPrev ? 'Plat précédent' : 'Plat suivant'}
      className="grid h-11 w-11 place-items-center rounded-full border border-sand-warm/40 text-sand-warm transition-colors duration-150 hover:border-sand-warm hover:bg-sand-warm/10"
    >
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
        <path
          d={isPrev ? 'M14.5 5.5L8 12l6.5 6.5' : 'M9.5 5.5L16 12l-6.5 6.5'}
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  )
}

export function MenuPreview() {
  const [index, setIndex] = useState(0)
  const dish = FEATURED[index]

  const previous = () => setIndex((value) => (value - 1 + FEATURED.length) % FEATURED.length)
  const next = () => setIndex((value) => (value + 1) % FEATURED.length)

  return (
    <section className="bg-ocean-deep text-sand-pale" aria-labelledby="menu-apercu">
      <div className="mx-auto max-w-content px-5 py-20 md:px-8 md:py-28">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionTitle
            id="menu-apercu"
            title="La carte, en trois temps"
            accent="Nos plats signature, servis face à l’océan."
          />
          <p className="text-sm tracking-nav text-mist">
            {index + 1} / {FEATURED.length}
          </p>
        </div>

        <div className="mt-12 grid items-center gap-10 md:grid-cols-2 md:gap-16">
          <div className="relative aspect-[4/3] overflow-hidden">
            <Image
              key={dish.id}
              src={dish.image}
              alt={dish.name}
              width={1200}
              height={900}
              sizes="(min-width: 768px) 50vw, 100vw"
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </div>

          <div>
            <Badge tag={dish.tag} />
            <h3 className="mt-5 font-display text-[1.75rem] font-semibold text-sand-pale md:text-3xl">
              {dish.name}
            </h3>
            <p className="mt-4 max-w-xl text-[0.9375rem] leading-relaxed text-mist">{dish.description}</p>
            <p className="mt-6 font-display text-lg font-semibold text-sand-warm">{dish.price}</p>
            <div className="mt-8 flex items-center gap-3">
              <ArrowButton direction="prev" onClick={previous} />
              <ArrowButton direction="next" onClick={next} />
            </div>
          </div>
        </div>

        <div className="mt-14 text-center">
          <CtaLink href="/menu" variant="ghost">Voir la carte complète</CtaLink>
        </div>
      </div>
    </section>
  )
}
