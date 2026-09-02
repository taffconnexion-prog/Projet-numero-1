interface PageHeaderProps {
  title: string
  accent?: string
}

// Bandeau de page sombre — H1 56px (Cormorant Garamond 600).
export function PageHeader({ title, accent }: PageHeaderProps) {
  return (
    <header className="bg-ocean-deep pb-16 pt-36 md:pb-20 md:pt-44">
      <div className="mx-auto max-w-content px-5 md:px-8">
        <h1 className="font-display text-4xl font-semibold leading-tight text-sand-warm md:text-[3.5rem]">{title}</h1>
        {accent ? (
          <p className="mt-4 max-w-2xl font-accent text-lg italic leading-relaxed text-sand-warm/85 md:text-xl">
            {accent}
          </p>
        ) : null}
      </div>
    </header>
  )
}
