import { site } from './site'

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

export type ReservationErrors = Partial<Record<keyof ReservationValues, string>>

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

export function formatDateFr(iso: string): string {
  const date = new Date(`${iso}T12:00:00`)
  if (Number.isNaN(date.getTime())) return iso
  return date.toLocaleDateString('fr-FR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export function validateReservation(v: ReservationValues): ReservationErrors {
  const errors: ReservationErrors = {}

  if (v.nom.trim().length < 2) {
    errors.nom = 'Veuillez indiquer votre nom complet.'
  }
  if (!isValidEmail(v.email)) {
    errors.email = 'Adresse e-mail invalide.'
  }
  if (!isValidBeninPhone(v.telephone)) {
    errors.telephone = 'Numéro béninois attendu, par exemple +229 01 23 45 67.'
  }
  if (!v.date) {
    errors.date = 'Choisissez une date.'
  } else if (v.date < todayIso()) {
    errors.date = 'Cette date est déjà passée.'
  } else if (new Date(`${v.date}T12:00:00`).getDay() === 1) {
    errors.date = 'Nous sommes fermés le lundi — choisissez un autre jour.'
  }
  if (!v.heure) {
    errors.heure = 'Choisissez un créneau.'
  }
  const couverts = Number(v.couverts)
  if (!Number.isInteger(couverts) || couverts < 1 || couverts > 20) {
    errors.couverts = 'Entre 1 et 20 couverts.'
  }

  return errors
}

// Construit le lien mailto — zéro backend, zéro stockage.
export function buildReservationMailto(v: ReservationValues): string {
  const lines = [
    `Nom : ${v.nom.trim()}`,
    `E-mail : ${v.email.trim()}`,
    `Téléphone : ${v.telephone.trim()}`,
    `Date : ${formatDateFr(v.date)}`,
    `Heure : ${v.heure}`,
    `Couverts : ${v.couverts}`,
  ]
  if (v.occasion.trim()) lines.push(`Occasion : ${v.occasion.trim()}`)
  if (v.allergies.trim()) lines.push(`Allergies / régimes : ${v.allergies.trim()}`)
  if (v.message.trim()) lines.push(`Message : ${v.message.trim()}`)
  lines.push('', 'Demande envoyée depuis le site verslocean.bj')

  const couverts = Number(v.couverts)
  const subject = `Réservation — ${v.nom.trim()} — ${formatDateFr(v.date)} à ${v.heure} (${couverts} couvert${couverts > 1 ? 's' : ''})`
  const params = new URLSearchParams({ subject, body: lines.join('\n') })
  return `mailto:${site.emailReservation}?${params.toString()}`
}
