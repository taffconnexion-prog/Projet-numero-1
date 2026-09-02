'use client'

import { useEffect, useRef, useState } from 'react'
import type { FormEvent } from 'react'
import { CtaButton } from '@/components/ui/Cta'
import { site } from '@/lib/site'
import {
  buildReservationMailto,
  formatDateFr,
  todayIso,
  validateReservation,
} from '@/lib/validation'
import type { ReservationErrors, ReservationValues } from '@/lib/validation'
import { ReservationFields } from './ReservationFields'

const EMPTY: ReservationValues = {
  nom: '',
  email: '',
  telephone: '',
  date: '',
  heure: '',
  couverts: '2',
  occasion: '',
  allergies: '',
  message: '',
}

type Status = 'idle' | 'sending' | 'sent'

function CheckIcon() {
  return (
    <svg viewBox="0 0 48 48" fill="none" className="h-12 w-12 text-ocean-mid" aria-hidden="true">
      <circle cx="24" cy="24" r="21" stroke="currentColor" strokeWidth="2" />
      <path
        d="M15 24.5l6 6 12-13"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

// Formulaire de réservation — HTML5 natif, validation TypeScript stricte,
// envoi par mailto (pas de backend, pas de base de données).
export function ReservationForm() {
  const [values, setValues] = useState<ReservationValues>(EMPTY)
  const [errors, setErrors] = useState<ReservationErrors>({})
  const [status, setStatus] = useState<Status>('idle')
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current)
    },
    []
  )

  function update(key: keyof ReservationValues, value: string) {
    setValues((current) => ({ ...current, [key]: value }))
    setErrors((current) => (current[key] ? { ...current, [key]: undefined } : current))
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (status === 'sending') return
    const nextErrors = validateReservation(values)
    setErrors(nextErrors)
    if (Object.values(nextErrors).some(Boolean)) return

    // Pas de backend : la demande part par e-mail, sans aucun stockage.
    setStatus('sending')
    window.location.href = buildReservationMailto(values)
    // Rate limiting minimal : bouton verrouillé 3 s après l’envoi.
    timer.current = setTimeout(() => setStatus('sent'), 3000)
  }

  function reset() {
    setValues(EMPTY)
    setErrors({})
    setStatus('idle')
  }

  if (status === 'sent') {
    const firstName = values.nom.trim().split(' ')[0]
    const count = Number(values.couverts)
    return (
      <div className="flex h-full flex-col justify-center bg-foam p-8 text-ocean-deep md:p-12" role="status">
        <CheckIcon />
        <h2 className="mt-6 font-display text-3xl font-semibold">Demande transmise</h2>
        <p className="mt-4 max-w-md text-[0.9375rem] leading-relaxed text-ocean-mid">
          Merci {firstName}. Votre demande de réservation pour le {formatDateFr(values.date)} à{' '}
          {values.heure} ({count} couvert{count > 1 ? 's' : ''}) a été envoyée à notre équipe.
        </p>
        <p className="mt-4 max-w-md text-[0.9375rem] font-medium leading-relaxed">
          Votre demande sera confirmée par téléphone dans les 2 heures.
        </p>
        <p className="mt-4 max-w-md text-sm leading-relaxed text-ocean-mid">
          Votre client mail s’est ouvert avec le récapitulatif — si ce n’est pas le cas,
          appelez-nous au {site.phoneDisplay}.
        </p>
        <button
          type="button"
          onClick={reset}
          className="mt-8 self-start text-sm font-medium text-ocean-deep underline decoration-ocean-light underline-offset-4"
        >
          Faire une autre demande
        </button>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="h-fit bg-foam p-6 text-ocean-deep md:p-10"
      aria-describedby="rgpd-note"
    >
      <h2 className="font-display text-2xl font-semibold">Réserver une table</h2>

      <div className="mt-8">
        <ReservationFields values={values} errors={errors} update={update} minDate={todayIso()} />
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-6">
        <CtaButton disabled={status === 'sending'}>
          {status === 'sending' ? 'Envoi en cours…' : 'Envoyer ma demande'}
        </CtaButton>
        <p className="text-xs text-ocean-mid">Fermé le lundi · confirmation par téléphone</p>
      </div>

      <p id="rgpd-note" className="mt-6 text-xs leading-relaxed text-ocean-mid">
        Vos informations ne quittent pas ce site : elles sont transmises uniquement par e-mail à
        notre équipe de réservation et ne sont stockées nulle part ici.
      </p>
    </form>
  )
}
