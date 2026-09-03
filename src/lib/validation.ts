import type { Locale } from '@/types'
import { site } from './site'
import { formatDate } from './i18n'

export interface ReservationValues {
  nom: string
  email: string
  telephone: string
  date: string
  heure: string
  couverts: string
  occasion: string
  allergies: string
  message: string
}

export type ReservationErrorField =
  | 'nom'
  | 'email'
  | 'telephone'
  | 'date'
  | 'heure'
  | 'couverts'

// Codes d'erreur — les messages sont dans les dictionnaires (i18n).
export type ReservationErrorCode =
  | 'name'
  | 'email'
  | 'phone'
  | 'dateRequired'
  | 'datePast'
  | 'dateMonday'
  | 'time'
  | 'guests'

export type ReservationErrors = Partial<Record<ReservationErrorField, ReservationErrorCode>>

export function normalizePhone(input: string): string {
  return input.replace(/[\s\-().]/g, '')
}

// Format béninois : 8 chiffres commençant par 01, préfixe +229 optionnel.
export function isValidBeninPhone(input: string): boolean {
  return /^(?:\+?229)?01\d{6}$/.test(normalizePhone(input))
}

export function isValidEmail(input: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(input.trim())
}

export function todayIso(): string {
  const d = new Date()
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${d.getFullYear()}-${month}-${day}`
}

export function validateReservation(v: ReservationValues): ReservationErrors {
  const errors: ReservationErrors = {}

  if (v.nom.trim().length < 2) {
    errors.nom = 'name'
  }
  if (!isValidEmail(v.email)) {
    errors.email = 'email'
  }
  if (!isValidBeninPhone(v.telephone)) {
    errors.telephone = 'phone'
  }
  if (!v.date) {
    errors.date = 'dateRequired'
  } else if (v.date < todayIso()) {
    errors.date = 'datePast'
  } else if (new Date(`${v.date}T12:00:00`).getDay() === 1) {
    errors.date = 'dateMonday'
  }
  if (!v.heure) {
    errors.heure = 'time'
  }
  const couverts = Number(v.couverts)
  if (!Number.isInteger(couverts) || couverts < 1 || couverts > 20) {
    errors.couverts = 'guests'
  }

  return errors
}

// Construit le lien mailto — zéro backend, zéro stockage.
export function buildReservationMailto(v: ReservationValues, locale: Locale): string {
  const lines = [
    `Nom : ${v.nom.trim()}`,
    `E-mail : ${v.email.trim()}`,
    `Téléphone : ${v.telephone.trim()}`,
    `Date : ${formatDate(v.date, locale)}`,
    `Heure : ${v.heure}`,
    `Couverts : ${v.couverts}`,
  ]
  if (v.occasion.trim()) lines.push(`Occasion : ${v.occasion.trim()}`)
  if (v.allergies.trim()) lines.push(`Allergies / régimes : ${v.allergies.trim()}`)
  if (v.message.trim()) lines.push(`Message : ${v.message.trim()}`)
  lines.push('', locale === 'fr' ? 'Demande envoyée depuis le site verslocean.bj' : 'Request sent from verslocean.bj')

  const subject = `Réservation — ${v.nom.trim()} — ${formatDate(v.date, locale)} ${locale === 'fr' ? 'à' : 'at'} ${v.heure} (${v.couverts})`
  const params = new URLSearchParams({ subject, body: lines.join('\n') })
  return `mailto:${site.emailReservation}?${params.toString()}`
}
