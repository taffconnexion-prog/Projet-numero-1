import type { Metadata } from 'next'
import { isLocale, dict } from '@/lib/i18n'
import { PageHeader } from '@/components/layout/PageHeader'
import { MenuExplorer } from '@/components/menu/MenuExplorer'

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  const locale = isLocale(params.locale) ? params.locale : 'fr'
  const t = dict(locale)
  return {
    title: t.pages.menu.title,
    description: t.pages.menu.description,
    alternates: { languages: { fr: '/fr/menu', en: '/en/menu' } },
  }
}

export default function MenuPage({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) return null
  const locale = params.locale
  const t = dict(locale)

  return (
    <>
      <PageHeader title={t.pages.menu.title} accent={t.pages.menu.accent} />
      <section className="bg-sand-pale text-ocean-deep">
        <div className="mx-auto max-w-content px-5 py-20 md:px-8 md:py-[120px]">
          <MenuExplorer locale={locale} t={t.pages.menu} reserveHref={`/${locale}/reservation`} />
          <p className="mt-16 text-center text-xs tracking-nav text-harbor">{t.pages.menu.priceNote}</p>
        </div>
      </section>
    </>
  )
}
