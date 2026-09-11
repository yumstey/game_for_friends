import {
  MAFIA_MIN_PLAYERS,
  MAFIA_ROLES,
  SPECIAL_ROLE_IDS,
  type MafiaRoleId,
  type SpecialRoleId,
} from '../config/roles'
import type { MafiaSettings, RoleCounts } from './types'

export type RoleSetupIssue =
  | 'not-enough-players'
  | 'no-mafia'
  | 'too-many-roles'
  | 'mafia-majority'
  | 'unique-role-exceeded'

/**
 * Oʻyinchilar soniga qarab tavsiya etilgan taqsimot:
 * - mafiya jamoasi ≈ har 3 kishiga 1 (kamida 1), 7+ da ulardan biri Don;
 * - Doktor 4+, Komissar 5+, Maʼshuqa 9+, Manyak 10+ oʻyinchida.
 */
export function recommendRoleCounts(playerCount: number): RoleCounts {
  const mafiaTeam = Math.max(1, Math.floor(playerCount / 3))
  const don = playerCount >= 7 ? 1 : 0

  return {
    mafia: mafiaTeam - don,
    don,
    detective: playerCount >= 5 ? 1 : 0,
    doctor: playerCount >= MAFIA_MIN_PLAYERS ? 1 : 0,
    lover: playerCount >= 9 ? 1 : 0,
    maniac: playerCount >= 10 ? 1 : 0,
  }
}

/** Sozlamalarga koʻra amaldagi taqsimot: avtomatik yoki qoʻlda kiritilgan. */
export function getEffectiveRoleCounts(
  settings: Pick<MafiaSettings, 'autoRoles' | 'roleCounts'>,
  playerCount: number,
): RoleCounts {
  return settings.autoRoles ? recommendRoleCounts(playerCount) : settings.roleCounts
}

export function countSpecialRoles(counts: RoleCounts): number {
  return SPECIAL_ROLE_IDS.reduce((sum, role) => sum + counts[role], 0)
}

export function countMafiaTeam(counts: RoleCounts): number {
  return counts.mafia + counts.don
}

export function countCivilians(counts: RoleCounts, playerCount: number): number {
  return Math.max(0, playerCount - countSpecialRoles(counts))
}

/** Bitta rol uchun ruxsat etilgan maksimal son. */
export function getRoleLimit(role: SpecialRoleId, playerCount: number): number {
  if (MAFIA_ROLES[role].unique) return 1
  return Math.max(1, Math.floor((playerCount - 1) / 2))
}

export function validateRoleCounts(
  counts: RoleCounts,
  playerCount: number,
): RoleSetupIssue[] {
  const issues: RoleSetupIssue[] = []
  const mafiaTeam = countMafiaTeam(counts)

  if (playerCount < MAFIA_MIN_PLAYERS) issues.push('not-enough-players')
  if (mafiaTeam < 1) issues.push('no-mafia')
  if (countSpecialRoles(counts) > playerCount) issues.push('too-many-roles')
  if (mafiaTeam > 0 && mafiaTeam * 2 >= playerCount) issues.push('mafia-majority')
  if (SPECIAL_ROLE_IDS.some((role) => MAFIA_ROLES[role].unique && counts[role] > 1)) {
    issues.push('unique-role-exceeded')
  }

  return issues
}

/** Rollar "koloda"si: maxsus rollar + qolgan oʻrinlarga tinch aholi. Aralashtirilmagan. */
export function buildRoleDeck(counts: RoleCounts, playerCount: number): MafiaRoleId[] {
  const deck: MafiaRoleId[] = SPECIAL_ROLE_IDS.flatMap((role) =>
    Array.from({ length: counts[role] }, () => role),
  )

  while (deck.length < playerCount) deck.push('civilian')

  return deck.slice(0, playerCount)
}
