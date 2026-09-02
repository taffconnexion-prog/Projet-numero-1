// Coordonnées et informations publiques du restaurant — source unique.
export const site = {
  name: "Vers l'Océan",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://verslocean.bj',
  address: {
    line1: 'Route des Pêcheurs',
    line2: 'Quartier Fidjrossè Plage',
    city: 'Cotonou',
    country: 'Bénin',
  },
  phoneDisplay: '+229 01 23 45 67',
  phoneHref: 'tel:+22901234567',
  whatsappHref: 'https://wa.me/22901234567',
  emailContact: 'contact@verslocean.bj',
  emailReservation: 'reservation@verslocean.bj',
  instagram: 'https://instagram.com/verslocean.bj',
  facebook: 'https://facebook.com/verslocean.bj',
  hours: [
    { label: 'Déjeuner', value: '12h00 – 15h00 (mardi – dimanche)' },
    { label: 'Dîner', value: '19h00 – 23h00 (mardi – dimanche)' },
    { label: 'Lundi', value: 'Fermé' },
  ],
} as const
