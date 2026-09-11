import { describe, expect, it } from 'vitest'
import { pickRandom, randomInt, sample, shuffle } from './random'

describe('randomInt', () => {
  it('returns values inside [0, max)', () => {
    for (let i = 0; i < 2_000; i++) {
      const value = randomInt(7)
      expect(value).toBeGreaterThanOrEqual(0)
      expect(value).toBeLessThan(7)
    }
  })

  it('is roughly uniform', () => {
    const buckets = Array.from({ length: 5 }, () => 0)
    const rolls = 50_000

    for (let i = 0; i < rolls; i++) buckets[randomInt(5)]!++

    for (const hits of buckets) {
      expect(hits / rolls).toBeGreaterThan(0.18)
      expect(hits / rolls).toBeLessThan(0.22)
    }
  })

  it('rejects invalid bounds', () => {
    expect(() => randomInt(0)).toThrow(RangeError)
    expect(() => randomInt(2.5)).toThrow(RangeError)
  })
})

describe('shuffle', () => {
  it('keeps every element and does not mutate the input', () => {
    const input = [1, 2, 3, 4, 5, 6]
    const result = shuffle(input)

    expect(input).toEqual([1, 2, 3, 4, 5, 6])
    expect([...result].sort()).toEqual(input)
  })
})

describe('sample / pickRandom', () => {
  it('returns unique items', () => {
    const result = sample(['a', 'b', 'c', 'd'], 3)
    expect(new Set(result).size).toBe(3)
  })

  it('throws on empty input', () => {
    expect(() => pickRandom([])).toThrow(RangeError)
    expect(() => sample([1], 2)).toThrow(RangeError)
  })
})
