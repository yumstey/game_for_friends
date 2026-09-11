import { Eye, EyeOff, Gavel, MicOff } from 'lucide-react'
import { useState } from 'react'
import { RoleBadge, useMafiaStore, type MafiaSession } from '@/entities/mafia'
import { defineMessages, useTranslation } from '@/shared/i18n'
import { vibrate } from '@/shared/lib'
import { Avatar, BottomBar, Button, Callout, ChoiceCard, IconButton } from '@/shared/ui'

const messages = defineMessages({
  uz: {
    title: (day: number) => `${day}-kun: ovoz berish`,
    hint: 'Koʻpchilik ovozi bilan kim shahardan chiqarilishini tanlang',
    silenced: (name: string) => `${name} bugun ovoz bera olmaydi (Maʼshuqa band qilgan)`,
    showRoles: 'Rollarni koʻrsatish',
    hideRoles: 'Rollarni yashirish',
    eliminate: (name: string) => `Chiqarish: ${name}`,
    choose: 'Oʻyinchini tanlang',
    nobody: 'Hech kim chiqarilmaydi',
  },
  en: {
    title: (day: number) => `Day ${day}: voting`,
    hint: 'Pick who leaves the town by majority vote',
    silenced: (name: string) => `${name} cannot vote today (distracted by the Lover)`,
    showRoles: 'Show roles',
    hideRoles: 'Hide roles',
    eliminate: (name: string) => `Eliminate ${name}`,
    choose: 'Choose a player',
    nobody: 'Nobody is eliminated',
  },
})

export function VotePanel({ session }: { session: MafiaSession }) {
  const t = useTranslation(messages)
  const vote = useMafiaStore((state) => state.vote)
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [showRoles, setShowRoles] = useState(false)

  const alivePlayers = session.players.filter((player) => player.alive)
  const selected = alivePlayers.find((player) => player.id === selectedId)
  const silenced = alivePlayers.find((player) => player.id === session.silencedId)

  return (
    <>
      <div className="flex items-start gap-3">
        <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-amber-500/15 text-amber-600 dark:text-amber-400">
          <Gavel className="size-6" />
        </span>
        <div className="min-w-0 flex-1">
          <h1 className="font-display text-xl font-semibold tracking-tight">
            {t.title(session.cycle)}
          </h1>
          <p className="text-sm text-muted-foreground">{t.hint}</p>
        </div>
        <IconButton
          variant="outline"
          label={showRoles ? t.hideRoles : t.showRoles}
          icon={showRoles ? <EyeOff /> : <Eye />}
          onClick={() => setShowRoles((value) => !value)}
        />
      </div>

      {silenced && (
        <Callout tone="warning" icon={<MicOff />}>
          {t.silenced(silenced.name)}
        </Callout>
      )}

      <div className="grid grid-cols-2 gap-2.5">
        {alivePlayers.map((player) => (
          <ChoiceCard
            key={player.id}
            tone="mafia"
            selected={player.id === selectedId}
            onClick={() => {
              vibrate(10)
              setSelectedId((current) => (current === player.id ? null : player.id))
            }}
            className="flex-col items-start gap-1.5"
          >
            <span className="flex w-full min-w-0 items-center gap-2">
              <Avatar name={player.name} size="xs" />
              <span className="truncate text-sm font-semibold">{player.name}</span>
            </span>
            {showRoles && <RoleBadge role={player.role} className="text-[11px]" />}
          </ChoiceCard>
        ))}
      </div>

      <BottomBar>
        <Button
          size="lg"
          variant="mafia"
          fullWidth
          disabled={!selected}
          onClick={() => selected && vote(selected.id)}
        >
          {selected ? t.eliminate(selected.name) : t.choose}
        </Button>
        <Button variant="ghost" fullWidth onClick={() => vote(null)}>
          {t.nobody}
        </Button>
      </BottomBar>
    </>
  )
}
