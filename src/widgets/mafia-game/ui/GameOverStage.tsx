import { RefreshCw, Settings2 } from 'lucide-react'
import { useNavigate } from 'react-router'
import {
  GameLog,
  mafiaMessages,
  useMafiaStore,
  type MafiaSession,
  type MafiaWinner,
} from '@/entities/mafia'
import { useStartMafiaGame } from '@/features/mafia-start'
import { ROUTES } from '@/shared/config'
import { useTranslation } from '@/shared/i18n'
import { cn } from '@/shared/lib'
import { BottomBar, Button, Card, Section } from '@/shared/ui'
import { mafiaGameMessages } from './messages'
import { PlayerGrid } from './PlayerGrid'

const winnerStyles: Record<MafiaWinner, { emoji: string; className: string }> = {
  town: {
    emoji: '🏆',
    className: 'from-emerald-500 to-teal-700 shadow-emerald-600/25',
  },
  mafia: {
    emoji: '🎩',
    className: 'from-rose-600 to-zinc-900 shadow-rose-700/25',
  },
  maniac: {
    emoji: '🔪',
    className: 'from-violet-600 to-zinc-900 shadow-violet-700/25',
  },
  draw: {
    emoji: '🤝',
    className: 'from-slate-500 to-slate-800 shadow-slate-600/25',
  },
}

export function GameOverStage({ session }: { session: MafiaSession }) {
  const t = useTranslation(mafiaGameMessages).over
  const winners = useTranslation(mafiaMessages).winners
  const navigate = useNavigate()
  const endSession = useMafiaStore((state) => state.endSession)
  const { start, canStart } = useStartMafiaGame()

  const winner = session.winner ?? 'draw'
  const style = winnerStyles[winner]

  return (
    <>
      <div
        className={cn(
          'relative animate-pop-in overflow-hidden rounded-4xl bg-linear-to-br p-7 text-center text-white shadow-xl',
          style.className,
        )}
      >
        <div className="pointer-events-none absolute -top-14 -right-10 size-44 rounded-full bg-white/20 blur-3xl" />
        <span className="relative block animate-float text-7xl" aria-hidden>
          {style.emoji}
        </span>
        <h1 className="relative mt-3 font-display text-2xl font-bold tracking-tight">
          {winners[winner]}
        </h1>
      </div>

      <Section title={t.players}>
        <PlayerGrid players={session.players} showRoles />
      </Section>

      <Section title={t.log}>
        <Card className="pl-7">
          <GameLog log={session.log} players={session.players} />
        </Card>
      </Section>

      <BottomBar className="grid grid-cols-[auto_1fr]">
        <Button
          size="lg"
          variant="secondary"
          className="w-14 px-0"
          aria-label={t.settings}
          icon={<Settings2 />}
          onClick={() => {
            endSession()
            navigate(ROUTES.mafiaSetup)
          }}
        />
        <Button
          size="lg"
          variant="mafia"
          icon={<RefreshCw />}
          disabled={!canStart}
          onClick={() => start({ navigateToGame: false })}
        >
          {t.playAgain}
        </Button>
      </BottomBar>
    </>
  )
}
