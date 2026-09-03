import Link from 'next/link'
import type { Locale } from '@/types'
import type { Dict } from '@/locales/dict'
import { CtaLink } from '@/components/ui/Cta'
import { LangSwitch } from '@/components/ui/LangSwitch'

interface MobileMenuProps {
  open: boolean
  onClose: () => void
  locale: Locale
  t: Dict
  links: Array<{ href: string; label: string }>
  activePath: string
}

// Menu mobile plein écran, fond uni — jamais de panneau latéral.
export function MobileMenu({ open, onClose, locale, t, links, activePath }: MobileMenuProps) {
  return (
    <div
      aria-hidden={!open}
      className={`fixed inset-0 z-[55] flex flex-col bg-ocean-deep transition-opacity duration-300 ease-premium motion-reduce:transition-none lg:hidden ${
        open ? 'opacity-100' : 'pointer-events-none opacity-0'
      }`}
    >
      <div className="flex h-20 items-center justify-between px-5">
        <span className="font-display text-[1.375rem] font-semibold tracking-tightest text-sand-warm">
          Vers l’Océan
        </span>
        <button type="button" onClick={onClose} aria-label={t.nav.closeMenu} className="p-2 text-sand-pale">
          <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden="true">
            <path d="M5 5l14 14M19 5L5 19" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      <nav aria-label={t.nav.mobileNav} className="flex flex-1 flex-col justify-center px-6">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={onClose}
            aria-current={activePath === link.href ? 'page' : undefined}
            className={`border-b border-white/10 py-5 font-display text-4xl font-semibold leading-none tracking-tightest transition-colors duration-300 ${
              activePath === link.href ? 'text-sand-warm' : 'text-sand-pale'
            }`}
          >
            {link.label}
          </Link>
        ))}
      </nav>

      <div className="flex items-center justify-between gap-6 px-6 pb-12">
        <LangSwitch locale={locale} t={t} size="lg" />
        <CtaLink href={`/${locale}/reservation`} onClick={onClose}>
          {t.nav.reserve}
        </CtaLink>
      </div>
    </div>
  )
}
