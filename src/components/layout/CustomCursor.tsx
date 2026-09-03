'use client'

import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'framer-motion'

// Curseur custom — cercle de 20px qui suit la souris avec une légère
// latence, grandit doucement sur les liens, boutons et champs.
// Pointeur fin uniquement, désactivé en mouvement réduit.
const INTERACTIVE = 'a, button, input, select, textarea, label, [data-cursor]'

export function CustomCursor() {
  const reduceMotion = useReducedMotion()
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (reduceMotion || typeof window === 'undefined') return
    if (!window.matchMedia('(pointer: fine)').matches) return
    const ring = ringRef.current
    if (!ring) return

    let x = window.innerWidth / 2
    let y = window.innerHeight / 2
    let targetX = x
    let targetY = y
    let scale = 1
    let targetScale = 1
    let visible = false
    let raf = 0

    const onMove = (event: MouseEvent) => {
      targetX = event.clientX
      targetY = event.clientY
      if (!visible) {
        visible = true
        x = targetX
        y = targetY
        ring.style.opacity = '1'
      }
      const target = event.target as Element | null
      targetScale = target?.closest?.(INTERACTIVE) ? 2.1 : 1
    }

    const onLeave = () => {
      visible = false
      ring.style.opacity = '0'
    }

    const loop = () => {
      x += (targetX - x) * 0.16
      y += (targetY - y) * 0.16
      scale += (targetScale - scale) * 0.16
      ring.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%) scale(${scale})`
      ring.style.backgroundColor = targetScale > 1.4 ? 'rgba(232, 201, 138, 0.08)' : 'transparent'
      raf = requestAnimationFrame(loop)
    }

    ring.style.opacity = '0'
    window.addEventListener('mousemove', onMove, { passive: true })
    document.documentElement.addEventListener('mouseleave', onLeave)
    raf = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMove)
      document.documentElement.removeEventListener('mouseleave', onLeave)
    }
  }, [reduceMotion])

  if (reduceMotion) return null

  return (
    <div
      ref={ringRef}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[110] hidden h-5 w-5 rounded-full border border-sand-warm/60 opacity-0 md:block"
      style={{ willChange: 'transform' }}
    />
  )
}
