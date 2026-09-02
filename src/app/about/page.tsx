import Image from 'next/image'
import type { Metadata } from 'next'
import { PageHeader } from '@/components/layout/PageHeader'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { team } from '@/data/team'

export const metadata: Metadata = {
  title: 'À propos',
  description:
    "Le chef Kofi Adannou, l'histoire de la famille Adannou et l'équipe de Vers l'Océan — restaurant de cuisine béninoise à Fidjrossè, Cotonou.",
}

const SUPPLIERS = [
  { name: 'Pêcheurs de Fidjrossè', role: 'Poisson frais, débarqué chaque matin' },
  { name: 'Coopérative de femmes de Lokossa', role: 'Légumes et herbes de brousse' },
  { name: 'Distillerie Zanmidji', role: 'Sodabi artisanal' },
]

export default function AboutPage() {
  return (
    <>
      <PageHeader title="À propos" accent="Une maison, une famille, une rive." />

      <section className="bg-sand-pale text-ocean-deep" aria-labelledby="chef">
        <div className="mx-auto grid max-w-content gap-10 px-5 py-20 md:grid-cols-2 md:gap-16 md:px-8 md:py-28">
          <div className="relative aspect-[4/5] w-full overflow-hidden md:aspect-auto md:h-full md:min-h-[560px]">
            <Image
              src="/images/chef-kofi.jpg"
              alt="Portrait du chef Kofi Adannou dans sa cuisine ouverte, à la lumière dorée"
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              loading="lazy"
              className="object-cover"
            />
          </div>
          <div>
            <SectionTitle id="chef" tone="light" title="Le chef" accent="Kofi Adannou." />
            <div className="mt-8 space-y-5 text-[0.9375rem] leading-body text-ocean-mid">
              <p>
                Né à Porto-Novo en 1981, Kofi Adannou découvre la cuisine à l’École Hôtelière de
                Cotonou, puis affine sa technique à Lyon et à Dakar.
              </p>
              <p>
                De retour au Bénin en 2015, il a un seul objectif : rendre à la cuisine béninoise sa
                dignité — là où elle a toujours existé, dans les repas de famille, les marchés et les
                braises du rivage.
              </p>
              <p>
                À la tête des feux de Vers l’Océan depuis l’ouverture, il compose une carte courte,
                saisonnière, construite avec les producteurs qui partagent son exigence.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-mangrove text-sand-pale" aria-labelledby="histoire">
        <div className="mx-auto max-w-content px-5 py-20 md:px-8 md:py-28">
          <SectionTitle id="histoire" title="Notre histoire" accent="Fondé en 2018 par la famille Adannou." />
          <div className="mt-10 max-w-2xl space-y-5 text-[0.9375rem] leading-body text-sand-pale/90">
            <p>
              Produits locaux, producteurs béninois nommés, zéro import dès qu’un équivalent local
              existe : c’est la règle de la maison, depuis le premier soir.
            </p>
            <p>Nos produits sont choisis chaque matin avec trois partenaires qui nous suivent depuis l’ouverture :</p>
          </div>
          <ul className="mt-10 grid gap-6 md:grid-cols-3">
            {SUPPLIERS.map((supplier) => (
              <li key={supplier.name} className="border-l-2 border-sand-warm/60 pl-5">
                <p className="font-display text-xl font-semibold text-sand-pale">{supplier.name}</p>
                <p className="mt-2 text-sm leading-relaxed text-mist">{supplier.role}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-sand-pale text-ocean-deep" aria-labelledby="equipe">
        <div className="mx-auto max-w-content px-5 py-20 md:px-8 md:py-28">
          <SectionTitle id="equipe" tone="light" title="L’équipe" accent="Quatre personnes, un même rivage." />
          <ul className="mt-12 grid grid-cols-2 gap-6 lg:grid-cols-4">
            {team.map((member) => (
              <li key={member.id}>
                <div className="relative aspect-[4/5] overflow-hidden">
                  <Image
                    src={member.photo}
                    alt={`Portrait de ${member.name}, ${member.role} au restaurant Vers l’Océan`}
                    fill
                    sizes="(min-width: 1280px) 25vw, (min-width: 768px) 50vw, 50vw"
                    loading="lazy"
                    className="object-cover"
                  />
                </div>
                <p className="mt-4 font-display text-xl font-semibold">{member.name}</p>
                <p className="mt-1 text-sm text-ocean-mid">{member.role}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  )
}
