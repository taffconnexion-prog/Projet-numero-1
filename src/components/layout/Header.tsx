'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { useScrolled } from '@/hooks/useScrolled'
import { CtaLink } from '@/components/ui/Cta'

const NAV_LINKS = [
  { href: '/', label: 'Accueil' },
  { href: '/menu', label: 'Menu' },
  { href: '/about', label: 'À propos' },
  { href: '/contact', label: 'Contact' },
] as const

interface NavLinkProps {
  href: string
  label: string
  pathname: string
  onNavigate?: () => void
}

// Lien de navigation — underline qui glisse (scaleX 0 → 1, 200ms, origine left).
function NavLink({ href, label, pathname, onNavigate }: NavLinkProps) {
  const reduceMotion = useReducedMotion()
  const isActive = pathname === href
  return (
    <Link
      href={href}
      onClick={onNavigate}
      aria-current={isActive ? 'page' : undefined}
      className={`relative py-2 text-sm font-medium tracking-nav transition-colors duration-150 ${
        isActive ? 'text-ocean-light' : 'text-sand-pale hover:text-ocean-light'
      }`}
    >
      {label}
      <motion.span
        aria-hidden="true"
        initial={false}
        animate={{ scaleX: isActive ? 1 : 0 }}
        whileHover={{ scaleX: 1 }}
        transition={{ duration: reduceMotion ? 0 : 0.2, ease: 'easeOut' }}
        className="absolute inset-x-0 bottom-0 h-px origin-left bg-ocean-light"
      />
    </Link>
  )
}

function WaveIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6 text-ocean-light" aria-hidden="true">
      <path
        d="M2 12c2.5-3.5 5-3.5 7.5 0s5 3.5 7.5 0 4.5-3 5 0"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M4 17.5c2-3 4.5-3 6.5 0s4.5 3 6.5 0"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        opacity="0.5"
      />
    </svg>
  )
}

export function Header() {
  const pathname = usePathname()
  const scrolled = useScrolled(24)
  const [open, setOpen] = useState(false)

  const close = () => setOpen(false)

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled || open ? 'bg-ocean-deep/95 backdrop-blur-sm' : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex h-20 max-w-content items-center justify-between px-5 md:px-8">
        <Link href="/" onClick={close} aria-label="Vers l’Océan — retour à l’accueil" className="flex items-center gap-2.5">
          <WaveIcon />
          <span className="font-display text-2xl font-semibold text-sand-warm">Vers l’Océan</span>
        </Link>

        <nav aria-label="Navigation principale" className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <NavLink key={link.href} href={link.href} label={link.label} pathname={pathname} />
          ))}
        </nav>

        <div className="hidden md:block">
          <CtaLink href="/reservation" variant="primary">Réserver</CtaLink>
        </div>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls="menu-mobile"
          aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
          className="p-2 text-sand-pale md:hidden"
        >
          {open ? (
            <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden="true">
              <path d="M5 5l14 14M19 5L5 19" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden="true">
              <path d="M3 6.5h18M3 12h18M3 17.5h18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          )}
        </button>
      </div>

      {open ? (
        <div id="menu-mobile" className="border-t border-white/10 bg-ocean-deep/95 backdrop-blur-sm md:hidden">
          <nav aria-label="Navigation mobile" className="mx-auto flex max-w-content flex-col px-5 pb-8 pt-4">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={close}
                aria-current={pathname === link.href ? 'page' : undefined}
                className={`border-b border-white/10 py-4 font-display text-2xl font-semibold ${
                  pathname === link.href ? 'text-ocean-light' : 'text-sand-pale'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-6">
              <CtaLink href="/reservation" variant="primary" onClick={close}>
                Réserver
              </CtaLink>
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  )
}
