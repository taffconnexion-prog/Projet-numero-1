import type { Metadata } from 'next'
import { PageHeader } from '@/components/layout/PageHeader'
import { ContactForm } from '@/components/contact/ContactForm'
import { site } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Contact',
  description:
    "Contact, adresse et accès pour le restaurant Vers l'Océan — Route des Pêcheurs, Fidjrossè Plage, Cotonou, Bénin.",
}

const linkClass =
  'font-medium text-ocean-deep underline decoration-ocean-light decoration-1 underline-offset-4 transition-colors duration-150 hover:text-coral-dark'

export default function ContactPage() {
  return (
    <>
      <PageHeader title="Contact" accent="Une question, une demande — nous répondons vite." />
      <section className="bg-sand-pale text-ocean-deep">
        <div className="mx-auto grid max-w-content gap-12 px-5 py-16 md:grid-cols-2 md:gap-16 md:px-8 md:py-24">
          <div>
            <address className="not-italic">
              <p className="font-display text-2xl font-semibold">{site.address.line1}</p>
              <p className="mt-2 leading-body text-ocean-mid">
                {site.address.line2}
                <br />
                {site.address.city}, {site.address.country}
              </p>
            </address>

            <dl className="mt-10 space-y-6 text-[0.9375rem]">
              <div>
                <dt className="text-[0.6875rem] font-medium tracking-nav text-ocean-mid">Téléphone</dt>
                <dd className="mt-1">
                  <a href={site.phoneHref} className={linkClass}>{site.phoneDisplay}</a>
                </dd>
              </div>
              <div>
                <dt className="text-[0.6875rem] font-medium tracking-nav text-ocean-mid">E-mail</dt>
                <dd className="mt-1">
                  <a href={`mailto:${site.emailContact}`} className={linkClass}>{site.emailContact}</a>
                </dd>
              </div>
              <div>
                <dt className="text-[0.6875rem] font-medium tracking-nav text-ocean-mid">WhatsApp</dt>
                <dd className="mt-1">
                  <a href={site.whatsappHref} target="_blank" rel="noopener noreferrer" className={linkClass}>
                    Écrire sur WhatsApp
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-[0.6875rem] font-medium tracking-nav text-ocean-mid">Réseaux</dt>
                <dd className="mt-1 flex gap-5">
                  <a href={site.instagram} target="_blank" rel="noopener noreferrer" className={linkClass}>
                    Instagram
                  </a>
                  <a href={site.facebook} target="_blank" rel="noopener noreferrer" className={linkClass}>
                    Facebook
                  </a>
                </dd>
              </div>
            </dl>

            <div className="mt-10 border-l-2 border-ocean-light/60 pl-5">
              <h2 className="font-display text-xl font-semibold">Comment venir</h2>
              <p className="mt-3 max-w-md text-[0.9375rem] leading-relaxed text-ocean-mid">
                Depuis le centre-ville de Cotonou, dix minutes de taxi le long de la corniche jusqu’à
                la Route des Pêcheurs. Suivre les pirogues : la terrasse sur pilotis est impossible à
                manquer. Parkings gratuits à cent mètres.
              </p>
            </div>
          </div>

          <ContactForm />
        </div>
      </section>
    </>
  )
}
