import { Play } from 'lucide-react'
import { IMPOSTER_MIN_PLAYERS } from '@/entities/imposter'
import { defineMessages, useTranslation } from '@/shared/i18n'
import { Button } from '@/shared/ui'
import {
  useStartImposterRound,
  type ImposterStartIssue,
} from '../model/use-start-imposter-round'

const messages = defineMessages<{
  start: string
  issues: Record<ImposterStartIssue, string>
}>({
  uz: {
    start: 'Oʻyinni boshlash',
    issues: {
      'not-enough-players': `Kamida ${IMPOSTER_MIN_PLAYERS} ta oʻyinchi kerak`,
      'invalid-names': 'Ismlarni tekshiring: boʻsh yoki takroriy ism bor',
      'no-topics': 'Kamida bitta mavzu tanlang',
    },
  },
  en: {
    start: 'Start game',
    issues: {
      'not-enough-players': `At least ${IMPOSTER_MIN_PLAYERS} players are required`,
      'invalid-names': 'Check the names: some are empty or duplicated',
      'no-topics': 'Select at least one topic',
    },
  },
})

export function StartImposterButton() {
  const t = useTranslation(messages)
  const { start, issues, canStart } = useStartImposterRound()
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
        variant="danger"
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
