interface SectionTitleProps {
  id?: string
  title: string
  accent?: string
  tone?: 'dark' | 'light'
}

// H2 Cormorant Garamond 600 — tracking légèrement négatif, line-height serré.
export function SectionTitle({ id, title, accent, tone = 'dark' }: SectionTitleProps) {
  const heading = tone === 'dark' ? 'text-sand-warm' : 'text-ocean-deep'
  const sub = tone === 'dark' ? 'text-sand-warm/80' : 'text-harbor'
  return (
    <header className="max-w-3xl">
      <h2
        id={id}
        className={`font-display text-[2rem] font-semibold leading-display tracking-tightest md:text-[2.5rem] ${heading}`}
      >
        {title}
      </h2>
      {accent ? (
        <p className={`mt-5 max-w-prose font-accent text-lg italic leading-relaxed md:text-xl ${sub}`}>{accent}</p>
      ) : null}
    </header>
  )
}
