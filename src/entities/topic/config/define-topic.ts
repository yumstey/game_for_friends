import type { LocalizedText } from '@/shared/i18n'
import type { Topic, TopicId } from '../model/types'

type WordPair = readonly [uz: string, en: string]

interface TopicInput {
  id: TopicId
  emoji: string
  name: LocalizedText
  /** `[oʻzbekcha, inglizcha]` juftliklari — qoʻshish va tahrirlash oson boʻlishi uchun. */
  words: readonly WordPair[]
}

export function defineTopic({ words, ...topic }: TopicInput): Topic {
  return {
    ...topic,
    words: words.map(([uz, en]) => ({ uz, en })),
  }
}
