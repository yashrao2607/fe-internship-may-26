import { ItemCard } from './ItemCard'
import type { Item } from '../types'

export function ItemList({ items, query = '' }: { items: Item[]; query?: string }) {
  return (
    <div className="flex flex-col gap-2.5">
      {items.map((item, i) => (
        <div
          key={item.id}
          className="animate-fade-up"
          // Stagger entrance, but cap the delay so long lists never feel sluggish.
          style={{ animationDelay: `${Math.min(i, 12) * 35}ms` }}
        >
          <ItemCard item={item} query={query} />
        </div>
      ))}
    </div>
  )
}
