import { CtaLink } from '@/components/ui/Cta'
import type { TastingMenu } from '@/types'

// Carte du menu dégustation — 5 services, fond sombre.
export function TastingCard({ menu }: { menu: TastingMenu }) {
  return (
    <article className="overflow-hidden bg-ocean-deep text-sand-pale">
      <div className="p-8 md:p-12">
        <header className="max-w-2xl">
          <h3 className="font-display text-[1.75rem] font-semibold leading-snug text-sand-warm md:text-3xl">
            {menu.name}
          </h3>
          <p className="mt-3 font-accent text-lg italic text-sand-warm/85">
            Cinq services pour un parcours dans la cuisine béninoise.
          </p>
        </header>

        <ol className="mt-10 grid gap-x-10 gap-y-6 md:grid-cols-2">
          {menu.courses.map((course) => (
            <li key={course.name} className="border-l border-ocean-light/30 pl-4">
              <p className="text-sm font-medium tracking-nav text-sand-warm">{course.name}</p>
              <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-mist">{course.detail}</p>
            </li>
          ))}
        </ol>

        <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4 border-t border-white/10 pt-6">
          <p className="font-display text-lg font-semibold text-sand-warm">{menu.price}</p>
          <p className="text-sm text-mist">{menu.note}</p>
          <div className="ml-auto">
            <CtaLink href="/reservation" variant="primary">Réserver le menu</CtaLink>
          </div>
        </div>
      </div>
    </article>
  )
}
