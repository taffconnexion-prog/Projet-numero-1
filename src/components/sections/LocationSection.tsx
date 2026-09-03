import type { Locale } from '@/types'
import { dict } from '@/lib/i18n'
import { site } from '@/lib/site'
import { CtaLink } from '@/components/ui/Cta'
import { SectionTitle } from '@/components/ui/SectionTitle'

// Localisation — fond sable clair, carte Google Maps (embed sans clé API).
export function LocationSection({ locale }: { locale: Locale }) {
  const t = dict(locale).localisation
  const hours = dict(locale).hours

  return (
    <section className="bg-sand-pale text-ocean-deep" aria-labelledby="localisation-titre">
      <div className="mx-auto max-w-content px-5 py-20 md:px-8 md:py-[120px]">
        <SectionTitle id="localisation-titre" tone="light" title={t.title} accent={t.accent} />

        <div className="mt-14 grid gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <address className="not-italic">
              <p className="font-display text-3xl font-semibold tracking-tightest">{site.name}</p>
              <p className="mt-5 max-w-prose leading-body text-harbor">
                {site.address.line1}
                <br />
                {site.address.line2}
                <br />
                {site.address.city}, {site.address.country[locale]}
              </p>
            </address>

            <h3 className="mt-14 font-display text-2xl font-semibold tracking-tightest">{t.hours}</h3>
            <dl className="mt-6 max-w-sm space-y-4 text-[0.9375rem]">
              {[
                { label: hours.lunch, value: hours.lunchValue },
                { label: hours.dinner, value: hours.dinnerValue },
                { label: hours.monday, value: hours.mondayValue },
              ].map((item) => (
                <div key={item.label} className="flex flex-wrap gap-x-8">
                  <dt className="w-28 font-medium">{item.label}</dt>
                  <dd className="text-harbor">{item.value}</dd>
                </div>
              ))}
            </dl>

            <h3 className="mt-14 font-display text-2xl font-semibold tracking-tightest">{t.come}</h3>
            <p className="mt-5 max-w-prose text-[0.9375rem] leading-body text-harbor">{t.comeText}</p>

            <div className="mt-14">
              <CtaLink href={`/${locale}/reservation`}>{t.reserve}</CtaLink>
            </div>
          </div>

          <div className="min-h-[360px] border border-ocean-mid/25 lg:min-h-0">
            <iframe
              src={site.mapEmbed}
              title={t.mapTitle}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-full min-h-[360px] w-full border-0"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
