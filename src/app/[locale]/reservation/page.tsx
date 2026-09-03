import type { Metadata } from 'next'
import { isLocale, dict } from '@/lib/i18n'
import { site } from '@/lib/site'
import { PageHeader } from '@/components/layout/PageHeader'
import { ReservationForm } from '@/components/reservation/ReservationForm'

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  const locale = isLocale(params.locale) ? params.locale : 'fr'
  const t = dict(locale)
  return {
    title: t.pages.reservation.title,
    description: t.pages.reservation.description,
    alternates: { languages: { fr: '/fr/reservation', en: '/en/reservation' } },
  }
}

const phoneLinkClass =
  'font-medium text-sand-warm underline decoration-ocean-light decoration-1 underline-offset-[5px] transition-colors duration-300 hover:text-ocean-light'

export default function ReservationPage({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) return null
  const locale = params.locale
  const t = dict(locale)

  const hours = [
    { label: t.hours.lunch, value: t.hours.lunchValue },
    { label: t.hours.dinner, value: t.hours.dinnerValue },
    { label: t.hours.monday, value: t.hours.mondayValue },
  ]

  return (
    <>
      <PageHeader title={t.pages.reservation.title} accent={t.pages.reservation.accent} />
      <section className="bg-ocean-deep text-sand-pale">
        <div className="mx-auto grid max-w-content gap-14 px-5 py-20 md:grid-cols-[1fr_1.4fr] md:gap-20 md:px-8 md:py-[120px]">
          <div>
            <h2 className="font-display text-3xl font-semibold tracking-tightest text-sand-warm">
              {t.pages.reservation.hoursTitle}
            </h2>
            <dl className="mt-9 max-w-xs space-y-4 text-[0.9375rem]">
              {hours.map((item) => (
                <div key={item.label}>
                  <dt className="font-medium text-sand-pale">{item.label}</dt>
                  <dd className="text-mist">{item.value}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-11 max-w-prose space-y-3 text-[0.9375rem]">
              <p>
                {t.pages.reservation.byPhone}{' '}
                <a href={site.phoneHref} className={phoneLinkClass}>{site.phoneDisplay}</a>
              </p>
              <p>
                {t.pages.reservation.byWhatsapp}{' '}
                <a href={site.whatsappHref} target="_blank" rel="noopener noreferrer" className={phoneLinkClass}>
                  {t.pages.reservation.whatsappLabel}
                </a>
              </p>
            </div>

            <p className="mt-11 max-w-xs border-l-2 border-sand-warm/60 pl-6 text-sm leading-body text-mist">
              {t.pages.reservation.confirmNote}
            </p>
          </div>

          <ReservationForm locale={locale} t={t.pages.reservation} />
        </div>
      </section>
    </>
  )
}
