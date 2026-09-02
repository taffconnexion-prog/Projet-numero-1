export type DishTag = 'signature' | 'traditionnel' | 'prestige' | 'maison'

export type DishCategory = 'entrées' | 'plats' | 'desserts' | 'boissons'

export interface Dish {
  id: string
  name: string
  description: string
  price: string
  category: DishCategory
  tag: DishTag
  image: string
}

export interface TastingCourse {
  name: string
  detail: string
}

export interface TastingMenu {
  name: string
  services: number
  price: string
  note: string
  courses: TastingCourse[]
}

export interface TeamMember {
  id: string
  name: string
  role: string
  photo: string
}

export interface GalleryItem {
  id: string
  src: string
  alt: string
}
