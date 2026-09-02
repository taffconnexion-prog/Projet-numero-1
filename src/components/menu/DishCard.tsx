import Image from 'next/image'
import { Badge } from '@/components/ui/Badge'
import type { Dish } from '@/types'

// Card plat — fond clair, filet corail en tête.
export function DishCard({ dish }: { dish: Dish }) {
  return (
    <article className="flex h-full flex-col overflow-hidden border-t-2 border-t-coral bg-foam text-ocean-deep">
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <Image
          src={dish.image}
          alt={`${dish.name} — ${dish.description}`}
          width={800}
          height={600}
          sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
          loading="lazy"
          className="h-full w-full object-cover"
        />
      </div>
      <div className="flex flex-1 flex-col gap-3 p-6">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <h3 className="font-display text-[1.375rem] font-semibold leading-snug">{dish.name}</h3>
          <Badge tag={dish.tag} />
        </div>
        <p className="text-[0.9375rem] leading-relaxed text-ocean-mid">{dish.description}</p>
        <p className="mt-auto pt-2 font-display text-lg font-semibold">{dish.price}</p>
      </div>
    </article>
  )
}
