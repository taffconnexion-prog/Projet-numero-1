import { CtaLink } from '@/components/ui/Cta'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { site } from '@/lib/site'

// Localisation — fond sable clair, bloc texte élégant (pas d'API Maps).
export function LocationSection() {
  return (
    <section className="bg-sand-pale text-ocean-deep" aria-labelledby="localisation">
      <div className="mx-auto max-w-content px-5 py-20 md:px-8 md:py-28">
        <SectionTitle
          id="localisation"
          tone="light"
          title="Nous trouver"
          accent="Deux pas de l’océan, en face des pirogues."
        />

        <div className="mt-10 grid gap-10 md:grid-cols-2 md:gap-16">
          <address className="not-italic">
            <p className="font-display text-2xl font-semibold">{site.name}</p>
            <p className="mt-3 leading-body">
              {site.address.line1}
              <br />
              {site.address.line2}
              <br />
              {site.address.city}, {site.address.country}
            </p>
            <dl className="mt-8 space-y-3 text-[0.9375rem]">
              {site.hours.map((item) => (
                <div key={item.label} className="flex flex-wrap gap-x-3">
                  <dt className="w-24 font-medium">{item.label}</dt>
                  <dd className="text-ocean-mid">{item.value}</dd>
                </div>
              ))}
            </dl>
          </address>

          <div className="flex flex-col justify-between gap-10 border-t border-ocean-mid/20 pt-8 md:border-l md:border-t-0 md:pl-16 md:pt-0">
            <div>
              <h3 className="font-display text-[1.75rem] font-semibold">Venir jusqu’à la rive</h3>
              <p className="mt-4 max-w-md text-[0.9375rem] leading-relaxed text-ocean-mid">
                À dix minutes en taxi du centre-ville de Cotonou, le long de la Route des Pêcheurs.
                Des parkings gratuits jouxtent la terrasse, et les pirogues des pêcheurs accostent à
                quelques mètres des tables.
              </p>
            </div>
            <div>
              <CtaLink href="/reservation" variant="primary">Réserver une table</CtaLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
