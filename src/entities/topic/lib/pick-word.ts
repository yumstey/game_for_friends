import type { LocalizedText } from '@/shared/i18n'
import { pickRandom } from '@/shared/lib'
import { getTopicById } from '../config/topics'
import type { PickedWord, Topic } from '../model/types'

export function getWordKey(topicId: string, word: LocalizedText): string {
  return `${topicId}:${word.en}`
}

export interface PickWordResult extends PickedWord {
  /**
   * `true` — tanlangan mavzulardagi barcha soʻzlar allaqachon chiqqan edi va tarix
   * hisobga olinmadi. Chaqiruvchi tarixni tozalashi kerak.
   */
  historyExhausted: boolean
}

/**
 * Ikki bosqichli tasodifiy tanlov:
 * 1) tanlangan mavzulardan biri (har bir mavzu teng ehtimollikda — soʻzlar soniga bogʻliq emas);
 * 2) shu mavzudagi hali chiqmagan soʻzlardan biri.
 */
export function pickRandomWord(
  topicIds: readonly string[],
  usedKeys: readonly string[] = [],
): PickWordResult {
  const topics = topicIds
    .map(getTopicById)
    .filter((topic): topic is Topic => topic !== undefined)

  if (topics.length === 0) {
    throw new Error('pickRandomWord: at least one valid topic is required')
  }

  const used = new Set(usedKeys)
  const fresh = topics
    .map((topic) => ({
      topic,
      words: topic.words.filter((word) => !used.has(getWordKey(topic.id, word))),
    }))
    .filter((entry) => entry.words.length > 0)

  const historyExhausted = fresh.length === 0
  const pool = historyExhausted
    ? topics.map((topic) => ({ topic, words: topic.words }))
    : fresh

  const { topic, words } = pickRandom(pool)
  const word = pickRandom(words)

  return { topic, word, key: getWordKey(topic.id, word), historyExhausted }
}
