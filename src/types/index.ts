// Texte bilingue — fr par défaut, en en alternat.
export type Locale = 'fr' | 'en'
export type LocalizedText = Record<Locale, string>

export const LOCALES: Locale[] = ['fr', 'en']

export type DishTag = 'signature' | 'traditionnel' | 'prestige' | 'maison'

export type DishCategory = 'entrées' | 'plats' | 'desserts' | 'boissons'

export interface Dish {
  id: string
  name: LocalizedText
  description: LocalizedText
  price: string
  category: DishCategory
  tag: DishTag
  image: string
}

export interface TastingCourse {
  name: LocalizedText
  detail: LocalizedText
}

export interface TastingMenu {
  name: LocalizedText
  accent: LocalizedText
  services: number
  price: string
  note: LocalizedText
  courses: TastingCourse[]
}

export interface TeamMember {
  id: string
  name: string
  role: LocalizedText
  photo: string
}

export interface GalleryItem {
  id: string
  src: string
  alt: LocalizedText
}
