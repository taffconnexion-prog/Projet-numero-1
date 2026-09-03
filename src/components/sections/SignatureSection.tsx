import type { Locale } from '@/types'
import { dict } from '@/lib/i18n'
import { SectionTitle } from '@/components/ui/SectionTitle'

// Section éditoriale — une seule idée, beaucoup d’espace.
// Deux colonnes, texte max 680px, citation du chef sur fond océan nuit.
export function SignatureSection({ locale }: { locale: Locale }) {
  const t = dict(locale).maison

  return (
    <section id="maison" className="bg-ocean-deeper text-sand-pale">
      <div className="mx-auto max-w-content px-5 py-20 md:px-8 md:py-[120px]">
        <SectionTitle title={t.title} accent={t.accent} />
        <div className="mt-12 grid max-w-5xl gap-x-16 gap-y-8 md:mt-16 md:grid-cols-2">
          <p className="max-w-prose text-base leading-body text-sand-pale/85">{t.p1}</p>
          <p className="max-w-prose text-base leading-body text-sand-pale/85">{t.p2}</p>
        </div>
      </div>

      <figure className="border-y border-white/5 bg-ocean-deep">
        <blockquote className="mx-auto max-w-4xl px-5 py-20 text-center md:px-8 md:py-28">
          <p className="mx-auto max-w-3xl font-accent text-2xl italic leading-relaxed text-sand-warm md:text-[1.75rem]">
            {t.quote}
          </p>
          <figcaption className="mt-8 text-sm font-medium tracking-nav text-mist">{t.author}</figcaption>
        </blockquote>
      </figure>
    </section>
  )
}
