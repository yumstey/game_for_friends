import { useNavigate } from 'react-router'
import {
  createMafiaSession,
  getEffectiveRoleCounts,
  useMafiaStore,
  validateRoleCounts,
  type RoleSetupIssue,
} from '@/entities/mafia'
import { findNameIssues, useRosterStore } from '@/entities/player'
import { ROUTES } from '@/shared/config'
import { vibrate } from '@/shared/lib'

export type MafiaStartIssue = RoleSetupIssue | 'invalid-names'

/** Rollarni tasodifiy tarqatib, Mafia oʻyinini boshlaydi. */
export function useStartMafiaGame() {
  const navigate = useNavigate()
  const players = useRosterStore((state) => state.players)
  const settings = useMafiaStore((state) => state.settings)

  const roleCounts = getEffectiveRoleCounts(settings, players.length)
  const issues: MafiaStartIssue[] = [
    ...validateRoleCounts(roleCounts, players.length),
    ...(findNameIssues(players).size > 0 ? (['invalid-names'] as const) : []),
  ]

  const start = ({ navigateToGame = true }: { navigateToGame?: boolean } = {}) => {
    if (issues.length > 0) return

    const session = createMafiaSession({
      participants: players.map(({ id, name }) => ({ id, name: name.trim() })),
      roleCounts,
      settings,
    })

    useMafiaStore.getState().startGame(session)
    vibrate(30)

    if (navigateToGame) navigate(ROUTES.mafiaGame)
  }

  return { start, issues, canStart: issues.length === 0 }
}
