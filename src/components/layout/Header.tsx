'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import type { Locale } from '@/types'
import type { Dict } from '@/locales/dict'
import { CtaLink } from '@/components/ui/Cta'
import { LangSwitch } from '@/components/ui/LangSwitch'
import { MobileMenu } from './MobileMenu'

interface HeaderProps {
  locale: Locale
  t: Dict
}

// Lien de navigation — underline fin qui glisse (scaleX 0 → 1, 250ms).
function NavLink({ href, label, active }: { href: string; label: string; active: boolean }) {
  const reduceMotion = useReducedMotion()
  return (
    <Link
      href={href}
      aria-current={active ? 'page' : undefined}
      className={`relative py-2 text-sm font-medium tracking-nav transition-colors duration-300 ${
        active ? 'text-sand-warm' : 'text-sand-pale/80 hover:text-sand-pale'
      }`}
    >
      {label}
      <motion.span
        aria-hidden="true"
        initial={false}
        animate={{ scaleX: active ? 1 : 0 }}
        whileHover={{ scaleX: 1 }}
        transition={{ duration: reduceMotion ? 0 : 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="absolute inset-x-0 -bottom-0.5 h-px origin-left bg-sand-warm"
      />
    </Link>
  )
}

function WaveIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6 text-sand-warm" aria-hidden="true">
      <path
        d="M2 12c2.5-3.5 5-3.5 7.5 0s5 3.5 7.5 0 4.5-3 5 0"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M4.5 17.5c2-3 4-3 6 0s4 3 6 0"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.45"
      />
    </svg>
  )
}

// Navigation premium : transparente sur le hero, fond #0A2E3C/95 + blur(8px)
// au scroll, se cache au scroll descendant, réapparaît au scroll montant.
export function Header({ locale, t }: HeaderProps) {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [open, setOpen] = useState(false)
  const lastY = useRef(0)

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 24)
      setHidden(y > 96 && y > lastY.current)
      lastY.current = y
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const isHidden = hidden && !open
  const links = [
    { href: `/${locale}`, label: t.nav.home },
    { href: `/${locale}/menu`, label: t.nav.menu },
    { href: `/${locale}/about`, label: t.nav.about },
    { href: `/${locale}/contact`, label: t.nav.contact },
  ]

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-[60] transition-[transform,background-color,box-shadow] duration-300 ease-premium motion-reduce:transition-none ${
          scrolled || open ? 'bg-ocean-deep/95 shadow-[0_1px_0_rgba(245,237,214,0.08)] backdrop-blur-[8px]' : 'bg-transparent'
        } ${isHidden ? '-translate-y-full' : 'translate-y-0'}`}
      >
        <div className="mx-auto flex h-20 max-w-content items-center justify-between px-5 md:px-8">
          <Link href={`/${locale}`} aria-label="Vers l’Océan — accueil" className="flex items-center gap-3">
            <WaveIcon />
            <span className="font-display text-[1.375rem] font-semibold tracking-tightest text-sand-warm">
              Vers l’Océan
            </span>
          </Link>

          <div className="flex items-center gap-8">
            <nav aria-label={t.nav.primaryNav} className="hidden items-center gap-9 lg:flex">
              {links.map((link) => (
                <NavLink key={link.href} href={link.href} label={link.label} active={pathname === link.href} />
              ))}
            </nav>
            <div className="hidden md:block">
              <LangSwitch locale={locale} t={t} />
            </div>
            <div className="hidden md:block">
              <CtaLink href={`/${locale}/reservation`}>{t.nav.reserve}</CtaLink>
            </div>
            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              aria-expanded={open}
              aria-controls="menu-mobile"
              aria-label={open ? t.nav.closeMenu : t.nav.openMenu}
              className="p-2 text-sand-pale lg:hidden"
            >
              {open ? (
                <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden="true">
                  <path d="M5 5l14 14M19 5L5 19" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden="true">
                  <path d="M3 6.5h18M3 12h18M3 17.5h18" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </header>

      <MobileMenu
        open={open}
        onClose={() => setOpen(false)}
        locale={locale}
        t={t}
        links={links}
        activePath={pathname}
      />
    </>
  )
}
