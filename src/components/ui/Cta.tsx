import Link from 'next/link'
import type { ReactNode } from 'react'

type Variant = 'primary' | 'ghost'

const BASE = 'inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm font-medium tracking-nav'

const VARIANTS: Record<Variant, string> = {
  // Corail — hover : intensification couleur + légère élévation (150ms),
  // désactivée en mode mouvement réduit.
  primary: 'bg-coral text-foam hover:bg-coral-dark',
  ghost: 'border border-sand-warm/50 text-sand-warm hover:border-sand-warm hover:bg-sand-warm/10',
}

const HOVER =
  'transition-[transform,background-color,border-color] duration-150 hover:-translate-y-0.5 motion-reduce:hover:translate-y-0'

interface CtaLinkProps {
  href: string
  children: ReactNode
  variant?: Variant
  onClick?: () => void
}

export function CtaLink({ href, children, variant = 'primary', onClick }: CtaLinkProps) {
  return (
    <Link href={href} onClick={onClick} className={`${BASE} ${HOVER} ${VARIANTS[variant]}`}>
      {children}
    </Link>
  )
}

interface CtaButtonProps {
  children: ReactNode
  disabled?: boolean
  variant?: Variant
  type?: 'submit' | 'button'
}

export function CtaButton({ children, disabled, variant = 'primary', type = 'submit' }: CtaButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled}
      className={`${BASE} ${HOVER} ${VARIANTS[variant]} disabled:cursor-not-allowed disabled:opacity-60`}
    >
      {children}
    </button>
  )
}
