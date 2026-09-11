import { describe, expect, it } from 'vitest'
import { getMaxImposters } from '../config/rules'
import {
  advanceReveal,
  createRound,
  createSession,
  isImposter,
  revealImposters,
  type CreateRoundInput,
} from './session'

const players = ['Rustam', 'Bekzat', 'Bekmurat', 'Samat', 'Almaz', 'Diyar', 'Marat'].map(
  (name) => ({ id: name.toLowerCase(), name }),
)

const baseInput: CreateRoundInput = {
  number: 1,
  players,
  imposterCount: 1,
  word: { uz: 'Sher', en: 'Lion' },
  wordKey: 'animals:Lion',
  topic: { id: 'animals', emoji: '🦁', name: { uz: 'Hayvonlar', en: 'Animals' } },
  showTopicToImposter: true,
  discussionSeconds: 120,
}

describe('getMaxImposters', () => {
  it('allows one imposter per three players', () => {
    expect(getMaxImposters(3)).toBe(1)
    expect(getMaxImposters(5)).toBe(1)
    expect(getMaxImposters(7)).toBe(2)
    expect(getMaxImposters(9)).toBe(3)
  })
})

describe('createRound', () => {
  it('picks the requested number of distinct imposters from the players', () => {
    const round = createRound({ ...baseInput, imposterCount: 2 })
    const ids = players.map((player) => player.id)

    expect(new Set(round.imposterIds).size).toBe(2)
    for (const id of round.imposterIds) expect(ids).toContain(id)
    expect(ids).toContain(round.starterId)
  })

  it('eventually picks every player as imposter (randomness sanity check)', () => {
    const seen = new Set<string>()
    for (let i = 0; i < 500; i++) seen.add(createRound(baseInput).imposterIds[0]!)
    expect(seen.size).toBe(players.length)
  })

  it('rejects invalid setups', () => {
    expect(() => createRound({ ...baseInput, players: players.slice(0, 2) })).toThrow()
    expect(() => createRound({ ...baseInput, imposterCount: 3 })).toThrow()
    expect(() => createRound({ ...baseInput, imposterCount: 0 })).toThrow()
  })
})

describe('session flow', () => {
  const round = { ...createRound(baseInput), imposterIds: ['samat'] }

  it('moves to discussion after the last reveal', () => {
    let session = createSession(round)
    for (let i = 0; i < players.length - 1; i++) session = advanceReveal(session)

    expect(session.phase).toBe('reveal')
    expect(session.revealIndex).toBe(players.length - 1)
    expect(advanceReveal(session).phase).toBe('discussion')
  })

  it('reveals the imposters on demand', () => {
    const session = revealImposters(createSession(round))

    expect(session.phase).toBe('result')
    expect(isImposter(session.round, 'samat')).toBe(true)
    expect(isImposter(session.round, 'diyar')).toBe(false)
  })
})
