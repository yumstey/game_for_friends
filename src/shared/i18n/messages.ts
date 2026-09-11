import { useLanguageStore } from './language-store'
import type { Language, LocalizedText } from './types'

export type Messages<T> = Readonly<Record<Language, T>>

/**
 * Slice ichidagi tarjimalarni eʼlon qiladi.
 * `uz` — manba: `en` aynan shu tuzilmaga ega boʻlishi shart, aks holda TypeScript xato beradi.
 *
 * @example
 * const messages = defineMessages({
 *   uz: { title: 'Oʻyinchilar', count: (n: number) => `${n} ta` },
 *   en: { title: 'Players', count: (n: number) => `${n} players` },
 * })
 */
export function defineMessages<T>(messages: { uz: T; en: NoInfer<T> }): Messages<T> {
  return messages
}

export function useLanguage(): Language {
  return useLanguageStore((state) => state.language)
}

/** Joriy til uchun tarjimalar obyektini qaytaradi. */
export function useTranslation<T>(messages: Messages<T>): T {
  return messages[useLanguage()]
}

/** `LocalizedText`ni joriy tilda koʻrsatuvchi funksiya. */
export function useLocalize(): (text: LocalizedText) => string {
  const language = useLanguage()
  return (text) => text[language]
}
