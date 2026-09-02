import type { DishTag } from '@/types'

const LABELS: Record<DishTag, string> = {
  signature: 'Signature',
  traditionnel: 'Traditionnel',
  prestige: 'Prestige',
  maison: 'Maison',
}

// Badge tag plat — fond océan milieu, bordure turquoise clair.
export function Badge({ tag }: { tag: DishTag }) {
  return (
    <span className="inline-flex w-fit items-center border border-ocean-light/70 bg-ocean-mid px-2.5 py-1 text-[0.6875rem] font-medium tracking-nav text-sand-pale">
      {LABELS[tag]}
    </span>
  )
}
