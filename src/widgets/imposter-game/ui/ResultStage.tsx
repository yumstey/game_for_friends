import { Settings2, Shuffle } from 'lucide-react'
import { useNavigate } from 'react-router'
import type { ImposterSession } from '@/entities/imposter'
import { useStartImposterRound } from '@/features/imposter-start'
import { ROUTES } from '@/shared/config'
import { useLocalize, useTranslation } from '@/shared/i18n'
import { Avatar, BottomBar, Button, Card } from '@/shared/ui'
import { imposterGameMessages } from './messages'

/** Imposter(lar) va yashirin soʻz hammaga ochiladi. */
export function ResultStage({ session }: { session: ImposterSession }) {
  const t = useTranslation(imposterGameMessages).result
  const localize = useLocalize()
  const navigate = useNavigate()
  const { start, canStart } = useStartImposterRound()

  const { round } = session
  const imposters = round.players.filter((player) => round.imposterIds.includes(player.id))

  return (
    <>
      <div className="relative animate-pop-in overflow-hidden rounded-4xl bg-linear-to-br from-rose-500 via-red-600 to-rose-900 p-6 text-center text-white shadow-xl shadow-rose-600/25">
        <div className="pointer-events-none absolute -top-12 -left-10 size-40 rounded-full bg-white/20 blur-3xl" />
        <span className="relative block animate-float text-6xl" aria-hidden>
          🕵️
        </span>
        <p className="relative mt-3 text-xs font-semibold tracking-[0.2em] text-white/75 uppercase">
          {t.imposterWas(imposters.length)}
        </p>
        <div className="relative mt-3 flex flex-col items-center gap-3">
          {imposters.map((player) => (
            <span key={player.id} className="flex items-center gap-3">
              <Avatar name={player.name} size="lg" className="ring-4 ring-white/30" />
              <span className="font-display text-3xl font-bold tracking-tight">
                {player.name}
              </span>
            </span>
          ))}
        </div>
      </div>

      <Card className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
            {t.word}
          </p>
          <p className="mt-1 font-display text-xl font-semibold wrap-break-word">
            {localize(round.word)}
          </p>
        </div>
        <div>
          <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
            {t.topic}
          </p>
          <p className="mt-1 font-semibold">
            {round.topic.emoji} {localize(round.topic.name)}
          </p>
        </div>
      </Card>

      <BottomBar className="grid grid-cols-[auto_1fr]">
        <Button
          size="lg"
          variant="secondary"
          className="w-14 px-0"
          aria-label={t.settings}
          icon={<Settings2 />}
          onClick={() => navigate(ROUTES.imposterSetup)}
        />
        <Button
          size="lg"
          variant="danger"
          icon={<Shuffle />}
          disabled={!canStart}
          onClick={() => start({ navigateToGame: false })}
        >
          {t.nextRound}
        </Button>
      </BottomBar>
    </>
  )
}
