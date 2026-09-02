'use client'

import { useEffect, useRef, useState } from 'react'
import type { RefObject } from 'react'

// Révèle un élément au scroll (IntersectionObserver) — une seule fois
// par session : un drapeau sessionStorage évite de rejouer l'animation
// lors des navigations suivantes dans la même session.
export function useRevealedOnce<T extends HTMLElement>(key: string): { ref: RefObject<T>; revealed: boolean } {
  const ref = useRef<T | null>(null)
  const [revealed, setRevealed] = useState(false)

  useEffect(() => {
    if (sessionStorage.getItem(key) === '1') {
      setRevealed(true)
      return
    }
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          sessionStorage.setItem(key, '1')
          setRevealed(true)
          observer.disconnect()
        }
      },
      { threshold: 0.15 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [key])

  return { ref, revealed }
}
