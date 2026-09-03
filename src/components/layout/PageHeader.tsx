interface PageHeaderProps {
  title: string
  accent?: string
}

// Bandeau de page — H1 massif (64px desktop), tracking -0.02em, respiration généreuse.
export function PageHeader({ title, accent }: PageHeaderProps) {
  return (
    <header className="bg-ocean-deep pb-20 pt-44 md:pb-28 md:pt-56">
      <div className="mx-auto max-w-content px-5 md:px-8">
        <h1 className="max-w-4xl font-display text-[2.75rem] font-semibold leading-display tracking-tightest text-sand-warm md:text-[4rem]">
          {title}
        </h1>
        {accent ? (
          <p className="mt-6 max-w-prose font-accent text-xl italic leading-relaxed text-sand-warm/80 md:text-2xl">
            {accent}
          </p>
        ) : null}
      </div>
    </header>
  )
}
