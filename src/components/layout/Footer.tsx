import Link from 'next/link'
import type { Locale } from '@/types'
import type { Dict } from '@/locales/dict'
import { site } from '@/lib/site'

// Footer épuré : l’essentiel seulement, avec le même soin que le header.
export function Footer({ locale, t }: { locale: Locale; t: Dict }) {
  const links = [
    { href: `/${locale}/menu`, label: t.nav.menu },
    { href: `/${locale}/about`, label: t.nav.about },
    { href: `/${locale}/contact`, label: t.nav.contact },
  ]
  const hours = [
    { label: t.hours.lunch, value: t.hours.lunchValue },
    { label: t.hours.dinner, value: t.hours.dinnerValue },
    { label: t.hours.monday, value: t.hours.mondayValue },
  ]

  return (
    <footer className="bg-ocean-deeper text-mist">
      <div className="mx-auto grid max-w-content gap-12 px-5 py-20 md:grid-cols-[1.5fr_1fr_1.2fr_1.2fr] md:gap-10 md:px-8 md:py-24">
        <div>
          <p className="font-display text-3xl font-semibold tracking-tightest text-sand-warm">Vers l’Océan</p>
          <p className="mt-6 max-w-xs text-sm leading-body">{t.footer.tagline}</p>
        </div>

        <nav aria-label={t.footer.house}>
          <h2 className="text-sm font-medium text-sand-pale">{t.footer.house}</h2>
          <ul className="mt-5 space-y-3">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm transition-colors duration-300 hover:text-sand-warm"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="text-sm font-medium text-sand-pale">{t.footer.join}</h2>
          <address className="mt-5 text-sm not-italic leading-relaxed">
            {site.address.line1}
            <br />
            {site.address.line2}
            <br />
            {site.address.city}, {site.address.country[locale]}
          </address>
          <p className="mt-4 text-sm leading-relaxed">
            <a href={site.phoneHref} className="transition-colors duration-300 hover:text-sand-warm">
              {site.phoneDisplay}
            </a>
            <br />
            <a href={`mailto:${site.emailContact}`} className="transition-colors duration-300 hover:text-sand-warm">
              {site.emailContact}
            </a>
          </p>
        </div>

        <div>
          <h2 className="text-sm font-medium text-sand-pale">{t.footer.hours}</h2>
          <ul className="mt-5 space-y-3 text-sm">
            {hours.map((item) => (
              <li key={item.label}>
                <span className="text-sand-pale">{item.label}</span>
                <span className="mx-2 text-mist/40">—</span>
                {item.value}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-content flex-col justify-between gap-2 px-5 py-6 text-[0.6875rem] text-mist/50 md:flex-row md:items-center md:px-8">
          <p>
            © {new Date().getFullYear()} {site.name} — {t.footer.rights}
          </p>
          <p>
            {site.address.line1}, {site.address.city}
          </p>
        </div>
      </div>
    </footer>
  )
}
