'use client'

import { useEffect, useRef, useState } from 'react'
import type { FormEvent } from 'react'
import type { Locale } from '@/types'
import type { Dict } from '@/locales/dict'
import { site } from '@/lib/site'
import { formatDate } from '@/lib/i18n'
import {
  buildReservationMailto,
  todayIso,
  validateReservation,
} from '@/lib/validation'
import type { ReservationErrorField, ReservationErrors, ReservationValues } from '@/lib/validation'

const ERROR_FIELDS: ReservationErrorField[] = ['nom', 'email', 'telephone', 'date', 'heure', 'couverts']
import { CtaButton } from '@/components/ui/Cta'
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
      <circle cx="24" cy="24" r="21" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M15 24.5l6 6 12-13"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

// Formulaire de réservation — HTML5 natif, validation TypeScript stricte,
// envoi par mailto (pas de backend, pas de base de données).
export function ReservationForm({ locale, t }: { locale: Locale; t: Dict['pages']['reservation'] }) {
  const form = t.form
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
    if ((ERROR_FIELDS as string[]).includes(key)) {
      const errorKey = key as ReservationErrorField
      setErrors((current) => (current[errorKey] ? { ...current, [errorKey]: undefined } : current))
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (status === 'sending') return
    const nextErrors = validateReservation(values)
    setErrors(nextErrors)
    if (Object.values(nextErrors).some(Boolean)) return

    // Pas de backend : la demande part par e-mail, sans aucun stockage.
    setStatus('sending')
    window.location.href = buildReservationMailto(values, locale)
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
    const body = form.sent.body
      .replace('{prenom}', firstName)
      .replace('{date}', formatDate(values.date, locale))
      .replace('{heure}', values.heure)
      .replace('{couverts}', String(count))
      .replace('{pluriel}', count > 1 ? (locale === 'fr' ? 's' : 's') : '')
      .replace('{mailguest}', form.mailGuest)
    const mailNote = form.sent.mailNote.replace('{telephone}', site.phoneDisplay)

    return (
      <div className="flex h-full flex-col justify-center border border-ocean-mid/25 bg-foam p-10 text-ocean-deep md:p-14" role="status">
        <CheckIcon />
        <h2 className="mt-8 font-display text-3xl font-semibold tracking-tightest">{form.sent.title}</h2>
        <p className="mt-5 max-w-prose text-[0.9375rem] leading-body text-harbor">{body}</p>
        <p className="mt-5 max-w-prose text-[0.9375rem] font-medium leading-body">{form.sent.confirm}</p>
        <p className="mt-5 max-w-prose text-sm leading-body text-harbor">{mailNote}</p>
        <button
          type="button"
          onClick={reset}
          className="mt-9 self-start text-sm font-medium text-ocean-deep underline decoration-ocean-light decoration-1 underline-offset-[5px] transition-colors duration-300 hover:text-ocean-mid"
        >
          {form.sent.again}
        </button>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="h-fit border border-ocean-mid/25 bg-foam p-7 text-ocean-deep md:p-10"
      aria-describedby="rgpd-note"
    >
      <h2 className="font-display text-2xl font-semibold tracking-tightest">{form.title}</h2>

      <div className="mt-9">
        <ReservationFields locale={locale} t={form} values={values} errors={errors} update={update} minDate={todayIso()} />
      </div>

      <div className="mt-9 flex flex-wrap items-center gap-7">
        <CtaButton disabled={status === 'sending'}>
          {status === 'sending' ? form.submitting : form.submit}
        </CtaButton>
        <p className="text-xs text-harbor">{form.closedNote}</p>
      </div>

      <p id="rgpd-note" className="mt-7 text-xs leading-body text-harbor">
        {form.rgpd}
      </p>
    </form>
  )
}
