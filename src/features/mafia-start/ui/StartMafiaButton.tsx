import { Play } from 'lucide-react'
import { MAFIA_MIN_PLAYERS } from '@/entities/mafia'
import { defineMessages, useTranslation } from '@/shared/i18n'
import { Button } from '@/shared/ui'
import { useStartMafiaGame, type MafiaStartIssue } from '../model/use-start-mafia-game'

const messages = defineMessages<{ start: string; issues: Record<MafiaStartIssue, string> }>({
  uz: {
    start: 'Rollarni tarqatish',
    issues: {
      'not-enough-players': `Kamida ${MAFIA_MIN_PLAYERS} ta oʻyinchi kerak`,
      'no-mafia': 'Kamida bitta mafiya boʻlishi shart',
      'too-many-roles': 'Maxsus rollar oʻyinchilar sonidan koʻp',
      'mafia-majority': 'Mafiya tinch aholidan kam boʻlishi kerak',
      'unique-role-exceeded': 'Bu rollar faqat bittadan boʻladi',
      'invalid-names': 'Ismlarni tekshiring: boʻsh yoki takroriy ism bor',
    },
  },
  en: {
    start: 'Deal the roles',
    issues: {
      'not-enough-players': `At least ${MAFIA_MIN_PLAYERS} players are required`,
      'no-mafia': 'There must be at least one mafia member',
      'too-many-roles': 'There are more special roles than players',
      'mafia-majority': 'The mafia must be outnumbered by the town',
      'unique-role-exceeded': 'Only one of each special role is allowed',
      'invalid-names': 'Check the names: some are empty or duplicated',
    },
  },
})

export function StartMafiaButton() {
  const t = useTranslation(messages)
  const { start, issues, canStart } = useStartMafiaGame()
  const firstIssue = issues[0]

  return (
    <>
      {firstIssue && (
        <p role="status" className="text-center text-sm font-medium text-rose-500">
          {t.issues[firstIssue]}
        </p>
      )}
      <Button
        size="lg"
        variant="mafia"
        fullWidth
        icon={<Play className="fill-current" />}
        disabled={!canStart}
        onClick={() => start()}
      >
        {t.start}
      </Button>
    </>
  )
}
