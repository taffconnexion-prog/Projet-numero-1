'use client'

import { useState } from 'react'
import type { FormEvent } from 'react'
import type { Locale } from '@/types'
import type { Dict } from '@/locales/dict'
import { site } from '@/lib/site'
import { CtaButton } from '@/components/ui/Cta'
import { Field } from '@/components/ui/Field'
import { inputClass } from '@/components/reservation/ReservationFields'

interface ContactValues {
  nom: string
  email: string
  message: string
}

type ContactErrors = Partial<Record<keyof ContactValues, boolean>>

const EMPTY: ContactValues = { nom: '', email: '', message: '' }

// Formulaire de contact simple — envoi par mailto, sans backend.
export function ContactForm({ locale, t }: { locale: Locale; t: Dict['pages']['contact'] }) {
  const [values, setValues] = useState<ContactValues>(EMPTY)
  const [errors, setErrors] = useState<ContactErrors>({})
  const [sent, setSent] = useState(false)

  function update(key: keyof ContactValues, value: string) {
    setValues((current) => ({ ...current, [key]: value }))
    setErrors((current) => (current[key] ? { ...current, [key]: undefined } : current))
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const next: ContactErrors = {}
    if (values.nom.trim().length < 2) next.nom = true
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email.trim())) next.email = true
    if (values.message.trim().length < 10) next.message = true
    setErrors(next)
    if (Object.values(next).some(Boolean)) return

    const params = new URLSearchParams({
      subject: `Contact — ${values.nom.trim()}`,
      body: `${locale === 'fr' ? 'De' : 'From'} : ${values.nom.trim()} (${values.email.trim()})\n\n${values.message.trim()}\n\n— verslocean.bj`,
    })
    window.location.href = `mailto:${site.emailContact}?${params.toString()}`
    setSent(true)
  }

  if (sent) {
    const firstName = values.nom.trim().split(' ')[0]
    return (
      <div className="h-fit border border-ocean-mid/25 bg-foam p-10 text-ocean-deep" role="status">
        <h2 className="font-display text-2xl font-semibold tracking-tightest">
          {t.sentTitle.replace('{prenom}', firstName)}
        </h2>
        <p className="mt-5 max-w-prose text-[0.9375rem] leading-body text-harbor">{t.sentBody}</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="h-fit border border-ocean-mid/25 bg-foam p-7 text-ocean-deep md:p-10">
      <h2 className="font-display text-2xl font-semibold tracking-tightest">{t.write}</h2>
      <div className="mt-9 space-y-7">
        <Field id="c-nom" label={t.nom}>
          <input
            id="c-nom"
            name="nom"
            type="text"
            autoComplete="name"
            required
            value={values.nom}
            onChange={(event) => update('nom', event.target.value)}
            className={inputClass(Boolean(errors.nom))}
            aria-invalid={errors.nom ? true : undefined}
          />
        </Field>
        <Field id="c-email" label={t.emailLabel}>
          <input
            id="c-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={values.email}
            onChange={(event) => update('email', event.target.value)}
            className={inputClass(Boolean(errors.email))}
            aria-invalid={errors.email ? true : undefined}
          />
        </Field>
        <Field id="c-message" label={t.message}>
          <textarea
            id="c-message"
            name="message"
            rows={5}
            required
            value={values.message}
            onChange={(event) => update('message', event.target.value)}
            className={inputClass(Boolean(errors.message))}
            aria-invalid={errors.message ? true : undefined}
          />
        </Field>
      </div>
      <div className="mt-9">
        <CtaButton>{t.submit}</CtaButton>
      </div>
    </form>
  )
}
