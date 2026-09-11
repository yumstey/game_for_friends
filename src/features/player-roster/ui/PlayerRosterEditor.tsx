import { Plus, RotateCcw, X } from 'lucide-react'
import {
  DEFAULT_PLAYER_NAMES,
  PLAYER_NAME_MAX_LENGTH,
  ROSTER_LIMITS,
  findNameIssues,
  suggestPlayerName,
  useRosterStore,
} from '@/entities/player'
import { useTranslation } from '@/shared/i18n'
import { cn } from '@/shared/lib'
import { Avatar, Button, Callout, Card, Section, Stepper } from '@/shared/ui'
import { rosterMessages } from './messages'

interface PlayerRosterEditorProps {
  /** Tanlangan oʻyin talab qiladigan minimal oʻyinchilar soni. */
  minPlayers: number
}

export function PlayerRosterEditor({ minPlayers }: PlayerRosterEditorProps) {
  const t = useTranslation(rosterMessages)
  const players = useRosterStore((state) => state.players)
  const { addPlayer, renamePlayer, removePlayer, resize, resetToDefaults } =
    useRosterStore.getState()

  const names = players.map((player) => player.name)
  const issues = findNameIssues(players)
  const isFull = players.length >= ROSTER_LIMITS.max
  const freeDefaults = DEFAULT_PLAYER_NAMES.filter(
    (name) => !names.some((existing) => existing.trim().toLowerCase() === name.toLowerCase()),
  )

  return (
    <Section
      title={t.title}
      description={t.description}
      action={
        <Button variant="ghost" size="sm" icon={<RotateCcw />} onClick={resetToDefaults}>
          {t.reset}
        </Button>
      }
    >
      <Card className="flex flex-col gap-4">
        <div className="flex items-center justify-between gap-3">
          <span className="text-[15px] font-semibold">{t.count}</span>
          <Stepper
            label={t.count}
            value={players.length}
            min={ROSTER_LIMITS.min}
            max={ROSTER_LIMITS.max}
            onChange={(count) =>
              resize(count, (existing) => suggestPlayerName(existing, t.fallbackName))
            }
          />
        </div>

        {players.length < minPlayers && <Callout tone="warning">{t.minHint(minPlayers)}</Callout>}

        <ol className="flex flex-col gap-2">
          {players.map((player, index) => {
            const issue = issues.get(player.id)

            return (
              <li key={player.id} className="animate-fade-up">
                <div
                  className={cn(
                    'flex items-center gap-2.5 rounded-2xl border bg-background/60 py-1.5 pr-1.5 pl-2 transition focus-within:border-primary',
                    issue ? 'border-rose-500/70' : 'border-border',
                  )}
                >
                  <Avatar name={player.name || '?'} size="sm" />
                  <input
                    value={player.name}
                    maxLength={PLAYER_NAME_MAX_LENGTH}
                    placeholder={t.namePlaceholder(index + 1)}
                    aria-label={t.namePlaceholder(index + 1)}
                    aria-invalid={issue !== undefined}
                    enterKeyHint="next"
                    autoCapitalize="words"
                    autoComplete="off"
                    onChange={(event) => renamePlayer(player.id, event.target.value)}
                    className="h-9 min-w-0 flex-1 bg-transparent text-[15px] font-semibold outline-none placeholder:font-medium placeholder:text-muted-foreground"
                  />
                  <span className="font-display text-xs text-muted-foreground tabular-nums">
                    {index + 1}
                  </span>
                  <button
                    type="button"
                    aria-label={t.remove(player.name)}
                    disabled={players.length <= ROSTER_LIMITS.min}
                    onClick={() => removePlayer(player.id)}
                    className="flex size-9 items-center justify-center rounded-xl text-muted-foreground transition hover:bg-rose-500/10 hover:text-rose-500 active:scale-90 disabled:opacity-30"
                  >
                    <X className="size-4" />
                  </button>
                </div>
                {issue && (
                  <p className="mt-1 px-3 text-xs font-medium text-rose-500">{t.issues[issue]}</p>
                )}
              </li>
            )
          })}
        </ol>

        <Button
          variant="outline"
          fullWidth
          icon={<Plus />}
          disabled={isFull}
          onClick={() => addPlayer(suggestPlayerName(names, t.fallbackName))}
        >
          {t.add}
        </Button>

        {freeDefaults.length > 0 && !isFull && (
          <div className="flex flex-col gap-2">
            <span className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
              {t.quickAdd}
            </span>
            <div className="flex flex-wrap gap-2">
              {freeDefaults.map((name) => (
                <button
                  key={name}
                  type="button"
                  onClick={() => addPlayer(name)}
                  className="inline-flex h-9 items-center gap-1.5 rounded-full border border-dashed border-border px-3 text-sm font-semibold transition hover:border-primary hover:text-primary active:scale-95"
                >
                  <Plus className="size-3.5" />
                  {name}
                </button>
              ))}
            </div>
          </div>
        )}
      </Card>
    </Section>
  )
}
