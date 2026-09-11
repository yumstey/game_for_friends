export const LANGUAGES = ['uz', 'en'] as const

export type Language = (typeof LANGUAGES)[number]

/** Har ikki tildagi matn: `{ uz: 'Olma', en: 'Apple' }`. */
export type LocalizedText = Readonly<Record<Language, string>>

export const DEFAULT_LANGUAGE: Language = 'uz'
