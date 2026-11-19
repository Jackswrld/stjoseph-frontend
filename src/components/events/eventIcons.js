import { BookOpen, Footprints, HandHeart, Music2, Sparkles, Utensils, UsersRound, Wine } from 'lucide-react'

// Maps supported event highlight keys to installed Lucide icons.
export const FALLBACK = Sparkles
export const eventIcons = {
  chalice: Wine,
  procession: Footprints,
  music: Music2,
  fellowship: UsersRound,
  food: Utensils,
  prayer: HandHeart,
  book: BookOpen,
  other: FALLBACK,
}

// Resolves a highlight icon key and falls back for unknown backend values.
export function getEventIcon(key) {
  return eventIcons[key] || FALLBACK
}
