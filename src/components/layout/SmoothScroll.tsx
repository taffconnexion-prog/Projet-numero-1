'use client'

import { useEffect } from 'react'
import Lenis from 'lenis'
import { useReducedMotion } from 'framer-motion'

// Scroll ultra-fluide (Lenis) — désactivé en mouvement réduit.
// Gère aussi les ancres internes (ex. #maison).
export function SmoothScroll() {
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    if (reduceMotion || typeof window === 'undefined') return
    const lenis = new Lenis({ lerp: 0.09 })
    let raf = 0
    const loop = (time: number) => {
      lenis.raf(time)
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => {
      cancelAnimationFrame(raf)
      lenis.destroy()
    }
  }, [reduceMotion])

  return null
}
