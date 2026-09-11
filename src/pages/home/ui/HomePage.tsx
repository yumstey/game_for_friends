import { useImposterStore } from '@/entities/imposter'
import { useMafiaStore } from '@/entities/mafia'
import { useRosterStore } from '@/entities/player'
import { ROUTES } from '@/shared/config'
import { useTranslation } from '@/shared/i18n'
import { Avatar, Card, PageContent } from '@/shared/ui'
import { AppHeader } from '@/widgets/app-header'
import { GameCard } from './GameCard'
import { homeMessages } from './messages'

const AVATAR_PREVIEW_LIMIT = 6

export function HomePage() {
  const t = useTranslation(homeMessages)
  const players = useRosterStore((state) => state.players)
  const hasImposterGame = useImposterStore((state) => state.session !== null)
  const hasMafiaGame = useMafiaStore(
    (state) => state.session !== null && state.session.phase !== 'over',
  )

  return (
    <>
      <AppHeader />

      <PageContent withBottomBar={false} className="gap-5">
        <section className="animate-fade-up pt-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
            🎉 {t.badge}
          </span>
          <h1 className="mt-3 font-display text-[2rem] leading-[1.1] font-bold tracking-tight">
            {t.title}
          </h1>
          <p className="mt-2 text-[15px] text-muted-foreground">{t.subtitle}</p>
        </section>

        <GameCard
          to={hasImposterGame ? ROUTES.imposterGame : ROUTES.imposterSetup}
          title={t.imposter.title}
          description={t.imposter.description}
          meta={t.imposter.meta}
          emoji="🕵️"
          playLabel={t.play}
          resumeLabel={hasImposterGame ? t.resume : undefined}
          className="bg-linear-to-br from-rose-500 via-red-600 to-rose-900 shadow-rose-600/25"
        />

        <GameCard
          to={hasMafiaGame ? ROUTES.mafiaGame : ROUTES.mafiaSetup}
          title={t.mafia.title}
          description={t.mafia.description}
          meta={t.mafia.meta}
          emoji="🎩"
          playLabel={t.play}
          resumeLabel={hasMafiaGame ? t.resume : undefined}
          className="bg-linear-to-br from-zinc-800 via-zinc-900 to-amber-900 shadow-amber-900/25 [animation-delay:80ms]"
        />

        <Card className="flex animate-fade-up items-center gap-3 [animation-delay:160ms]">
          <div className="flex -space-x-2.5">
            {players.slice(0, AVATAR_PREVIEW_LIMIT).map((player) => (
              <Avatar
                key={player.id}
                name={player.name || '?'}
                size="sm"
                className="ring-2 ring-card"
              />
            ))}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold">{t.roster(players.length)}</p>
            <p className="truncate text-xs text-muted-foreground">
              {players.map((player) => player.name).join(', ')}
            </p>
          </div>
        </Card>
      </PageContent>
    </>
  )
}
