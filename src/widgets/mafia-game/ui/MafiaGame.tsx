import type { MafiaSession } from '@/entities/mafia'
import { VotePanel } from '@/features/mafia-vote'
import { useTranslation } from '@/shared/i18n'
import { DayStage, MorningStage, NightStage, VerdictStage } from './CycleStages'
import { GameOverStage } from './GameOverStage'
import { mafiaGameMessages } from './messages'
import { RevealStage } from './RevealStage'

/** Mafia oʻyinining joriy fazasiga mos ekran. */
export function MafiaGame({ session }: { session: MafiaSession }) {
  switch (session.phase) {
    case 'reveal':
      return <RevealStage session={session} />
    case 'night':
      return <NightStage session={session} />
    case 'morning':
      return <MorningStage session={session} />
    case 'day':
      return <DayStage session={session} />
    case 'voting':
      return <VotePanel session={session} />
    case 'verdict':
      return <VerdictStage session={session} />
    case 'over':
      return <GameOverStage session={session} />
  }
}

/** Sarlavha osti matni: "2-tun · Tirik: 5/7". */
export function MafiaPhaseLabel({ session }: { session: MafiaSession }) {
  const t = useTranslation(mafiaGameMessages)
  const alive = session.players.filter((player) => player.alive).length

  return (
    <>
      {t.phaseLabel(session.phase, session.cycle)}
      {session.phase !== 'reveal' && ` · ${t.aliveCount(alive, session.players.length)}`}
    </>
  )
}
