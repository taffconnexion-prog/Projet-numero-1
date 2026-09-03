'use client'

import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import type { DishCategory, Locale } from '@/types'
import type { Dict } from '@/locales/dict'
import { dishes, tastingMenu } from '@/data/menu'
import { DishCard } from './DishCard'
import { TastingCard } from './TastingCard'

type FilterId = 'tous' | DishCategory | 'degustation'

interface MenuExplorerProps {
  locale: Locale
  t: Dict['pages']['menu']
  reserveHref: string
}

// Filtre de carte en JavaScript pur (côté client, sans rechargement).
// Transition des cards : AnimatePresence + layout, 300ms, effet sobre.
export function MenuExplorer({ locale, t, reserveHref }: MenuExplorerProps) {
  const [active, setActive] = useState<FilterId>('tous')
  const reduceMotion = useReducedMotion()

  const visible = active === 'tous' ? dishes : dishes.filter((dish) => dish.category === active)

  const filters: Array<{ id: FilterId; label: string }> = [
    { id: 'tous', label: t.filters.all },
    { id: 'entrées', label: t.filters.entrees },
    { id: 'plats', label: t.filters.plats },
    { id: 'desserts', label: t.filters.desserts },
    { id: 'boissons', label: t.filters.boissons },
    { id: 'degustation', label: t.filters.degustation },
  ]

  return (
    <div>
      <div role="group" aria-label={t.group} className="flex flex-wrap gap-3">
        {filters.map((filter) => {
          const isActive = active === filter.id
          return (
            <button
              key={filter.id}
              type="button"
              onClick={() => setActive(filter.id)}
              aria-pressed={isActive}
              className={`border px-5 py-2.5 text-sm font-medium tracking-nav transition-colors duration-300 ${
                isActive
                  ? 'border-ocean-mid bg-ocean-mid text-sand-pale'
                  : 'border-ocean-mid/40 bg-transparent text-ocean-deep hover:border-ocean-mid'
              }`}
            >
              {filter.label}
            </button>
          )
        })}
      </div>
      <p aria-live="polite" className="sr-only">
        {active === 'degustation' ? t.tastingShown : `${visible.length} ${t.dishesShown}`}
      </p>

      <AnimatePresence mode="wait" initial={false}>
        {active === 'degustation' ? (
          <motion.section
            key="degustation"
            aria-label={t.filters.degustation}
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduceMotion ? undefined : { opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="mt-12"
          >
            <TastingCard menu={tastingMenu} locale={locale} reserveHref={reserveHref} reserveLabel={t.reserveTasting} />
          </motion.section>
        ) : (
          <motion.ul
            key="grille"
            className="mt-12 grid gap-7 sm:grid-cols-2 lg:grid-cols-3"
            initial={false}
            animate={{ opacity: 1 }}
            exit={reduceMotion ? undefined : { opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <AnimatePresence mode="popLayout">
              {visible.map((dish) => (
                <motion.li
                  key={dish.id}
                  layout={!reduceMotion}
                  initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduceMotion ? undefined : { opacity: 0, y: 12 }}
                  transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="h-full"
                >
                  <DishCard dish={dish} locale={locale} />
                </motion.li>
              ))}
            </AnimatePresence>
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  )
}
