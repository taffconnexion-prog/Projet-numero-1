import type { Locale } from '@/types'

// Structure commune aux dictionnaires fr / en — garantit la parité.
export interface Dict {
  locale: Locale
  skip: string
  nav: {
    home: string
    menu: string
    about: string
    contact: string
    reserve: string
    primaryNav: string
    mobileNav: string
    openMenu: string
    closeMenu: string
    switchLanguage: string
  }
  hero: {
    alt: string
    subtitle: string
    reserve: string
    menu: string
    scroll: string
  }
  maison: {
    title: string
    accent: string
    p1: string
    p2: string
    quote: string
    author: string
  }
  carte: {
    title: string
    accent: string
    prev: string
    next: string
    full: string
  }
  ambiance: {
    title: string
    accent: string
    location: string
    caption: string
    subcaption: string
  }
  localisation: {
    title: string
    accent: string
    hours: string
    come: string
    comeText: string
    reserve: string
    mapTitle: string
  }
  footer: {
    tagline: string
    house: string
    join: string
    hours: string
    rights: string
  }
  hours: {
    lunch: string
    lunchValue: string
    dinner: string
    dinnerValue: string
    monday: string
    mondayValue: string
  }
  pages: {
    menu: {
      title: string
      accent: string
      description: string
      filters: {
        all: string
        entrees: string
        plats: string
        desserts: string
        boissons: string
        degustation: string
      }
      group: string
      priceNote: string
      tastingShown: string
      dishesShown: string
      lunch: string
      dinner: string
      reserveTasting: string
    }
    about: {
      title: string
      accent: string
      description: string
      chef: {
        title: string
        accent: string
        alt: string
        p1: string
        p2: string
        p3: string
      }
      histoire: {
        title: string
        accent: string
        p1: string
        p2: string
        suppliers: Array<{ name: string; role: string }>
      }
      equipe: { title: string; accent: string }
    }
    contact: {
      title: string
      accent: string
      description: string
      phone: string
      email: string
      whatsapp: string
      whatsappLink: string
      social: string
      howToCome: string
      comeText: string
      write: string
      nom: string
      emailLabel: string
      message: string
      submit: string
      sentTitle: string
      sentBody: string
    }
    reservation: {
      title: string
      accent: string
      description: string
      hoursTitle: string
      byPhone: string
      byWhatsapp: string
      whatsappLabel: string
      confirmNote: string
      form: {
        title: string
        nom: string
        email: string
        telephone: string
        date: string
        heure: string
        couverts: string
        occasion: string
        allergies: string
        message: string
        optional: string
        placeholderNom: string
        placeholderEmail: string
        placeholderTel: string
        placeholderOccasion: string
        placeholderAllergies: string
        placeholderMessage: string
        chooseTime: string
        lunch: string
        dinner: string
        submit: string
        submitting: string
        closedNote: string
        rgpd: string
        mailSubject: string
        mailGuest: string
        sent: {
          title: string
          body: string
          confirm: string
          mailNote: string
          again: string
        }
        errors: {
          name: string
          email: string
          phone: string
          dateRequired: string
          datePast: string
          dateMonday: string
          time: string
          guests: string
          message: string
        }
      }
    }
  }
  notFound: {
    pre: string
    title: string
    sub: string
    home: string
  }
  meta: {
    site: string
    default: string
    description: string
    ogLocale: string
  }
}
