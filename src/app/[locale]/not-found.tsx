import type { Metadata } from 'next'
import { NotFoundPanel } from '@/components/NotFoundPanel'

export const metadata: Metadata = {
  title: 'Page introuvable',
}

export default function NotFound() {
  return <NotFoundPanel />
}
