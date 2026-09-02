import type { Metadata } from 'next'
import { PageHeader } from '@/components/layout/PageHeader'
import { MenuExplorer } from '@/components/menu/MenuExplorer'

export const metadata: Metadata = {
  title: 'Menu',
  description:
    "La carte de Vers l'Océan : entrées, plats, desserts, boissons et menu dégustation de la cuisine béninoise — prix en francs CFA, à Fidjrossè, Cotonou.",
}

export default function MenuPage() {
  return (
    <>
      <PageHeader title="La Carte" accent="Des braises de bois de cocotier aux herbes de brousse." />
      <section className="bg-sand-pale text-ocean-deep">
        <div className="mx-auto max-w-content px-5 py-16 md:px-8 md:py-24">
          <MenuExplorer />
          <p className="mt-12 text-center text-xs text-ocean-mid">
            Tous les prix sont indiqués en francs CFA (XOF), service compris.
          </p>
        </div>
      </section>
    </>
  )
}
