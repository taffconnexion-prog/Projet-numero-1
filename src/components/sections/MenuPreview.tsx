'use client'

import Image from 'next/image'
import { useState } from 'react'
import type { Locale } from '@/types'
import { dict } from '@/lib/i18n'
import { dishes } from '@/data/menu'
import { Badge } from '@/components/ui/Badge'
import { CtaLink } from '@/components/ui/Cta'
import { SectionTitle } from '@/components/ui/SectionTitle'

// Trois plats signature — navigation manuelle au clic, aucune rotation.
const FEATURED_IDS = ['1', '2', '3']
const FEATURED = dishes.filter((dish) => FEATURED_IDS.includes(dish.id))

function ArrowButton({ direction, label, onClick }: { direction: 'prev' | 'next'; label: string; onClick: () => void }) {
  const isPrev = direction === 'prev'
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="grid h-12 w-12 place-items-center rounded-full border border-sand-warm/40 text-sand-warm transition-colors duration-300 hover:border-sand-warm hover:bg-sand-warm/10"
    >
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
        <path
          d={isPrev ? 'M14.5 5.5L8 12l6.5 6.5' : 'M9.5 5.5L16 12l-6.5 6.5'}
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  )
}

export function MenuPreview({ locale }: { locale: Locale }) {
  const t = dict(locale).carte
  const [index, setIndex] = useState(0)
  const dish = FEATURED[index]

  const previous = () => setIndex((value) => (value - 1 + FEATURED.length) % FEATURED.length)
  const next = () => setIndex((value) => (value + 1) % FEATURED.length)

  return (
    <section className="bg-ocean-deep text-sand-pale" aria-labelledby="carte-titre">
      <div className="mx-auto max-w-content px-5 py-20 md:px-8 md:py-[120px]">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <SectionTitle id="carte-titre" title={t.title} accent={t.accent} />
          <p className="text-sm tracking-nav text-mist">
            {index + 1} / {FEATURED.length}
          </p>
        </div>

        <div className="mt-14 grid items-center gap-12 md:grid-cols-2 md:gap-20">
          <div className="relative aspect-[4/3] overflow-hidden border border-sand-warm/20">
            <Image
              key={dish.id}
              src={dish.image}
              alt={dish.name[locale]}
              width={1200}
              height={900}
              sizes="(min-width: 768px) 50vw, 100vw"
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </div>

          <div className="max-w-prose">
            <Badge tag={dish.tag} locale={locale} />
            <h3 className="mt-6 font-display text-[2rem] font-semibold leading-display tracking-tightest text-sand-pale md:text-3xl">
              {dish.name[locale]}
            </h3>
            <p className="mt-5 text-[0.9375rem] leading-body text-mist">{dish.description[locale]}</p>
            <p className="mt-7 font-display text-lg font-semibold text-sand-warm">{dish.price}</p>
            <div className="mt-10 flex items-center gap-4">
              <ArrowButton direction="prev" label={t.prev} onClick={previous} />
              <ArrowButton direction="next" label={t.next} onClick={next} />
            </div>
          </div>
        </div>

        <div className="mt-16 text-center">
          <CtaLink href={`/${locale}/menu`} variant="ghost">
            {t.full}
          </CtaLink>
        </div>
      </div>
    </section>
  )
}
