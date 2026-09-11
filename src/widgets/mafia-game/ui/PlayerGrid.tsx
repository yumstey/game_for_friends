import { Skull } from 'lucide-react'
import { RoleBadge, type MafiaPlayer } from '@/entities/mafia'
import { cn } from '@/shared/lib'
import { Avatar } from '@/shared/ui'

interface PlayerGridProps {
  players: readonly MafiaPlayer[]
  showRoles: boolean
}

/** Oʻyinchilar holati: tirik/halok va (ixtiyoriy) rollari. */
export function PlayerGrid({ players, showRoles }: PlayerGridProps) {
  return (
    <ul className="grid grid-cols-2 gap-2">
      {players.map((player) => (
        <li
          key={player.id}
          className={cn(
            'flex flex-col gap-1.5 rounded-2xl border border-border bg-card p-2.5',
            !player.alive && 'opacity-55',
          )}
        >
          <span className="flex min-w-0 items-center gap-2">
            {player.alive ? (
              <Avatar name={player.name} size="xs" />
            ) : (
              <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-muted">
                <Skull className="size-4 text-muted-foreground" />
              </span>
            )}
            <span
              className={cn(
                'truncate text-sm font-semibold',
                !player.alive && 'line-through decoration-2',
              )}
            >
              {player.name}
            </span>
          </span>
          {showRoles && (
            <RoleBadge role={player.role} className="self-start text-[11px]" />
          )}
        </li>
      ))}
    </ul>
  )
}
