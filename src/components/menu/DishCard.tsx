import Image from 'next/image'
import type { Dish, Locale } from '@/types'
import { Badge } from '@/components/ui/Badge'

// Card plat — fond clair, filet discret, ratio strict 4:3.
export function DishCard({ dish, locale }: { dish: Dish; locale: Locale }) {
  return (
    <article className="flex h-full flex-col border border-ocean-mid/25 bg-foam text-ocean-deep">
      <div className="relative aspect-[4/3] w-full overflow-hidden border-b border-ocean-mid/15">
        <Image
          src={dish.image}
          alt={`${dish.name[locale]} — ${dish.description[locale]}`}
          width={800}
          height={600}
          sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
          loading="lazy"
          className="h-full w-full object-cover"
        />
      </div>
      <div className="flex flex-1 flex-col gap-4 p-7">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <h3 className="font-display text-[1.375rem] font-semibold leading-snug">{dish.name[locale]}</h3>
          <Badge tag={dish.tag} locale={locale} />
        </div>
        <p className="text-[0.9375rem] leading-body text-harbor">{dish.description[locale]}</p>
        <p className="mt-auto pt-1 font-display text-lg font-semibold">{dish.price}</p>
      </div>
    </article>
  )
}
