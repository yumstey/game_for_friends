import { isMafiaTeam } from '../config/roles'
import type { MafiaPlayer, MafiaWinner } from './types'

/**
 * Gʻolibni aniqlaydi (`null` — oʻyin davom etadi).
 *
 * 1. Hech kim tirik emas → durang.
 * 2. Mafiya ham, manyak ham qolmadi → tinch aholi.
 * 3. Manyak yoʻq va mafiya soni ≥ tinch aholi soni → mafiya.
 * 4. Mafiya yoʻq, manyak tirik va tinch aholidan ≤ 1 kishi qoldi → manyak.
 * 5. Faqat manyak va mafiya qoldi: mafiya ≥ 2 → mafiya (ovozda ustun), aks holda durang.
 */
export function getWinner(players: readonly MafiaPlayer[]): MafiaWinner | null {
  const alive = players.filter((player) => player.alive)
  if (alive.length === 0) return 'draw'

  const mafia = alive.filter((player) => isMafiaTeam(player.role)).length
  const maniac = alive.some((player) => player.role === 'maniac')
  const town = alive.length - mafia - (maniac ? 1 : 0)

  if (mafia === 0 && !maniac) return 'town'
  if (!maniac && mafia >= town) return 'mafia'
  if (mafia === 0 && maniac && town <= 1) return 'maniac'
  if (maniac && mafia > 0 && town === 0) return mafia >= 2 ? 'mafia' : 'draw'

  return null
}
