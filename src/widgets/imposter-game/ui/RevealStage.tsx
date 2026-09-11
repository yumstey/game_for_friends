import { EyeOff, Fingerprint, MessagesSquare } from 'lucide-react'
import { useState } from 'react'
import { isImposter, useImposterStore, type ImposterSession } from '@/entities/imposter'
import { useLocalize, useTranslation } from '@/shared/i18n'
import { vibrate } from '@/shared/lib'
import { Avatar, BottomBar, Button, ProgressDots, RevealCard } from '@/shared/ui'
import { imposterGameMessages } from './messages'

/**
 * Hamma uchun BIR XIL koʻrinishdagi karta: rang, vibratsiya va tuzilma bir xil —
 * yonidagilar imposterni kartaning tashqi koʻrinishidan bilib qolmasligi uchun.
 */
const CARD_CLASS =
  'bg-linear-to-br from-violet-500 via-indigo-600 to-indigo-900 text-white shadow-indigo-600/30'

interface CardContentProps {
  label: string
  headline: string
  hint: string
  topicLabel: string
  topic: string
}

function CardContent({ label, headline, hint, topicLabel, topic }: CardContentProps) {
  return (
    <>
      <p className="text-xs font-semibold tracking-[0.2em] text-white/70 uppercase">
        {label}
      </p>
      <p className="font-display text-4xl leading-tight font-bold tracking-tight wrap-break-word">
        {headline}
      </p>
      <p className="max-w-64 text-sm text-white/75">{hint}</p>
      <div className="h-px w-24 bg-white/25" />
      <p className="text-xs font-semibold tracking-[0.2em] text-white/70 uppercase">
        {topicLabel}
      </p>
      <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-semibold">
        {topic}
      </span>
    </>
  )
}

export function RevealStage({ session }: { session: ImposterSession }) {
  const t = useTranslation(imposterGameMessages).reveal
  const localize = useLocalize()
  const revealNext = useImposterStore((state) => state.revealNext)
  const [revealed, setRevealed] = useState(false)

  const { round, revealIndex } = session
  const player = round.players[revealIndex]
  if (!player) return null

  const imposter = isImposter(round, player.id)
  const isLastPlayer = revealIndex === round.players.length - 1
  const topic = `${round.topic.emoji} ${localize(round.topic.name)}`

  return (
    <>
      <ProgressDots total={round.players.length} current={revealIndex} />

      <RevealCard
        // Har bir oʻyinchi uchun yangi karta — oldingi holat saqlanib qolmasin.
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
          imposter ? (
            <CardContent
              label={t.secretWord}
              headline={t.imposterWord}
              hint={t.imposterHint}
              topicLabel={t.topic}
              topic={round.showTopicToImposter ? topic : `🤫 ${t.topicHidden}`}
            />
          ) : (
            <CardContent
              label={t.secretWord}
              headline={localize(round.word)}
              hint={t.crewHint}
              topicLabel={t.topic}
              topic={topic}
            />
          )
        }
      />

      <BottomBar>
        <Button
          size="lg"
          fullWidth
          disabled={!revealed}
          icon={isLastPlayer ? <MessagesSquare /> : <EyeOff />}
          onClick={() => {
            setRevealed(false)
            revealNext()
          }}
        >
          {!revealed ? t.openFirst : isLastPlayer ? t.startDiscussion : t.hideAndPass}
        </Button>
      </BottomBar>
    </>
  )
}
