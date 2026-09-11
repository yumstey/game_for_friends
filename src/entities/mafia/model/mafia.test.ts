import { describe, expect, it } from 'vitest'
import type { MafiaRoleId } from '../config/roles'
import {
  buildRoleDeck,
  countCivilians,
  countMafiaTeam,
  recommendRoleCounts,
  validateRoleCounts,
} from './distribution'
import {
  getNightSteps,
  getStepAvailability,
  getTargetRestriction,
  resolveNight,
} from './night'
import {
  completeNight,
  continueAfterVerdict,
  createMafiaSession,
  eliminateByVote,
  setNightTarget,
  startDay,
  startNight,
} from './session'
import type { MafiaPlayer, MafiaSession } from './types'
import { getWinner } from './winner'

const makePlayers = (roles: MafiaRoleId[], dead: number[] = []): MafiaPlayer[] =>
  roles.map((role, index) => ({
    id: `p${index}`,
    name: `Player ${index}`,
    role,
    alive: !dead.includes(index),
  }))

/** Rollari aniq berilgan sessiya (tasodifiylikni chetlab oʻtish uchun). */
const makeSession = (roles: MafiaRoleId[]): MafiaSession => {
  const base = createMafiaSession({
    participants: roles.map((_, index) => ({ id: `p${index}`, name: `Player ${index}` })),
    roleCounts: recommendRoleCounts(roles.length),
    settings: { revealRoleOnDeath: true, discussionSeconds: 60 },
  })

  return startNight({ ...base, players: makePlayers(roles) })
}

describe('role distribution', () => {
  it('recommends a valid, balanced setup for 4..24 players', () => {
    for (let count = 4; count <= 24; count++) {
      const roles = recommendRoleCounts(count)

      expect(validateRoleCounts(roles, count), `players: ${count}`).toEqual([])
      expect(countMafiaTeam(roles) * 2).toBeLessThan(count)
      expect(buildRoleDeck(roles, count)).toHaveLength(count)
    }
  })

  it('matches the classic setup for 7 players', () => {
    const roles = recommendRoleCounts(7)

    expect(roles).toMatchObject({ don: 1, mafia: 1, detective: 1, doctor: 1 })
    expect(countCivilians(roles, 7)).toBe(3)
  })

  it('reports invalid setups', () => {
    const base = recommendRoleCounts(6)

    expect(validateRoleCounts({ ...base, mafia: 0, don: 0 }, 6)).toContain('no-mafia')
    expect(validateRoleCounts({ ...base, mafia: 3 }, 6)).toContain('mafia-majority')
    expect(validateRoleCounts(base, 3)).toContain('not-enough-players')
    expect(validateRoleCounts({ ...base, doctor: 2 }, 6)).toContain(
      'unique-role-exceeded',
    )
  })

  it('assigns every role from the deck when creating a session', () => {
    const counts = recommendRoleCounts(10)
    const session = createMafiaSession({
      participants: Array.from({ length: 10 }, (_, i) => ({ id: `${i}`, name: `P${i}` })),
      roleCounts: counts,
      settings: { revealRoleOnDeath: true, discussionSeconds: 60 },
    })
    const roles = session.players.map((player) => player.role).sort()

    expect(roles).toEqual([...buildRoleDeck(counts, 10)].sort())
  })
})

describe('night', () => {
  // p0 don, p1 mafia, p2 detective, p3 doctor, p4 lover, p5 maniac, p6..p8 civilians
  const roles: MafiaRoleId[] = [
    'don',
    'mafia',
    'detective',
    'doctor',
    'lover',
    'maniac',
    'civilian',
    'civilian',
    'civilian',
  ]

  it('lists steps in wake-up order for roles present in the game', () => {
    expect(getNightSteps(makePlayers(roles))).toEqual([
      'lover',
      'mafia',
      'don',
      'detective',
      'doctor',
      'maniac',
    ])
    expect(
      getNightSteps(makePlayers(['mafia', 'civilian', 'civilian', 'doctor'])),
    ).toEqual(['mafia', 'doctor'])
  })

  it('kills the targets of mafia and maniac', () => {
    let session = makeSession(roles)
    session = setNightTarget(session, 'mafia', 'p6')
    session = setNightTarget(session, 'maniac', 'p7')

    expect(resolveNight(session).report.killedIds).toEqual(['p6', 'p7'])
  })

  it('lets the doctor save a victim', () => {
    let session = makeSession(roles)
    session = setNightTarget(session, 'mafia', 'p6')
    session = setNightTarget(session, 'doctor', 'p6')

    const { report } = resolveNight(session)
    expect(report.killedIds).toEqual([])
    expect(report.savedIds).toEqual(['p6'])
  })

  it('cancels the ability of the player blocked by the lover', () => {
    let session = makeSession(roles)
    session = setNightTarget(session, 'lover', 'p3') // doctor is blocked
    session = setNightTarget(session, 'mafia', 'p6')
    session = setNightTarget(session, 'doctor', 'p6')

    expect(getStepAvailability(session, 'doctor')).toBe('blocked')
    expect(resolveNight(session).report.killedIds).toEqual(['p6'])
  })

  it('blocks the mafia kill only when the last mafia member is blocked', () => {
    let session = makeSession(roles)
    session = setNightTarget(session, 'lover', 'p1')
    expect(getStepAvailability(session, 'mafia')).toBe('active')

    session = { ...session, players: makePlayers(roles, [0]) } // don is dead
    expect(getStepAvailability(session, 'mafia')).toBe('blocked')
  })

  it('forbids healing the same player twice in a row and self-heal twice', () => {
    const players = makePlayers(roles)
    const doctor = players[3]!
    const civilian = players[6]!

    expect(
      getTargetRestriction(
        { doctorLastTargetId: civilian.id, doctorSelfHealUsed: false },
        'doctor',
        civilian,
      ),
    ).toBe('repeat-heal')
    expect(
      getTargetRestriction(
        { doctorLastTargetId: null, doctorSelfHealUsed: true },
        'doctor',
        doctor,
      ),
    ).toBe('self-heal-used')
    expect(
      getTargetRestriction(
        { doctorLastTargetId: null, doctorSelfHealUsed: false },
        'mafia',
        players[1]!,
      ),
    ).toBe('teammate')
  })

  it('applies deaths, tracks doctor state and silences the lover target', () => {
    let session = makeSession(roles)
    session = setNightTarget(session, 'lover', 'p8')
    session = setNightTarget(session, 'mafia', 'p6')
    session = setNightTarget(session, 'doctor', 'p3')

    const next = completeNight(session)

    expect(next.phase).toBe('morning')
    expect(next.players.find((player) => player.id === 'p6')?.alive).toBe(false)
    expect(next.doctorLastTargetId).toBe('p3')
    expect(next.doctorSelfHealUsed).toBe(true)
    expect(next.silencedId).toBe('p8')
    expect(next.log).toHaveLength(1)
  })
})

describe('winner', () => {
  it('detects each outcome', () => {
    expect(getWinner(makePlayers(['mafia', 'civilian', 'civilian'], [0]))).toBe('town')
    expect(getWinner(makePlayers(['mafia', 'civilian', 'civilian'], [1]))).toBe('mafia')
    expect(getWinner(makePlayers(['maniac', 'civilian', 'mafia'], [2]))).toBe('maniac')
    expect(getWinner(makePlayers(['maniac', 'mafia', 'don'], []))).toBe('mafia')
    expect(getWinner(makePlayers(['maniac', 'mafia'], []))).toBe('draw')
    expect(getWinner(makePlayers(['mafia', 'civilian'], [0, 1]))).toBe('draw')
    expect(
      getWinner(makePlayers(['mafia', 'civilian', 'civilian', 'doctor'], [])),
    ).toBeNull()
  })
})

describe('day cycle', () => {
  it('eliminates by vote and ends the game when a team wins', () => {
    const session = makeSession(['mafia', 'civilian', 'civilian', 'doctor'])

    const verdict = eliminateByVote({ ...session, phase: 'voting' }, 'p0')
    expect(verdict.phase).toBe('verdict')
    expect(verdict.winner).toBe('town')
    expect(continueAfterVerdict(verdict).phase).toBe('over')
  })

  it('starts the next night when nobody wins', () => {
    const session = makeSession(['mafia', 'civilian', 'civilian', 'doctor', 'civilian'])

    const verdict = eliminateByVote({ ...session, phase: 'voting' }, null)
    const nextNight = continueAfterVerdict(verdict)

    expect(nextNight.phase).toBe('night')
    expect(nextNight.cycle).toBe(session.cycle + 1)
  })

  it('goes to the final screen from the morning when the night decided the game', () => {
    let session = makeSession(['mafia', 'civilian', 'civilian', 'doctor'])
    session = {
      ...session,
      players: makePlayers(['mafia', 'civilian', 'civilian', 'doctor'], [1]),
    }
    session = setNightTarget(session, 'mafia', 'p2')

    const morning = completeNight(session)
    expect(morning.winner).toBe('mafia')
    expect(startDay(morning).phase).toBe('over')
  })
})
