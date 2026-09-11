import { CheckCircle2, EyeOff, Fingerprint, Moon } from 'lucide-react'
import { useState } from 'react'
import {
  MAFIA_ROLES,
  isMafiaTeam,
  mafiaMessages,
  useMafiaStore,
  type MafiaSession,
} from '@/entities/mafia'
import { useTranslation } from '@/shared/i18n'
import { vibrate } from '@/shared/lib'
import { Avatar, BottomBar, Button, Card, ProgressDots, RevealCard } from '@/shared/ui'
import { mafiaGameMessages } from './messages'

/**
 * Barcha rollar uchun BIR XIL rangdagi karta — bitta telefonda oʻynaganda
 * yonidagilar jamoani kartaning rangidan bilib qolmasligi uchun.
 */
const CARD_CLASS =
  'bg-linear-to-br from-slate-700 via-slate-800 to-zinc-950 text-white shadow-black/30'

export function RevealStage({ session }: { session: MafiaSession }) {
  const t = useTranslation(mafiaGameMessages).reveal
  const roleTexts = useTranslation(mafiaMessages)
  const { revealNext, startNight } = useMafiaStore.getState()
  const [revealed, setRevealed] = useState(false)

  const { players, revealIndex } = session
  const player = players[revealIndex]

  if (!player) {
    return (
      <>
        <Card className="flex animate-pop-in flex-col items-center gap-3 py-10 text-center">
          <CheckCircle2 className="size-14 text-emerald-500" />
          <h1 className="font-display text-2xl font-semibold tracking-tight">{t.allDone}</h1>
          <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
            {t.allDoneHint}
          </p>
        </Card>
        <BottomBar>
          <Button size="lg" variant="mafia" fullWidth icon={<Moon />} onClick={startNight}>
            {t.startNight}
          </Button>
        </BottomBar>
      </>
    )
  }

  const role = MAFIA_ROLES[player.role]
  const partners = isMafiaTeam(player.role)
    ? players.filter((other) => other.id !== player.id && isMafiaTeam(other.role))
    : []

  return (
    <>
      <ProgressDots total={players.length} current={revealIndex} />

      <RevealCard
        key={player.id}
        revealed={revealed}
        frontLabel={t.tapToReveal}
        onReveal={() => {
          vibrate(40)
          setRevealed(true)
        }}
        backClassName={CARD_CLASS}
        front={
          <>
            <Avatar name={player.name} size="xl" className="animate-pop-in" />
            <div>
              <p className="text-sm font-medium text-muted-foreground">{t.takePhone}</p>
              <p className="mt-1 font-display text-3xl font-semibold tracking-tight">
                {player.name}
              </p>
            </div>
            <span className="mt-4 flex animate-pulse items-center gap-2 rounded-full bg-muted px-4 py-2 text-sm font-semibold text-muted-foreground">
              <Fingerprint className="size-5" />
              {t.tapToReveal}
            </span>
          </>
        }
        back={
          <>
            <span className="animate-float text-7xl" aria-hidden>
              {role.emoji}
            </span>
            <div>
              <p className="font-display text-3xl font-bold tracking-tight">
                {roleTexts.roles[player.role].name}
              </p>
              <span className="mt-2 inline-block rounded-full bg-white/15 px-3 py-1 text-xs font-semibold">
                {roleTexts.teams[role.team]}
              </span>
            </div>
            <p className="max-w-72 text-sm leading-relaxed text-white/85">
              {roleTexts.roles[player.role].description}
            </p>
            <p className="max-w-72 text-sm text-white/85">
              <span className="font-semibold text-white">{t.goal}:</span>{' '}
              {roleTexts.roles[player.role].goal}
            </p>
            {partners.length > 0 && (
              <div className="flex flex-col items-center gap-2">
                <p className="text-xs font-semibold tracking-[0.2em] text-white/70 uppercase">
                  {t.partners}
                </p>
                <div className="flex flex-wrap justify-center gap-2">
                  {partners.map((partner) => (
                    <span
                      key={partner.id}
                      className="rounded-full bg-white/15 px-3 py-1 text-sm font-semibold"
                    >
                      {MAFIA_ROLES[partner.role].emoji} {partner.name}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </>
        }
      />

      <BottomBar>
        <Button
          size="lg"
          fullWidth
          disabled={!revealed}
          icon={<EyeOff />}
          onClick={() => {
            setRevealed(false)
            revealNext()
          }}
        >
          {revealed ? t.hideAndPass : t.openFirst}
        </Button>
      </BottomBar>
    </>
  )
}
