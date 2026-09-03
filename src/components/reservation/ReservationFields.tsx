'use client'

import type { Locale } from '@/types'
import type { Dict } from '@/locales/dict'
import { Field } from '@/components/ui/Field'
import type { ReservationErrors, ReservationValues } from '@/lib/validation'

const LUNCH_SLOTS = ['12:00', '12:30', '13:00', '13:30', '14:00']
const DINNER_SLOTS = ['19:00', '19:30', '20:00', '20:30', '21:00', '21:30', '22:00']

export function inputClass(error?: boolean): string {
  return `w-full border bg-white px-4 py-3.5 text-[0.9375rem] text-ocean-deep transition-colors duration-300 placeholder:text-ocean-mid/50 focus:border-ocean-mid focus:outline-none ${
    error ? 'border-coral-dark' : 'border-ocean-mid/40 hover:border-ocean-mid/70'
  }`
}

interface ReservationFieldsProps {
  locale: Locale
  t: Dict['pages']['reservation']['form']
  values: ReservationValues
  errors: ReservationErrors
  update: (key: keyof ReservationValues, value: string) => void
  minDate: string
}

// Grille des champs du formulaire de réservation (composant passif).
export function ReservationFields({ locale, t, values, errors, update, minDate }: ReservationFieldsProps) {
  return (
    <div className="grid gap-7 sm:grid-cols-2">
      <Field id="nom" label={t.nom} error={errors.nom ? t.errors.name : undefined}>
        <input
          id="nom"
          name="nom"
          type="text"
          autoComplete="name"
          required
          placeholder={t.placeholderNom}
          value={values.nom}
          onChange={(event) => update('nom', event.target.value)}
          aria-invalid={errors.nom ? true : undefined}
          aria-describedby={errors.nom ? 'nom-error' : undefined}
          className={inputClass(Boolean(errors.nom))}
        />
      </Field>

      <Field id="email" label={t.email} error={errors.email ? t.errors.email : undefined}>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          placeholder={t.placeholderEmail}
          value={values.email}
          onChange={(event) => update('email', event.target.value)}
          aria-invalid={errors.email ? true : undefined}
          aria-describedby={errors.email ? 'email-error' : undefined}
          className={inputClass(Boolean(errors.email))}
        />
      </Field>

      <Field id="telephone" label={t.telephone} error={errors.telephone ? t.errors.phone : undefined}>
        <input
          id="telephone"
          name="telephone"
          type="tel"
          autoComplete="tel"
          inputMode="tel"
          required
          placeholder={t.placeholderTel}
          value={values.telephone}
          onChange={(event) => update('telephone', event.target.value)}
          aria-invalid={errors.telephone ? true : undefined}
          aria-describedby={errors.telephone ? 'telephone-error' : undefined}
          className={inputClass(Boolean(errors.telephone))}
        />
      </Field>

      <Field id="date" label={t.date} error={errors.date ? t.errors[errors.date] : undefined}>
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
          className={inputClass(Boolean(errors.date))}
        />
      </Field>

      <Field id="heure" label={t.heure} error={errors.heure ? t.errors.time : undefined}>
        <select
          id="heure"
          name="heure"
          required
          value={values.heure}
          onChange={(event) => update('heure', event.target.value)}
          aria-invalid={errors.heure ? true : undefined}
          aria-describedby={errors.heure ? 'heure-error' : undefined}
          className={inputClass(Boolean(errors.heure))}
        >
          <option value="">{t.chooseTime}</option>
          <optgroup label={t.lunch}>
            {LUNCH_SLOTS.map((slot) => (
              <option key={slot} value={slot}>{slot}</option>
            ))}
          </optgroup>
          <optgroup label={t.dinner}>
            {DINNER_SLOTS.map((slot) => (
              <option key={slot} value={slot}>{slot}</option>
            ))}
          </optgroup>
        </select>
      </Field>

      <Field id="couverts" label={t.couverts} error={errors.couverts ? t.errors.guests : undefined}>
        <select
          id="couverts"
          name="couverts"
          required
          value={values.couverts}
          onChange={(event) => update('couverts', event.target.value)}
          aria-invalid={errors.couverts ? true : undefined}
          aria-describedby={errors.couverts ? 'couverts-error' : undefined}
          className={inputClass(Boolean(errors.couverts))}
        >
          {Array.from({ length: 20 }, (_, position) => position + 1).map((count) => (
            <option key={count} value={String(count)}>
              {count}
            </option>
          ))}
        </select>
      </Field>

      <Field id="occasion" label={t.occasion} hint={t.optional}>
        <input
          id="occasion"
          name="occasion"
          type="text"
          placeholder={t.placeholderOccasion}
          value={values.occasion}
          onChange={(event) => update('occasion', event.target.value)}
          className={inputClass()}
        />
      </Field>

      <Field id="allergies" label={t.allergies} hint={t.optional}>
        <input
          id="allergies"
          name="allergies"
          type="text"
          placeholder={t.placeholderAllergies}
          value={values.allergies}
          onChange={(event) => update('allergies', event.target.value)}
          className={inputClass()}
        />
      </Field>

      <Field id="message" label={t.message} hint={t.optional} className="sm:col-span-2">
        <textarea
          id="message"
          name="message"
          rows={4}
          placeholder={t.placeholderMessage}
          value={values.message}
          onChange={(event) => update('message', event.target.value)}
          className={inputClass()}
        />
      </Field>
    </div>
  )
}
