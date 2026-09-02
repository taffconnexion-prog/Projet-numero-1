'use client'

import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { dishes, tastingMenu } from '@/data/menu'
import { DishCard } from './DishCard'
import { TastingCard } from './TastingCard'
import type { DishCategory } from '@/types'

type FilterId = 'tous' | DishCategory | 'degustation'

const FILTERS: Array<{ id: FilterId; label: string }> = [
  { id: 'tous', label: 'Tout' },
  { id: 'entrées', label: 'Entrées' },
  { id: 'plats', label: 'Plats' },
  { id: 'desserts', label: 'Desserts' },
  { id: 'boissons', label: 'Boissons' },
  { id: 'degustation', label: 'Menu Dégustation' },
]

// Filtre de carte en JavaScript pur (côté client, sans rechargement).
// Transition des cards : AnimatePresence + layout, 300ms, effet sobre.
export function MenuExplorer() {
  const [active, setActive] = useState<FilterId>('tous')
  const reduceMotion = useReducedMotion()

  const visible = active === 'tous' ? dishes : dishes.filter((dish) => dish.category === active)

  return (
    <div>
      <div role="group" aria-label="Filtrer la carte par catégorie" className="flex flex-wrap gap-2.5">
        {FILTERS.map((filter) => {
          const isActive = active === filter.id
          return (
            <button
              key={filter.id}
              type="button"
              onClick={() => setActive(filter.id)}
              aria-pressed={isActive}
              className={`border px-4 py-2 text-sm font-medium tracking-nav transition-colors duration-150 ${
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
        {active === 'degustation' ? 'Menu dégustation affiché' : `${visible.length} plats affichés`}
      </p>

      <AnimatePresence mode="wait" initial={false}>
        {active === 'degustation' ? (
          <motion.section
            key="degustation"
            aria-label="Menu Dégustation"
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduceMotion ? undefined : { opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="mt-10"
          >
            <TastingCard menu={tastingMenu} />
          </motion.section>
        ) : (
          <motion.ul
            key="grille"
            className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            initial={false}
            animate={{ opacity: 1 }}
            exit={reduceMotion ? undefined : { opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            <AnimatePresence mode="popLayout">
              {visible.map((dish) => (
                <motion.li
                  key={dish.id}
                  layout={!reduceMotion}
                  initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduceMotion ? undefined : { opacity: 0, y: 12 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  className="h-full"
                >
                  <DishCard dish={dish} />
                </motion.li>
              ))}
            </AnimatePresence>
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  )
}
