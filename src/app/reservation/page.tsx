import type { Metadata } from 'next'
import { PageHeader } from '@/components/layout/PageHeader'
import { ReservationForm } from '@/components/reservation/ReservationForm'
import { site } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Réservation',
  description:
    "Réservez votre table à Vers l'Océan, Fidjrossè, Cotonou : déjeuner 12h – 15h, dîner 19h – 23h, du mardi au dimanche.",
}

const phoneLinkClass =
  'font-medium text-sand-warm underline decoration-ocean-light decoration-1 underline-offset-4 transition-colors duration-150 hover:text-ocean-light'

export default function ReservationPage() {
  return (
    <>
      <PageHeader title="Réservation" accent="Votre table vous attend face à l’océan." />
      <section className="bg-ocean-deep text-sand-pale">
        <div className="mx-auto grid max-w-content gap-12 px-5 py-16 md:grid-cols-[1fr_1.35fr] md:gap-16 md:px-8 md:py-24">
          <div>
            <h2 className="font-display text-3xl font-semibold text-sand-warm">Nos horaires</h2>
            <dl className="mt-8 space-y-4 text-[0.9375rem]">
              {site.hours.map((item) => (
                <div key={item.label}>
                  <dt className="font-medium text-sand-pale">{item.label}</dt>
                  <dd className="text-mist">{item.value}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-10 space-y-3 text-[0.9375rem]">
              <p>
                Par téléphone :{' '}
                <a href={site.phoneHref} className={phoneLinkClass}>{site.phoneDisplay}</a>
              </p>
              <p>
                Sur WhatsApp :{' '}
                <a href={site.whatsappHref} target="_blank" rel="noopener noreferrer" className={phoneLinkClass}>
                  verslocean sur WhatsApp
                </a>
              </p>
            </div>

            <p className="mt-10 max-w-sm border-l-2 border-sand-warm/60 pl-5 text-sm leading-relaxed text-mist">
              La confirmation de chaque réservation est envoyée par téléphone, dans les deux heures
              qui suivent la demande.
            </p>
          </div>

          <ReservationForm />
        </div>
      </section>
    </>
  )
}
