import Link from 'next/link'
import { site } from '@/lib/site'

const FOOTER_LINKS = [
  { href: '/', label: 'Accueil' },
  { href: '/menu', label: 'Menu' },
  { href: '/about', label: 'À propos' },
  { href: '/contact', label: 'Contact' },
  { href: '/reservation', label: 'Réservation' },
]

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-ocean-deep text-mist">
      <div className="mx-auto grid max-w-content gap-10 px-5 py-14 md:grid-cols-4 md:px-8">
        <div>
          <p className="font-display text-2xl font-semibold text-sand-warm">Vers l’Océan</p>
          <p className="mt-4 max-w-xs text-sm leading-relaxed">
            Restaurant de cuisine béninoise, en bord d’Atlantique, à Fidjrossè — Cotonou.
          </p>
        </div>

        <nav aria-label="Plan du site">
          <h2 className="text-sm font-medium tracking-nav text-sand-pale">La maison</h2>
          <ul className="mt-4 space-y-2.5">
            {FOOTER_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-sm transition-colors duration-150 hover:text-ocean-light">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="text-sm font-medium tracking-nav text-sand-pale">Nous joindre</h2>
          <address className="mt-4 text-sm not-italic leading-relaxed">
            {site.address.line1}
            <br />
            {site.address.line2}
            <br />
            {site.address.city}, {site.address.country}
          </address>
          <p className="mt-3 text-sm">
            <a href={site.phoneHref} className="transition-colors duration-150 hover:text-ocean-light">
              {site.phoneDisplay}
            </a>
            <br />
            <a href={`mailto:${site.emailContact}`} className="transition-colors duration-150 hover:text-ocean-light">
              {site.emailContact}
            </a>
          </p>
        </div>

        <div>
          <h2 className="text-sm font-medium tracking-nav text-sand-pale">Horaires</h2>
          <ul className="mt-4 space-y-2.5 text-sm">
            {site.hours.map((item) => (
              <li key={item.label}>
                <span className="text-sand-pale">{item.label}</span> — {item.value}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-content flex-col justify-between gap-2 px-5 py-6 text-xs md:flex-row md:items-center md:px-8">
          <p>© {new Date().getFullYear()} {site.name} — Tous droits réservés.</p>
          <p>Route des Pêcheurs, Fidjrossè Plage, Cotonou, Bénin</p>
        </div>
      </div>
    </footer>
  )
}
