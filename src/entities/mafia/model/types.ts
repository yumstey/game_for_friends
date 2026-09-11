import type { MafiaRoleId, NightStepId, SpecialRoleId } from '../config/roles'

export interface MafiaParticipant {
  id: string
  name: string
}

export interface MafiaPlayer extends MafiaParticipant {
  role: MafiaRoleId
  alive: boolean
}

export type RoleCounts = Record<SpecialRoleId, number>

export interface MafiaSettings {
  /** `true` — rollar oʻyinchilar soniga qarab avtomatik taqsimlanadi. */
  autoRoles: boolean
  /** Qoʻlda sozlangan taqsimot (`autoRoles` oʻchiq boʻlganda ishlatiladi). */
  roleCounts: RoleCounts
  /** Oʻlgan yoki chiqarilgan oʻyinchining roli hammaga eʼlon qilinsinmi. */
  revealRoleOnDeath: boolean
  discussionSeconds: number
}

/** Har bir tungi qadamda tanlangan nishon (`null` — tanlanmagan). */
export type NightActions = Record<NightStepId, string | null>

export interface NightReport {
  cycle: number
  killedIds: string[]
  savedIds: string[]
  blockedId: string | null
}

/**
 * reveal  — rollarni tarqatish
 * night   — tungi qadamlar (boshlovchi boshqaradi)
 * morning — tun natijalari eʼloni
 * day     — kunduzgi muhokama
 * voting  — ovoz berish
 * verdict — ovoz natijasi
 * over    — oʻyin tugadi
 */
export type MafiaPhase =
  'reveal' | 'night' | 'morning' | 'day' | 'voting' | 'verdict' | 'over'

export type MafiaWinner = 'town' | 'mafia' | 'maniac' | 'draw'

export type MafiaLogEntry =
  | {
      type: 'night'
      cycle: number
      actions: NightActions
      killedIds: string[]
      savedIds: string[]
    }
  | {
      type: 'vote'
      cycle: number
      eliminatedId: string | null
    }

export interface MafiaSession {
  players: MafiaPlayer[]
  phase: MafiaPhase
  /** Tun+kun sikli raqami (1-tun, 1-kun, 2-tun…). */
  cycle: number
  /** Rol tarqatishda nechanchi oʻyinchi; `players.length` — hammasi koʻrdi. */
  revealIndex: number
  nightStep: number
  night: NightActions
  lastNight: NightReport | null
  lastEliminatedId: string | null
  doctorLastTargetId: string | null
  doctorSelfHealUsed: boolean
  /** Maʼshuqa tanlagan oʻyinchi — kunduzi ovoz bera olmaydi. */
  silencedId: string | null
  winner: MafiaWinner | null
  log: MafiaLogEntry[]
  revealRoleOnDeath: boolean
  discussionSeconds: number
}
