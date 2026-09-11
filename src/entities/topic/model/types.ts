import type { LocalizedText } from '@/shared/i18n'

export type TopicId =
  | 'home'
  | 'food'
  | 'fruits'
  | 'clothes'
  | 'tech'
  | 'nature'
  | 'animals'
  | 'places'
  | 'countries'
  | 'transport'
  | 'professions'
  | 'sports'
  | 'cartoons'
  | 'movies'
  | 'footballers'
  | 'apps'

export interface Topic {
  id: TopicId
  emoji: string
  name: LocalizedText
  words: readonly LocalizedText[]
}

export interface PickedWord {
  topic: Topic
  word: LocalizedText
  /** Takrorlanishni kuzatish uchun barqaror kalit: `animals:Lion`. */
  key: string
}
