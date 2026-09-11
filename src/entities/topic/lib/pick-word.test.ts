import { describe, expect, it } from 'vitest'
import { TOPICS, getTopicById } from '../config/topics'
import { getWordKey, pickRandomWord } from './pick-word'

describe('topics data', () => {
  it('has unique topic ids and unique words per topic', () => {
    expect(new Set(TOPICS.map((topic) => topic.id)).size).toBe(TOPICS.length)

    for (const topic of TOPICS) {
      const uz = topic.words.map((word) => word.uz.toLowerCase())
      const en = topic.words.map((word) => word.en.toLowerCase())

      expect(new Set(uz).size, `${topic.id}: duplicate uz word`).toBe(uz.length)
      expect(new Set(en).size, `${topic.id}: duplicate en word`).toBe(en.length)
      expect(topic.words.length).toBeGreaterThanOrEqual(25)
    }
  })

  it('has non-empty translations', () => {
    for (const topic of TOPICS) {
      for (const word of topic.words) {
        expect(word.uz.trim()).not.toBe('')
        expect(word.en.trim()).not.toBe('')
      }
    }
  })
})

describe('pickRandomWord', () => {
  it('only picks from the selected topics', () => {
    for (let i = 0; i < 100; i++) {
      const result = pickRandomWord(['animals', 'movies'])
      expect(['animals', 'movies']).toContain(result.topic.id)
      expect(result.topic.words).toContain(result.word)
    }
  })

  it('never repeats a used word while fresh words remain', () => {
    const topic = getTopicById('fruits')!
    const allButOne = topic.words.slice(1).map((word) => getWordKey(topic.id, word))

    const result = pickRandomWord(['fruits'], allButOne)

    expect(result.word).toBe(topic.words[0])
    expect(result.historyExhausted).toBe(false)
  })

  it('reports exhaustion and still returns a word', () => {
    const topic = getTopicById('fruits')!
    const all = topic.words.map((word) => getWordKey(topic.id, word))

    const result = pickRandomWord(['fruits'], all)

    expect(result.historyExhausted).toBe(true)
    expect(topic.words).toContain(result.word)
  })

  it('throws without valid topics', () => {
    expect(() => pickRandomWord([])).toThrow()
    expect(() => pickRandomWord(['unknown'])).toThrow()
  })
})
