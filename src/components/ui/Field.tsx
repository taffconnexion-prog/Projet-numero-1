import type { ReactNode } from 'react'

interface FieldProps {
  id: string
  label: string
  hint?: string
  error?: string
  className?: string
  children: ReactNode
}

// Champ de formulaire : label + contrôle + message d'erreur.
export function Field({ id, label, hint, error, className = '', children }: FieldProps) {
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-2 block text-sm font-medium text-ocean-deep">
        {label}
        {hint ? <span className="ml-1.5 font-normal text-ocean-mid">{hint}</span> : null}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} role="alert" className="mt-2 text-sm text-coral-dark">
          {error}
        </p>
      ) : null}
    </div>
  )
}
