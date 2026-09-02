import raw from './menu.json'
import type { Dish, TastingMenu } from '@/types'

// Données statiques hardcodées — pas de base de données.
export const dishes = raw.dishes as Dish[]
export const tastingMenu = raw.tastingMenu as TastingMenu
