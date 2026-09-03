'use client'

import { useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import { motion, useReducedMotion } from 'framer-motion'

// État de chargement : fine barre sable dorée en haut de page
// (aucun spinner générique), jouée à chaque navigation de page.
export function RouteProgress() {
  const pathname = usePathname()
  const reduceMotion = useReducedMotion()
  const [phase, setPhase] = useState<'hidden' | 'loading' | 'finishing'>('hidden')
  const firstRender = useRef(true)

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false
      return
    }
    if (reduceMotion) return
    setPhase('loading')
    const t1 = setTimeout(() => setPhase('finishing'), 340)
    const t2 = setTimeout(() => setPhase('hidden'), 800)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [pathname, reduceMotion])

  if (phase === 'hidden') return null

  return (
    <div aria-hidden="true" className="fixed inset-x-0 top-0 z-[100] h-[2px]">
      <motion.div
        className="h-full origin-left bg-sand-warm"
        initial={{ scaleX: 0, opacity: 1 }}
        animate={{ scaleX: phase === 'finishing' ? 1 : 0.66, opacity: phase === 'finishing' ? 0 : 1 }}
        transition={{ duration: phase === 'finishing' ? 0.42 : 0.34, ease: [0.25, 0.46, 0.45, 0.94] }}
      />
    </div>
  )
}
