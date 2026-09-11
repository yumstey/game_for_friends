import { EyeOff, Moon, ShieldCheck, Sparkles, Trophy, UserX, Vote } from 'lucide-react'
import { useState } from 'react'
import { RoleBadge, useMafiaStore, type MafiaSession } from '@/entities/mafia'
import { NightWizard } from '@/features/mafia-night'
import { useTranslation } from '@/shared/i18n'
import {
  Avatar,
  BottomBar,
  Button,
  Callout,
  Card,
  CountdownTimer,
  IconButton,
  Section,
} from '@/shared/ui'
import { mafiaGameMessages } from './messages'
import { PlayerGrid } from './PlayerGrid'

export function NightStage({ session }: { session: MafiaSession }) {
  const t = useTranslation(mafiaGameMessages).night

  return (
    <>
      <div className="flex items-center gap-3">
        <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-indigo-500/15 text-indigo-500">
          <Moon className="size-6 fill-current" />
        </span>
        <div>
          <h1 className="font-display text-xl font-semibold tracking-tight">
            {t.title(session.cycle)}
          </h1>
          <p className="text-sm leading-snug text-muted-foreground">{t.hint}</p>
        </div>
      </div>
      <NightWizard session={session} />
    </>
  )
}

export function MorningStage({ session }: { session: MafiaSession }) {
  const t = useTranslation(mafiaGameMessages).morning
  const startDay = useMafiaStore((state) => state.startDay)
  const report = session.lastNight
  const find = (id: string | null) => session.players.find((player) => player.id === id)

  const killed = session.players.filter((player) => report?.killedIds.includes(player.id))
  const saved = report?.savedIds.map(find).filter((player) => player !== undefined) ?? []
  const blocked = find(report?.blockedId ?? null)

  return (
    <>
      <div className="relative animate-pop-in overflow-hidden rounded-4xl bg-linear-to-br from-amber-300 via-orange-400 to-rose-500 p-6 text-center text-white shadow-xl shadow-orange-500/25">
        <div className="pointer-events-none absolute -top-16 left-1/2 size-48 -translate-x-1/2 rounded-full bg-yellow-200/60 blur-3xl" />
        <span className="relative block animate-float text-6xl" aria-hidden>
          🌅
        </span>
        <h1 className="relative mt-2 font-display text-2xl font-bold tracking-tight">{t.title}</h1>
        <p className="relative text-sm text-white/90">{t.subtitle(session.cycle)}</p>
      </div>

      {killed.length > 0 ? (
        <Section title={t.killed}>
          <div className="flex flex-col gap-2">
            {killed.map((player) => (
              <Card key={player.id} className="flex items-center gap-3 p-3">
                <Avatar name={player.name} />
                <span className="min-w-0 flex-1 truncate font-display text-lg font-semibold">
                  {player.name}
                </span>
                {session.revealRoleOnDeath ? (
                  <RoleBadge role={player.role} />
                ) : (
                  <span className="text-xs font-semibold text-muted-foreground">
                    {t.roleHidden}
                  </span>
                )}
              </Card>
            ))}
          </div>
        </Section>
      ) : (
        <Card className="flex flex-col items-center gap-2 py-8 text-center">
          <span className="text-5xl" aria-hidden>
            🕊️
          </span>
          <p className="font-display text-lg font-semibold">{t.nobodyDied}</p>
        </Card>
      )}

      {(saved.length > 0 || blocked) && (
        <Card className="flex flex-col gap-2 border-dashed bg-muted/40">
          <p className="flex items-center gap-2 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
            <EyeOff className="size-3.5" />
            {t.hostOnly}
          </p>
          {saved.map((player) => (
            <p key={player.id} className="flex items-center gap-2 text-sm font-medium">
              <ShieldCheck className="size-4 text-emerald-500" />
              {t.saved(player.name)}
            </p>
          ))}
          {blocked && (
            <p className="flex items-center gap-2 text-sm font-medium">
              <span aria-hidden>💋</span>
              {t.blocked(blocked.name)}
            </p>
          )}
        </Card>
      )}

      <BottomBar>
        <Button
          size="lg"
          variant="mafia"
          fullWidth
          icon={session.winner ? <Trophy /> : <Sparkles />}
          onClick={startDay}
        >
          {session.winner ? t.toResult : t.toDay}
        </Button>
      </BottomBar>
    </>
  )
}

export function DayStage({ session }: { session: MafiaSession }) {
  const t = useTranslation(mafiaGameMessages)
  const startVoting = useMafiaStore((state) => state.startVoting)
  const [showRoles, setShowRoles] = useState(false)

  const alive = session.players.filter((player) => player.alive)
  const dead = session.players.filter((player) => !player.alive)
  const silenced = alive.find((player) => player.id === session.silencedId)

  return (
    <>
      <div className="flex items-center gap-3">
        <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-amber-500/15 text-2xl">
          ☀️
        </span>
        <div className="min-w-0 flex-1">
          <h1 className="font-display text-xl font-semibold tracking-tight">
            {t.day.title(session.cycle)}
          </h1>
          <p className="text-sm leading-snug text-muted-foreground">{t.day.hint}</p>
        </div>
      </div>

      {silenced && (
        <Callout tone="warning">{t.morning.blocked(silenced.name)}</Callout>
      )}

      {session.discussionSeconds > 0 && (
        <Card className="py-6">
          <CountdownTimer durationSeconds={session.discussionSeconds} />
        </Card>
      )}

      <Section
        title={`${t.day.alive} · ${alive.length}`}
        action={
          <IconButton
            size="sm"
            variant="outline"
            label={showRoles ? t.hideRoles : t.showRoles}
            icon={showRoles ? <EyeOff /> : <ShieldCheck />}
            onClick={() => setShowRoles((value) => !value)}
          />
        }
      >
        <PlayerGrid players={alive} showRoles={showRoles} />
      </Section>

      {dead.length > 0 && (
        <Section title={`${t.day.dead} · ${dead.length}`}>
          <PlayerGrid players={dead} showRoles={showRoles || session.revealRoleOnDeath} />
        </Section>
      )}

      <BottomBar>
        <Button size="lg" variant="mafia" fullWidth icon={<Vote />} onClick={startVoting}>
          {t.day.toVoting}
        </Button>
      </BottomBar>
    </>
  )
}

export function VerdictStage({ session }: { session: MafiaSession }) {
  const t = useTranslation(mafiaGameMessages).verdict
  const continueAfterVerdict = useMafiaStore((state) => state.continueAfterVerdict)
  const eliminated = session.players.find((player) => player.id === session.lastEliminatedId)

  return (
    <>
      <Card className="flex animate-pop-in flex-col items-center gap-3 py-10 text-center">
        {eliminated ? (
          <>
            <div className="relative">
              <Avatar name={eliminated.name} size="xl" className="grayscale" />
              <span className="absolute -right-1 -bottom-1 flex size-9 items-center justify-center rounded-full bg-rose-500 text-white shadow-lg">
                <UserX className="size-5" />
              </span>
            </div>
            <h1 className="font-display text-2xl font-semibold tracking-tight">
              {t.eliminated(eliminated.name)}
            </h1>
            {session.revealRoleOnDeath && (
              <RoleBadge role={eliminated.role} className="px-3 py-1 text-sm" />
            )}
          </>
        ) : (
          <>
            <span className="text-6xl" aria-hidden>
              🤝
            </span>
            <h1 className="font-display text-2xl font-semibold tracking-tight">{t.nobody}</h1>
            <p className="text-sm text-muted-foreground">{t.nobodyHint}</p>
          </>
        )}
      </Card>

      <BottomBar>
        <Button
          size="lg"
          variant="mafia"
          fullWidth
          icon={session.winner ? <Trophy /> : <Moon />}
          onClick={continueAfterVerdict}
        >
          {session.winner ? t.toResult : t.toNight}
        </Button>
      </BottomBar>
    </>
  )
}
