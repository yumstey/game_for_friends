import { Moon, Sun } from 'lucide-react'
import { defineMessages, useTranslation } from '@/shared/i18n'
import type { MafiaLogEntry, MafiaPlayer } from '../model/types'
import { RoleBadge } from './RoleBadge'

const messages = defineMessages({
  uz: {
    night: (cycle: number) => `${cycle}-tun`,
    day: (cycle: number) => `${cycle}-kun`,
    killed: 'Oʻldirildi',
    saved: 'Doktor qutqardi',
    blocked: 'Maʼshuqa band qildi',
    checkedByDetective: 'Komissar tekshirdi',
    checkedByDon: 'Don tekshirdi',
    nobodyDied: 'Hech kim oʻlmadi',
    eliminated: 'Ovoz bilan chiqarildi',
    nobodyEliminated: 'Hech kim chiqarilmadi',
    empty: 'Hozircha voqealar yoʻq',
  },
  en: {
    night: (cycle: number) => `Night ${cycle}`,
    day: (cycle: number) => `Day ${cycle}`,
    killed: 'Killed',
    saved: 'Saved by the Doctor',
    blocked: 'Distracted by the Lover',
    checkedByDetective: 'Checked by the Detective',
    checkedByDon: 'Checked by the Don',
    nobodyDied: 'Nobody died',
    eliminated: 'Voted out',
    nobodyEliminated: 'Nobody was voted out',
    empty: 'No events yet',
  },
})

function LogLine({ label, player }: { label: string; player: MafiaPlayer | undefined }) {
  if (!player) return null

  return (
    <li className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm">
      <span className="text-muted-foreground">{label}:</span>
      <span className="font-semibold">{player.name}</span>
      <RoleBadge role={player.role} className="text-[11px]" />
    </li>
  )
}

interface GameLogProps {
  log: readonly MafiaLogEntry[]
  players: readonly MafiaPlayer[]
}

/** Oʻyin jurnali: har bir tun va ovoz berish natijalari (boshlovchi uchun toʻliq maʼlumot). */
export function GameLog({ log, players }: GameLogProps) {
  const t = useTranslation(messages)
  const byId = new Map(players.map((player) => [player.id, player]))
  const find = (id: string | null) => (id ? byId.get(id) : undefined)

  if (log.length === 0) {
    return <p className="py-6 text-center text-sm text-muted-foreground">{t.empty}</p>
  }

  return (
    <ol className="relative flex flex-col gap-4 border-l border-border pl-5">
      {log.map((entry, index) => (
        <li key={index} className="relative">
          <span className="absolute top-0.5 left-[-1.9rem] flex size-5 items-center justify-center rounded-full border border-border bg-card">
            {entry.type === 'night' ? (
              <Moon className="size-3 text-indigo-500" />
            ) : (
              <Sun className="size-3 text-amber-500" />
            )}
          </span>

          <p className="font-display text-sm font-semibold">
            {entry.type === 'night' ? t.night(entry.cycle) : t.day(entry.cycle)}
          </p>

          <ul className="mt-1.5 flex flex-col gap-1.5">
            {entry.type === 'night' ? (
              <>
                {entry.killedIds.map((id) => (
                  <LogLine key={id} label={t.killed} player={find(id)} />
                ))}
                {entry.killedIds.length === 0 && (
                  <li className="text-sm text-muted-foreground">{t.nobodyDied}</li>
                )}
                {entry.savedIds.map((id) => (
                  <LogLine key={id} label={t.saved} player={find(id)} />
                ))}
                <LogLine label={t.blocked} player={find(entry.actions.lover)} />
                <LogLine
                  label={t.checkedByDetective}
                  player={find(entry.actions.detective)}
                />
                <LogLine label={t.checkedByDon} player={find(entry.actions.don)} />
              </>
            ) : entry.eliminatedId ? (
              <LogLine label={t.eliminated} player={find(entry.eliminatedId)} />
            ) : (
              <li className="text-sm text-muted-foreground">{t.nobodyEliminated}</li>
            )}
          </ul>
        </li>
      ))}
    </ol>
  )
}
