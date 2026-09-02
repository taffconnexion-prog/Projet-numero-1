'use client'

import { Field } from '@/components/ui/Field'
import type { ReservationErrors, ReservationValues } from '@/lib/validation'

const LUNCH_SLOTS = ['12:00', '12:30', '13:00', '13:30', '14:00']
const DINNER_SLOTS = ['19:00', '19:30', '20:00', '20:30', '21:00', '21:30', '22:00']

export function inputClass(error?: string): string {
  return `w-full border bg-white px-4 py-3 text-[0.9375rem] text-ocean-deep transition-colors duration-150 placeholder:text-ocean-mid/50 focus:border-ocean-mid focus:outline-none ${
    error ? 'border-coral-dark' : 'border-ocean-mid/40 hover:border-ocean-mid/70'
  }`
}

interface ReservationFieldsProps {
  values: ReservationValues
  errors: ReservationErrors
  update: (key: keyof ReservationValues, value: string) => void
  minDate: string
}

// Grille des champs du formulaire de réservation (composant passif).
export function ReservationFields({ values, errors, update, minDate }: ReservationFieldsProps) {
  return (
    <div className="grid gap-6 sm:grid-cols-2">
      <Field id="nom" label="Nom complet" error={errors.nom}>
        <input
          id="nom"
          name="nom"
          type="text"
          autoComplete="name"
          required
          placeholder="Ex. Aïcha Adannou"
          value={values.nom}
          onChange={(event) => update('nom', event.target.value)}
          aria-invalid={errors.nom ? true : undefined}
          aria-describedby={errors.nom ? 'nom-error' : undefined}
          className={inputClass(errors.nom)}
        />
      </Field>

      <Field id="email" label="E-mail" error={errors.email}>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          placeholder="vous@exemple.bj"
          value={values.email}
          onChange={(event) => update('email', event.target.value)}
          aria-invalid={errors.email ? true : undefined}
          aria-describedby={errors.email ? 'email-error' : undefined}
          className={inputClass(errors.email)}
        />
      </Field>

      <Field id="telephone" label="Téléphone" error={errors.telephone}>
        <input
          id="telephone"
          name="telephone"
          type="tel"
          autoComplete="tel"
          inputMode="tel"
          required
          placeholder="+229 01 23 45 67"
          value={values.telephone}
          onChange={(event) => update('telephone', event.target.value)}
          aria-invalid={errors.telephone ? true : undefined}
          aria-describedby={errors.telephone ? 'telephone-error' : undefined}
          className={inputClass(errors.telephone)}
        />
      </Field>

      <Field id="date" label="Date souhaitée" error={errors.date}>
        <input
          id="date"
          name="date"
          type="date"
          required
          min={minDate}
          value={values.date}
          onChange={(event) => update('date', event.target.value)}
          aria-invalid={errors.date ? true : undefined}
          aria-describedby={errors.date ? 'date-error' : undefined}
          className={inputClass(errors.date)}
        />
      </Field>

      <Field id="heure" label="Heure" error={errors.heure}>
        <select
          id="heure"
          name="heure"
          required
          value={values.heure}
          onChange={(event) => update('heure', event.target.value)}
          aria-invalid={errors.heure ? true : undefined}
          aria-describedby={errors.heure ? 'heure-error' : undefined}
          className={inputClass(errors.heure)}
        >
          <option value="">Choisir un créneau…</option>
          <optgroup label="Déjeuner">
            {LUNCH_SLOTS.map((slot) => (
              <option key={slot} value={slot}>{slot}</option>
            ))}
          </optgroup>
          <optgroup label="Dîner">
            {DINNER_SLOTS.map((slot) => (
              <option key={slot} value={slot}>{slot}</option>
            ))}
          </optgroup>
        </select>
      </Field>

      <Field id="couverts" label="Nombre de couverts" error={errors.couverts}>
        <select
          id="couverts"
          name="couverts"
          required
          value={values.couverts}
          onChange={(event) => update('couverts', event.target.value)}
          aria-invalid={errors.couverts ? true : undefined}
          aria-describedby={errors.couverts ? 'couverts-error' : undefined}
          className={inputClass(errors.couverts)}
        >
          {Array.from({ length: 20 }, (_, position) => position + 1).map((count) => (
            <option key={count} value={String(count)}>
              {count}
            </option>
          ))}
        </select>
      </Field>

      <Field id="occasion" label="Occasion spéciale" hint="(facultatif)">
        <input
          id="occasion"
          name="occasion"
          type="text"
          placeholder="Anniversaire, dîner d’affaires…"
          value={values.occasion}
          onChange={(event) => update('occasion', event.target.value)}
          className={inputClass()}
        />
      </Field>

      <Field id="allergies" label="Allergies / régimes" hint="(facultatif)">
        <input
          id="allergies"
          name="allergies"
          type="text"
          placeholder="Fruits de mer, gluten…"
          value={values.allergies}
          onChange={(event) => update('allergies', event.target.value)}
          className={inputClass()}
        />
      </Field>

      <Field id="message" label="Message" hint="(facultatif)" className="sm:col-span-2">
        <textarea
          id="message"
          name="message"
          rows={4}
          placeholder="Une table au bord de l’eau, une chaise haute, une surprise…"
          value={values.message}
          onChange={(event) => update('message', event.target.value)}
          className={inputClass()}
        />
      </Field>
    </div>
  )
}
