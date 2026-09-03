import { notFound } from 'next/navigation'

// Filet d'attente : toute route inconnue sous /fr ou /en
// déclenche la page 404 du segment (not-found.tsx).
export default function CatchAllPage() {
  notFound()
}
