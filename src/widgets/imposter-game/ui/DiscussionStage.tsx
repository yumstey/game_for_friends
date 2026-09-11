import { Lightbulb, VenetianMask } from 'lucide-react'
import { useState } from 'react'
import { useImposterStore, type ImposterSession } from '@/entities/imposter'
import { useLocalize, useTranslation } from '@/shared/i18n'
import { vibrate } from '@/shared/lib'
import {
  Avatar,
  Badge,
  BottomBar,
  Button,
  Card,
  ConfirmDialog,
  CountdownTimer,
} from '@/shared/ui'
import { imposterGameMessages } from './messages'

export function DiscussionStage({ session }: { session: ImposterSession }) {
  const t = useTranslation(imposterGameMessages).discussion
  const localize = useLocalize()
  const revealImposters = useImposterStore((state) => state.revealImposters)
  const [isConfirmOpen, setIsConfirmOpen] = useState(false)

  const { round } = session
  const starter = round.players.find((player) => player.id === round.starterId)
  const imposterCount = round.imposterIds.length

  return (
    <>
      <Card className="flex animate-fade-up flex-col items-center gap-3 py-6 text-center">
        <p className="text-xs font-semibold tracking-[0.2em] text-muted-foreground uppercase">
          {t.starts}
        </p>
        {starter && (
          <>
            <Avatar name={starter.name} size="lg" className="animate-pop-in" />
            <p className="font-display text-2xl font-semibold tracking-tight">
              {starter.name}
            </p>
          </>
        )}
        <Badge tone="primary" className="px-3 py-1 text-sm">
          {t.directions[round.direction]}
        </Badge>
      </Card>

      <Card className="flex items-center gap-3">
        <span className="flex size-12 items-center justify-center rounded-2xl bg-muted text-2xl">
          {round.showTopicToImposter ? round.topic.emoji : '🤫'}
        </span>
        <div>
          <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
            {t.topic}
          </p>
          <p className="font-display text-lg font-semibold">
            {round.showTopicToImposter ? localize(round.topic.name) : t.topicSecret}
          </p>
        </div>
      </Card>

      {round.discussionSeconds > 0 && (
        <Card className="py-6">
          <CountdownTimer durationSeconds={round.discussionSeconds} />
        </Card>
      )}

      <Card className="flex flex-col gap-3">
        <p className="flex items-center gap-2 font-display text-sm font-semibold">
          <Lightbulb className="size-4 text-amber-500" />
          {t.tipsTitle}
        </p>
        <ol className="flex flex-col gap-2">
          {t.tips.map((tip, index) => (
            <li
              key={tip}
              className="flex gap-3 text-sm leading-snug text-muted-foreground"
            >
              <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-muted font-display text-xs font-semibold text-foreground">
                {index + 1}
              </span>
              {tip}
            </li>
          ))}
        </ol>
      </Card>

      <BottomBar>
        <Button
          size="lg"
          variant="danger"
          fullWidth
          icon={<VenetianMask />}
          onClick={() => setIsConfirmOpen(true)}
        >
          {t.revealImposter(imposterCount)}
        </Button>
      </BottomBar>

      <ConfirmDialog
        open={isConfirmOpen}
        tone="danger"
        title={t.confirmTitle(imposterCount)}
        description={t.confirmDescription}
        confirmLabel={t.confirm}
        onCancel={() => setIsConfirmOpen(false)}
        onConfirm={() => {
          setIsConfirmOpen(false)
          vibrate([80, 60, 120])
          revealImposters()
        }}
      />
    </>
  )
}
