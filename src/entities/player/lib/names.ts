import { DEFAULT_PLAYER_NAMES } from '../config/defaults'
import type { Player, PlayerNameIssue } from '../model/types'

const normalize = (name: string) => name.trim().toLocaleLowerCase()

/**
 * Yangi oʻyinchi uchun ism taklif qiladi:
 * avval ishlatilmagan standart ismlardan, ular tugasa — `formatFallback(n)` ("Oʻyinchi 8").
 */
export function suggestPlayerName(
  existingNames: readonly string[],
  formatFallback: (index: number) => string,
): string {
  const taken = new Set(existingNames.map(normalize))
  const freeDefault = DEFAULT_PLAYER_NAMES.find((name) => !taken.has(normalize(name)))
  if (freeDefault) return freeDefault

  let index = existingNames.length + 1
  while (taken.has(normalize(formatFallback(index)))) index++
  return formatFallback(index)
}

/** Har bir oʻyinchi uchun ism muammosi (boʻsh yoki takroriy). Muammosizlar kiritilmaydi. */
export function findNameIssues(players: readonly Player[]): Map<string, PlayerNameIssue> {
  const issues = new Map<string, PlayerNameIssue>()
  const counts = new Map<string, number>()

  for (const player of players) {
    const key = normalize(player.name)
    if (key) counts.set(key, (counts.get(key) ?? 0) + 1)
  }

  for (const player of players) {
    const key = normalize(player.name)
    if (!key) issues.set(player.id, 'empty')
    else if ((counts.get(key) ?? 0) > 1) issues.set(player.id, 'duplicate')
  }

  return issues
}
