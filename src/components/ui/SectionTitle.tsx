interface SectionTitleProps {
  id?: string
  title: string
  accent?: string
  tone?: 'dark' | 'light'
}

// H2 40px Cormorant Garamond 600 + sous-titre poétique Playfair Italic.
export function SectionTitle({ id, title, accent, tone = 'dark' }: SectionTitleProps) {
  const heading = tone === 'dark' ? 'text-sand-warm' : 'text-ocean-deep'
  const sub = tone === 'dark' ? 'text-sand-warm/85' : 'text-ocean-mid'
  return (
    <header className="max-w-3xl">
      <h2 id={id} className={`font-display text-[2.5rem] font-semibold leading-tight ${heading}`}>{title}</h2>
      {accent ? <p className={`mt-4 font-accent text-lg italic leading-relaxed ${sub} md:text-xl`}>{accent}</p> : null}
    </header>
  )
}
