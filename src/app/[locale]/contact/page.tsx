import type { Metadata } from 'next'
import { isLocale, dict } from '@/lib/i18n'
import { site } from '@/lib/site'
import { PageHeader } from '@/components/layout/PageHeader'
import { ContactForm } from '@/components/contact/ContactForm'

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  const locale = isLocale(params.locale) ? params.locale : 'fr'
  const t = dict(locale)
  return {
    title: t.pages.contact.title,
    description: t.pages.contact.description,
    alternates: { languages: { fr: '/fr/contact', en: '/en/contact' } },
  }
}

const linkClass =
  'font-medium text-ocean-deep underline decoration-ocean-light decoration-1 underline-offset-[5px] transition-colors duration-300 hover:text-coral-dark'

export default function ContactPage({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) return null
  const locale = params.locale
  const t = dict(locale)

  return (
    <>
      <PageHeader title={t.pages.contact.title} accent={t.pages.contact.accent} />
      <section className="bg-sand-pale text-ocean-deep">
        <div className="mx-auto grid max-w-content gap-14 px-5 py-20 md:grid-cols-2 md:gap-20 md:px-8 md:py-[120px]">
          <div>
            <address className="not-italic">
              <p className="font-display text-3xl font-semibold tracking-tightest">{site.address.line1}</p>
              <p className="mt-4 max-w-prose leading-body text-harbor">
                {site.address.line2}
                <br />
                {site.address.city}, {site.address.country[locale]}
              </p>
            </address>

            <dl className="mt-14 space-y-7 text-[0.9375rem]">
              <div>
                <dt className="text-[0.6875rem] font-medium tracking-nav text-harbor">{t.pages.contact.phone}</dt>
                <dd className="mt-1.5">
                  <a href={site.phoneHref} className={linkClass}>{site.phoneDisplay}</a>
                </dd>
              </div>
              <div>
                <dt className="text-[0.6875rem] font-medium tracking-nav text-harbor">{t.pages.contact.email}</dt>
                <dd className="mt-1.5">
                  <a href={`mailto:${site.emailContact}`} className={linkClass}>{site.emailContact}</a>
                </dd>
              </div>
              <div>
                <dt className="text-[0.6875rem] font-medium tracking-nav text-harbor">{t.pages.contact.whatsapp}</dt>
                <dd className="mt-1.5">
                  <a href={site.whatsappHref} target="_blank" rel="noopener noreferrer" className={linkClass}>
                    {t.pages.contact.whatsappLink}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-[0.6875rem] font-medium tracking-nav text-harbor">{t.pages.contact.social}</dt>
                <dd className="mt-1.5 flex gap-6">
                  <a href={site.instagram} target="_blank" rel="noopener noreferrer" className={linkClass}>
                    Instagram
                  </a>
                  <a href={site.facebook} target="_blank" rel="noopener noreferrer" className={linkClass}>
                    Facebook
                  </a>
                </dd>
              </div>
            </dl>

            <div className="mt-14 max-w-prose border-l-2 border-ocean-light/60 pl-6">
              <h2 className="font-display text-2xl font-semibold tracking-tightest">{t.pages.contact.howToCome}</h2>
              <p className="mt-4 text-[0.9375rem] leading-body text-harbor">{t.pages.contact.comeText}</p>
            </div>
          </div>

          <ContactForm locale={locale} t={t.pages.contact} />
        </div>
      </section>
    </>
  )
}
