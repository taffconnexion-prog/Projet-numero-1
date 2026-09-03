import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { LOCALES } from '@/types'

// Routage par locale : / → /fr (défaut), /en/… → /en/….
// Les fichiers statiques (images, fonts, favicon…) passent directement.
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (/\.[a-zA-Z0-9]+$/.test(pathname)) {
    return NextResponse.next()
  }

  const firstSegment = pathname.split('/')[1]
  if ((LOCALES as string[]).includes(firstSegment)) {
    return NextResponse.next()
  }

  const url = request.nextUrl.clone()
  url.pathname = pathname === '/' ? '/fr' : `/fr${pathname}`
  return NextResponse.redirect(url)
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
