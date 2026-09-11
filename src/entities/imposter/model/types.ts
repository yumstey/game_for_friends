import type { LocalizedText } from '@/shared/i18n'

export interface ImposterParticipant {
  id: string
  name: string
}

export interface ImposterSettings {
  topicIds: string[]
  imposterCount: number
  /** Imposter kartasida mavzu koʻrsatilsinmi (yengillik). */
  showTopicToImposter: boolean
  /** Muhokama taymeri, soniyada. `0` — taymer oʻchiq. */
  discussionSeconds: number
}

export interface ImposterTopicSnapshot {
  id: string
  emoji: string
  name: LocalizedText
}

export type TurnDirection = 'clockwise' | 'counterclockwise'

export interface ImposterRound {
  number: number
  /** Telefon uzatiladigan tartib (roʻyxatdagi tartib). */
  players: ImposterParticipant[]
  imposterIds: string[]
  word: LocalizedText
  wordKey: string
  topic: ImposterTopicSnapshot
  /** Muhokamani kim boshlaydi — tasodifiy. */
  starterId: string
  /** Navbat yoʻnalishi — tasodifiy. */
  direction: TurnDirection
  showTopicToImposter: boolean
  discussionSeconds: number
}

/**
 * reveal     — har kim oʻz kartasini koʻradi
 * discussion — ishoralar, muhokama va imposterni ogʻzaki tanlash
 * result     — imposter(lar) va yashirin soʻz ochiladi
 */
export type ImposterPhase = 'reveal' | 'discussion' | 'result'

export interface ImposterSession {
  round: ImposterRound
  phase: ImposterPhase
  revealIndex: number
}
