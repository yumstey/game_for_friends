export const MAFIA_ROLE_IDS = [
  'civilian',
  'mafia',
  'don',
  'detective',
  'doctor',
  'lover',
  'maniac',
] as const

export type MafiaRoleId = (typeof MAFIA_ROLE_IDS)[number]

/** Soni qoʻlda sozlanadigan rollar. Tinch aholi soni qolgan oʻrinlardan hisoblanadi. */
export type SpecialRoleId = Exclude<MafiaRoleId, 'civilian'>

export type MafiaTeam = 'town' | 'mafia' | 'solo'

export interface MafiaRoleDefinition {
  id: MafiaRoleId
  team: MafiaTeam
  emoji: string
  /** Oʻyinda faqat bittadan boʻlishi mumkinmi. */
  unique: boolean
}

export const MAFIA_ROLES: Readonly<Record<MafiaRoleId, MafiaRoleDefinition>> = {
  civilian: { id: 'civilian', team: 'town', emoji: '🙂', unique: false },
  mafia: { id: 'mafia', team: 'mafia', emoji: '🔫', unique: false },
  don: { id: 'don', team: 'mafia', emoji: '🎩', unique: true },
  detective: { id: 'detective', team: 'town', emoji: '🕵️', unique: true },
  doctor: { id: 'doctor', team: 'town', emoji: '💉', unique: true },
  lover: { id: 'lover', team: 'town', emoji: '💋', unique: true },
  maniac: { id: 'maniac', team: 'solo', emoji: '🔪', unique: true },
}

export const SPECIAL_ROLE_IDS: readonly SpecialRoleId[] = [
  'mafia',
  'don',
  'detective',
  'doctor',
  'lover',
  'maniac',
]

/** Tungi qadamlar: kim qaysi tartibda uygʻonadi. `mafia` — butun mafiya jamoasi. */
export const NIGHT_STEP_IDS = ['lover', 'mafia', 'don', 'detective', 'doctor', 'maniac'] as const

export type NightStepId = (typeof NIGHT_STEP_IDS)[number]

export const MAFIA_MIN_PLAYERS = 4

export const MAFIA_DISCUSSION_PRESETS_SECONDS = [0, 60, 120, 180, 300] as const

export function isMafiaTeam(role: MafiaRoleId): boolean {
  return MAFIA_ROLES[role].team === 'mafia'
}
