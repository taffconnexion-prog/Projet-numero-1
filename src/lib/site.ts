// Coordonnées et informations publiques du restaurant — source unique.
// Les libellés d'horaires sont dans les dictionnaires (src/locales).
export const site = {
  name: "Vers l'Océan",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://verslocean.bj',
  address: {
    line1: 'Route des Pêcheurs',
    line2: 'Quartier Fidjrossè Plage',
    city: 'Cotonou',
    country: { fr: 'Bénin', en: 'Benin' } as Record<'fr' | 'en', string>,
  },
  phoneDisplay: '+229 01 23 45 67',
  phoneHref: 'tel:+22901234567',
  whatsappHref: 'https://wa.me/22901234567',
  emailContact: 'contact@verslocean.bj',
  emailReservation: 'reservation@verslocean.bj',
  instagram: 'https://instagram.com/verslocean.bj',
  facebook: 'https://facebook.com/verslocean.bj',
  // Embed Google Maps sans clé API.
  mapEmbed:
    'https://www.google.com/maps?q=Route%20des%20P%C3%AAcheurs%2C%20Fidjross%C3%A8%2C%20Cotonou%2C%20B%C3%A9nin&z=15&output=embed',
} as const
