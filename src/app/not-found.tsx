import Link from 'next/link'

export default function NotFound() {
  return (
    <section className="flex min-h-[70svh] items-center justify-center bg-ocean-deep px-5 pt-24">
      <div className="text-center">
        <p className="font-accent text-xl italic text-sand-warm">Hors de nos eaux…</p>
        <h1 className="mt-4 font-display text-5xl font-semibold text-sand-pale md:text-6xl">
          Page introuvable
        </h1>
        <p className="mt-4 text-mist">Cette page a dérivé. Revenez vers la rive.</p>
        <Link
          href="/"
          className="mt-8 inline-block text-sm font-medium text-sand-warm underline decoration-ocean-light underline-offset-4 transition-colors duration-150 hover:text-ocean-light"
        >
          Retour à l’accueil
        </Link>
      </div>
    </section>
  )
}
