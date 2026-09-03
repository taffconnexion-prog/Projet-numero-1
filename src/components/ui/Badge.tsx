import type { DishTag, Locale, LocalizedText } from '@/types'

const LABELS: Record<DishTag, LocalizedText> = {
  signature: { fr: 'Signature', en: 'Signature' },
  traditionnel: { fr: 'Traditionnel', en: 'Traditional' },
  prestige: { fr: 'Prestige', en: 'Prestige' },
  maison: { fr: 'Maison', en: 'House' },
}

// Badge tag plat — fond océan milieu, filet turquoise clair.
export function Badge({ tag, locale }: { tag: DishTag; locale: Locale }) {
  return (
    <span className="inline-flex w-fit items-center border border-ocean-light/70 bg-ocean-mid px-2.5 py-1 text-[0.6875rem] font-medium tracking-nav text-sand-pale">
      {LABELS[tag][locale]}
    </span>
  )
}
