import { SectionTitle } from '@/components/ui/SectionTitle'

// Section éditoriale — fond mangrove, citation du chef sur fond océan nuit.
export function SignatureSection() {
  return (
    <section id="maison" className="bg-mangrove text-sand-pale">
      <div className="mx-auto max-w-content px-5 py-20 md:px-8 md:py-28">
        <SectionTitle
          title="Une conviction simple"
          accent="La cuisine béninoise mérite sa scène internationale."
        />
        <div className="mt-10 grid gap-8 text-base leading-body text-sand-pale/90 md:mt-14 md:grid-cols-2 md:gap-16">
          <p>
            Vers l’Océan est né d’une conviction simple : la cuisine béninoise mérite sa scène
            internationale. Ici, à deux pas du Golfe de Guinée, le chef Kofi Adannou réinterprète les
            recettes de nos grand-mères avec les techniques d’aujourd’hui.
          </p>
          <p>
            Akpan fumé, sauce d’arachide en émulsion, poisson barracuda grillé sur braises de bois de
            cocotier — chaque assiette raconte Cotonou.
          </p>
        </div>
      </div>

      <figure className="bg-ocean-deep">
        <blockquote className="mx-auto max-w-4xl px-5 py-16 text-center md:px-8 md:py-20">
          <p className="font-accent text-xl italic leading-relaxed text-sand-warm md:text-[1.375rem]">
            « Nous ne réinventons pas la cuisine béninoise. Nous la remettons sur la table, à la
            hauteur du monde. »
          </p>
          <figcaption className="mt-6 text-sm font-medium tracking-nav text-mist">
            Kofi Adannou, chef
          </figcaption>
        </blockquote>
      </figure>
    </section>
  )
}
