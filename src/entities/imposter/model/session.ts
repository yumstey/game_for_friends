import type { LocalizedText } from '@/shared/i18n'
import { coinFlip, pickRandom, sample } from '@/shared/lib'
import { IMPOSTER_MIN_PLAYERS, getMaxImposters } from '../config/rules'
import type {
  ImposterParticipant,
  ImposterRound,
  ImposterSession,
  ImposterTopicSnapshot,
} from './types'

export interface CreateRoundInput {
  number: number
  players: readonly ImposterParticipant[]
  imposterCount: number
  word: LocalizedText
  wordKey: string
  topic: ImposterTopicSnapshot
  showTopicToImposter: boolean
  discussionSeconds: number
}

/** Yangi raund: imposter(lar), boshlovchi va yoʻnalish — hammasi tasodifiy. */
export function createRound(input: CreateRoundInput): ImposterRound {
  const { players, imposterCount } = input

  if (players.length < IMPOSTER_MIN_PLAYERS) {
    throw new RangeError(`Imposter needs at least ${IMPOSTER_MIN_PLAYERS} players`)
  }
  if (imposterCount < 1 || imposterCount > getMaxImposters(players.length)) {
    throw new RangeError(`Invalid imposter count: ${imposterCount}`)
  }

  return {
    ...input,
    players: [...players],
    imposterIds: sample(players, imposterCount).map((player) => player.id),
    starterId: pickRandom(players).id,
    direction: coinFlip() ? 'clockwise' : 'counterclockwise',
  }
}

export function createSession(round: ImposterRound): ImposterSession {
  return { round, phase: 'reveal', revealIndex: 0 }
}

export function isImposter(round: ImposterRound, playerId: string): boolean {
  return round.imposterIds.includes(playerId)
}

/** Keyingi oʻyinchiga karta uzatish; oxirgisidan keyin muhokama boshlanadi. */
export function advanceReveal(session: ImposterSession): ImposterSession {
  const nextIndex = session.revealIndex + 1

  return nextIndex >= session.round.players.length
    ? { ...session, phase: 'discussion' }
    : { ...session, revealIndex: nextIndex }
}

/** Muhokamadan soʻng imposter(lar)ni hammaga ochish. */
export function revealImposters(session: ImposterSession): ImposterSession {
  return { ...session, phase: 'result' }
}
