import type { Locale, TastingMenu } from '@/types'
import { CtaLink } from '@/components/ui/Cta'

// Carte du menu dégustation — 5 services, fond sombre, filet discret.
export function TastingCard({
  menu,
  locale,
  reserveHref,
  reserveLabel,
}: {
  menu: TastingMenu
  locale: Locale
  reserveHref: string
  reserveLabel: string
}) {
  return (
    <article className="border border-sand-warm/20 bg-ocean-deep text-sand-pale">
      <div className="p-8 md:p-14">
        <header className="max-w-2xl">
          <h3 className="font-display text-3xl font-semibold leading-display tracking-tightest text-sand-warm md:text-4xl">
            {menu.name[locale]}
          </h3>
          <p className="mt-4 font-accent text-xl italic leading-relaxed text-sand-warm/80">
            {menu.accent[locale]}
          </p>
        </header>

        <ol className="mt-12 grid max-w-4xl gap-x-14 gap-y-7 md:grid-cols-2">
          {menu.courses.map((course) => (
            <li key={course.name[locale]} className="border-l border-ocean-light/30 pl-5">
              <p className="text-sm font-medium tracking-nav text-sand-warm">{course.name[locale]}</p>
              <p className="mt-2 text-[0.9375rem] leading-body text-mist">{course.detail[locale]}</p>
            </li>
          ))}
        </ol>

        <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-5 border-t border-white/10 pt-8">
          <p className="font-display text-lg font-semibold text-sand-warm">{menu.price}</p>
          <p className="text-sm text-mist">{menu.note[locale]}</p>
          <div className="ml-auto">
            <CtaLink href={reserveHref}>{reserveLabel}</CtaLink>
          </div>
        </div>
      </div>
    </article>
  )
}
