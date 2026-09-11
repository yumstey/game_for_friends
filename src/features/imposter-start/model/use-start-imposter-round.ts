import { useNavigate } from 'react-router'
import {
  IMPOSTER_MIN_PLAYERS,
  createRound,
  getMaxImposters,
  useImposterStore,
} from '@/entities/imposter'
import { findNameIssues, useRosterStore, type Player } from '@/entities/player'
import { isTopicId, pickRandomWord } from '@/entities/topic'
import { ROUTES } from '@/shared/config'
import { vibrate } from '@/shared/lib'

export type ImposterStartIssue = 'not-enough-players' | 'invalid-names' | 'no-topics'

export function getImposterStartIssues(
  players: readonly Player[],
  topicIds: readonly string[],
): ImposterStartIssue[] {
  const issues: ImposterStartIssue[] = []

  if (players.length < IMPOSTER_MIN_PLAYERS) issues.push('not-enough-players')
  if (findNameIssues(players).size > 0) issues.push('invalid-names')
  if (!topicIds.some(isTopicId)) issues.push('no-topics')

  return issues
}

interface StartOptions {
  /** `false` — oʻyin sahifasining oʻzida yangi raund boshlanganda. */
  navigateToGame?: boolean
}

/** Yangi Imposter raundini tayyorlaydi: tasodifiy soʻz, imposter(lar), boshlovchi. */
export function useStartImposterRound() {
  const navigate = useNavigate()
  const players = useRosterStore((state) => state.players)
  const topicIds = useImposterStore((state) => state.settings.topicIds)

  const issues = getImposterStartIssues(players, topicIds)

  const start = ({ navigateToGame = true }: StartOptions = {}) => {
    if (issues.length > 0) return

    const { settings, session, usedWordKeys, startRound } = useImposterStore.getState()
    const picked = pickRandomWord(settings.topicIds.filter(isTopicId), usedWordKeys)

    const round = createRound({
      number: (session?.round.number ?? 0) + 1,
      players: players.map(({ id, name }) => ({ id, name: name.trim() })),
      imposterCount: Math.min(settings.imposterCount, getMaxImposters(players.length)),
      word: picked.word,
      wordKey: picked.key,
      topic: { id: picked.topic.id, emoji: picked.topic.emoji, name: picked.topic.name },
      showTopicToImposter: settings.showTopicToImposter,
      discussionSeconds: settings.discussionSeconds,
    })

    startRound(round, { resetWordHistory: picked.historyExhausted })
    vibrate(30)

    if (navigateToGame) navigate(ROUTES.imposterGame)
  }

  return { start, issues, canStart: issues.length === 0 }
}
