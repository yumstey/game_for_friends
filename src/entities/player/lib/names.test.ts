import { describe, expect, it } from 'vitest'
import { DEFAULT_PLAYER_NAMES } from '../config/defaults'
import { findNameIssues, suggestPlayerName } from './names'

const fallback = (index: number) => `Player ${index}`

describe('suggestPlayerName', () => {
  it('uses the first unused default name', () => {
    expect(suggestPlayerName(['Rustam', 'bekzat '], fallback)).toBe('Bekmurat')
  })

  it('falls back to a numbered unique name when defaults are taken', () => {
    const names = [...DEFAULT_PLAYER_NAMES, 'Player 8']
    expect(suggestPlayerName(names, fallback)).toBe('Player 9')
  })
})

describe('findNameIssues', () => {
  it('flags empty and case-insensitive duplicate names', () => {
    const issues = findNameIssues([
      { id: '1', name: 'Samat' },
      { id: '2', name: '  samat' },
      { id: '3', name: '   ' },
      { id: '4', name: 'Diyar' },
    ])

    expect(issues.get('1')).toBe('duplicate')
    expect(issues.get('2')).toBe('duplicate')
    expect(issues.get('3')).toBe('empty')
    expect(issues.has('4')).toBe(false)
  })
})
