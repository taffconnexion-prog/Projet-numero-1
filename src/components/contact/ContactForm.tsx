'use client'

import { useState } from 'react'
import type { FormEvent } from 'react'
import { CtaButton } from '@/components/ui/Cta'
import { Field } from '@/components/ui/Field'
import { site } from '@/lib/site'

interface ContactValues {
  nom: string
  email: string
  message: string
}

type ContactErrors = Partial<Record<keyof ContactValues, string>>

const EMPTY: ContactValues = { nom: '', email: '', message: '' }

function inputClass(error?: string): string {
  return `w-full border bg-white px-4 py-3 text-[0.9375rem] text-ocean-deep transition-colors duration-150 placeholder:text-ocean-mid/50 focus:border-ocean-mid focus:outline-none ${
    error ? 'border-coral-dark' : 'border-ocean-mid/40 hover:border-ocean-mid/70'
  }`
}

// Formulaire de contact simple — envoi par mailto, sans backend.
export function ContactForm() {
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
    if (values.nom.trim().length < 2) next.nom = 'Veuillez indiquer votre nom.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email.trim())) {
      next.email = 'Adresse e-mail invalide.'
    }
    if (values.message.trim().length < 10) next.message = 'Quelques mots de plus, s’il vous plaît.'
    setErrors(next)
    if (Object.values(next).some(Boolean)) return

    const params = new URLSearchParams({
      subject: `Contact — ${values.nom.trim()}`,
      body: `De : ${values.nom.trim()} (${values.email.trim()})\n\n${values.message.trim()}\n\n— Envoyé depuis le site verslocean.bj`,
    })
    window.location.href = `mailto:${site.emailContact}?${params.toString()}`
    setSent(true)
  }

  if (sent) {
    const firstName = values.nom.trim().split(' ')[0]
    return (
      <div className="h-fit bg-foam p-8 text-ocean-deep md:p-10" role="status">
        <h2 className="font-display text-2xl font-semibold">Merci {firstName}.</h2>
        <p className="mt-4 text-[0.9375rem] leading-relaxed text-ocean-mid">
          Votre message a été transmis à notre équipe — nous revenons vers vous rapidement.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="h-fit bg-foam p-6 text-ocean-deep md:p-10">
      <h2 className="font-display text-2xl font-semibold">Écrivez-nous</h2>
      <div className="mt-8 space-y-6">
        <Field id="c-nom" label="Nom" error={errors.nom}>
          <input
            id="c-nom"
            name="nom"
            type="text"
            autoComplete="name"
            required
            placeholder="Votre nom"
            value={values.nom}
            onChange={(event) => update('nom', event.target.value)}
            aria-invalid={errors.nom ? true : undefined}
            aria-describedby={errors.nom ? 'c-nom-error' : undefined}
            className={inputClass(errors.nom)}
          />
        </Field>
        <Field id="c-email" label="E-mail" error={errors.email}>
          <input
            id="c-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            placeholder="vous@exemple.bj"
            value={values.email}
            onChange={(event) => update('email', event.target.value)}
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={errors.email ? 'c-email-error' : undefined}
            className={inputClass(errors.email)}
          />
        </Field>
        <Field id="c-message" label="Message" error={errors.message}>
          <textarea
            id="c-message"
            name="message"
            rows={5}
            required
            placeholder="Votre question, votre demande…"
            value={values.message}
            onChange={(event) => update('message', event.target.value)}
            aria-invalid={errors.message ? true : undefined}
            aria-describedby={errors.message ? 'c-message-error' : undefined}
            className={inputClass(errors.message)}
          />
        </Field>
      </div>
      <div className="mt-8">
        <CtaButton>Envoyer le message</CtaButton>
      </div>
    </form>
  )
}
