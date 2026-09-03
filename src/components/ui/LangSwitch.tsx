import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { Locale } from '@/types'
import type { Dict } from '@/locales/dict'
import { otherLocale, switchLocalePath } from '@/lib/i18n'

// Bascule de langue — même page dans l'autre locale (/fr/menu ↔ /en/menu).
export function LangSwitch({ locale, t, size = 'sm' }: { locale: Locale; t: Dict; size?: 'sm' | 'lg' }) {
  const pathname = usePathname()
  const to = otherLocale(locale)
  const href = switchLocalePath(pathname, to)

  return (
    <div
      aria-label={t.nav.switchLanguage}
      className={`flex items-baseline gap-1.5 font-medium tracking-nav ${size === 'lg' ? 'text-base' : 'text-sm'}`}
    >
      <span className="text-sand-warm">{locale.toUpperCase()}</span>
      <span aria-hidden="true" className="text-mist/40">
        /
      </span>
      <Link
        href={href}
        lang={to}
        className="text-mist transition-colors duration-300 hover:text-sand-pale"
      >
        {to.toUpperCase()}
      </Link>
    </div>
  )
}
