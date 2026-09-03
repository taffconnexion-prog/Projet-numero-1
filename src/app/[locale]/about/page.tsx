import Image from 'next/image'
import type { Metadata } from 'next'
import { isLocale, dict } from '@/lib/i18n'
import { PageHeader } from '@/components/layout/PageHeader'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { team } from '@/data/team'

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  const locale = isLocale(params.locale) ? params.locale : 'fr'
  const t = dict(locale)
  return {
    title: t.pages.about.title,
    description: t.pages.about.description,
    alternates: { languages: { fr: '/fr/about', en: '/en/about' } },
  }
}

export default function AboutPage({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) return null
  const locale = params.locale
  const t = dict(locale)

  return (
    <>
      <PageHeader title={t.pages.about.title} accent={t.pages.about.accent} />

      <section className="bg-sand-pale text-ocean-deep" aria-labelledby="chef-titre">
        <div className="mx-auto grid max-w-content gap-12 px-5 py-20 md:grid-cols-2 md:gap-20 md:px-8 md:py-[120px]">
          <div className="relative aspect-[3/4] w-full overflow-hidden border border-ocean-mid/25">
            <Image
              src="/images/chef-kofi.jpg"
              alt={t.pages.about.chef.alt}
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              loading="lazy"
              className="object-cover"
            />
          </div>
          <div className="flex flex-col justify-center">
            <SectionTitle id="chef-titre" tone="light" title={t.pages.about.chef.title} accent={t.pages.about.chef.accent} />
            <div className="mt-9 space-y-6 text-[0.9375rem] leading-body text-harbor">
              <p className="max-w-prose">{t.pages.about.chef.p1}</p>
              <p className="max-w-prose">{t.pages.about.chef.p2}</p>
              <p className="max-w-prose">{t.pages.about.chef.p3}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-mangrove text-sand-pale" aria-labelledby="histoire-titre">
        <div className="mx-auto max-w-content px-5 py-20 md:px-8 md:py-[120px]">
          <SectionTitle id="histoire-titre" title={t.pages.about.histoire.title} accent={t.pages.about.histoire.accent} />
          <div className="mt-12 max-w-prose space-y-6 text-[0.9375rem] leading-body text-sand-pale/85">
            <p>{t.pages.about.histoire.p1}</p>
            <p>{t.pages.about.histoire.p2}</p>
          </div>
          <ul className="mt-14 grid max-w-4xl gap-10 md:grid-cols-3">
            {t.pages.about.histoire.suppliers.map((supplier) => (
              <li key={supplier.name} className="border-l-2 border-sand-warm/60 pl-6">
                <p className="font-display text-xl font-semibold leading-snug text-sand-pale">{supplier.name}</p>
                <p className="mt-2 text-sm leading-body text-mist">{supplier.role}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-sand-pale text-ocean-deep" aria-labelledby="equipe-titre">
        <div className="mx-auto max-w-content px-5 py-20 md:px-8 md:py-[120px]">
          <SectionTitle id="equipe-titre" tone="light" title={t.pages.about.equipe.title} accent={t.pages.about.equipe.accent} />
          <ul className="mt-14 grid grid-cols-2 gap-7 lg:grid-cols-4">
            {team.map((member) => (
              <li key={member.id}>
                <div className="relative aspect-[3/4] overflow-hidden border border-ocean-mid/25">
                  <Image
                    src={member.photo}
                    alt={`${member.name} — ${member.role[locale]}`}
                    fill
                    sizes="(min-width: 1280px) 25vw, (min-width: 768px) 50vw, 50vw"
                    loading="lazy"
                    className="object-cover"
                  />
                </div>
                <p className="mt-5 font-display text-xl font-semibold">{member.name}</p>
                <p className="mt-1 text-sm text-harbor">{member.role[locale]}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  )
}
