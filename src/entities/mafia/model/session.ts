import { shuffle } from '@/shared/lib'
import { buildRoleDeck, validateRoleCounts } from './distribution'
import { EMPTY_NIGHT_ACTIONS, getNightSteps, resolveNight } from './night'
import type { NightStepId } from '../config/roles'
import type { MafiaParticipant, MafiaSession, MafiaSettings, RoleCounts } from './types'
import { getWinner } from './winner'

export interface CreateMafiaSessionInput {
  participants: readonly MafiaParticipant[]
  roleCounts: RoleCounts
  settings: Pick<MafiaSettings, 'revealRoleOnDeath' | 'discussionSeconds'>
}

/** Rollarni tasodifiy tarqatib, yangi oʻyin yaratadi. */
export function createMafiaSession({
  participants,
  roleCounts,
  settings,
}: CreateMafiaSessionInput): MafiaSession {
  const issues = validateRoleCounts(roleCounts, participants.length)
  if (issues.length > 0) {
    throw new Error(`Invalid mafia setup: ${issues.join(', ')}`)
  }

  const deck = shuffle(buildRoleDeck(roleCounts, participants.length))

  return {
    players: participants.map((participant, index) => ({
      id: participant.id,
      name: participant.name,
      role: deck[index] ?? 'civilian',
      alive: true,
    })),
    phase: 'reveal',
    cycle: 0,
    revealIndex: 0,
    nightStep: 0,
    night: EMPTY_NIGHT_ACTIONS,
    lastNight: null,
    lastEliminatedId: null,
    doctorLastTargetId: null,
    doctorSelfHealUsed: false,
    silencedId: null,
    winner: null,
    log: [],
    revealRoleOnDeath: settings.revealRoleOnDeath,
    discussionSeconds: settings.discussionSeconds,
  }
}

export function advanceReveal(session: MafiaSession): MafiaSession {
  return {
    ...session,
    revealIndex: Math.min(session.revealIndex + 1, session.players.length),
  }
}

export function startNight(session: MafiaSession): MafiaSession {
  return {
    ...session,
    phase: 'night',
    cycle: session.cycle + 1,
    nightStep: 0,
    night: EMPTY_NIGHT_ACTIONS,
    silencedId: null,
    lastEliminatedId: null,
  }
}

export function setNightTarget(
  session: MafiaSession,
  step: NightStepId,
  targetId: string | null,
): MafiaSession {
  return { ...session, night: { ...session.night, [step]: targetId } }
}

export function setNightStep(session: MafiaSession, stepIndex: number): MafiaSession {
  const lastIndex = Math.max(0, getNightSteps(session.players).length - 1)
  return { ...session, nightStep: Math.min(Math.max(0, stepIndex), lastIndex) }
}

/** Tunni yakunlaydi: oʻlimlarni qoʻllaydi, jurnalga yozadi va gʻolibni tekshiradi. */
export function completeNight(session: MafiaSession): MafiaSession {
  const { actions, report } = resolveNight(session)
  const killed = new Set(report.killedIds)
  const players = session.players.map((player) =>
    killed.has(player.id) ? { ...player, alive: false } : player,
  )
  const doctorId = session.players.find((player) => player.role === 'doctor')?.id

  return {
    ...session,
    players,
    phase: 'morning',
    lastNight: report,
    doctorLastTargetId: actions.doctor,
    doctorSelfHealUsed:
      session.doctorSelfHealUsed ||
      (actions.doctor !== null && actions.doctor === doctorId),
    silencedId: actions.lover && !killed.has(actions.lover) ? actions.lover : null,
    winner: getWinner(players),
    log: [
      ...session.log,
      {
        type: 'night',
        cycle: session.cycle,
        actions,
        killedIds: report.killedIds,
        savedIds: report.savedIds,
      },
    ],
  }
}

/** Ertalabki eʼlondan keyin: gʻolib boʻlsa — final, aks holda kunduzgi muhokama. */
export function startDay(session: MafiaSession): MafiaSession {
  return { ...session, phase: session.winner ? 'over' : 'day' }
}

export function startVoting(session: MafiaSession): MafiaSession {
  return { ...session, phase: 'voting' }
}

/** Ovoz berish natijasi: `null` — hech kim chiqarilmadi. */
export function eliminateByVote(
  session: MafiaSession,
  playerId: string | null,
): MafiaSession {
  const players = session.players.map((player) =>
    player.id === playerId && player.alive ? { ...player, alive: false } : player,
  )

  return {
    ...session,
    players,
    phase: 'verdict',
    lastEliminatedId: playerId,
    winner: getWinner(players),
    log: [...session.log, { type: 'vote', cycle: session.cycle, eliminatedId: playerId }],
  }
}

export function continueAfterVerdict(session: MafiaSession): MafiaSession {
  return session.winner ? { ...session, phase: 'over' } : startNight(session)
}
