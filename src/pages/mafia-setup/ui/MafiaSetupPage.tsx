import { MAFIA_MIN_PLAYERS, useMafiaStore } from '@/entities/mafia'
import { MafiaOptions, RoleDistributionEditor } from '@/features/mafia-roles'
import { StartMafiaButton } from '@/features/mafia-start'
import { PlayerRosterEditor } from '@/features/player-roster'
import { ROUTES } from '@/shared/config'
import { useTranslation } from '@/shared/i18n'
import { BottomBar, GuideButton, PageContent, ResumeBanner } from '@/shared/ui'
import { AppHeader } from '@/widgets/app-header'
import { mafiaSetupMessages } from './messages'

export function MafiaSetupPage() {
  const t = useTranslation(mafiaSetupMessages)
  const hasActiveGame = useMafiaStore(
    (state) => state.session !== null && state.session.phase !== 'over',
  )

  return (
    <>
      <AppHeader
        backTo={ROUTES.home}
        title={t.title}
        subtitle={t.subtitle}
        actions={
          <GuideButton label={t.rules} title={t.rulesTitle} sections={t.rulesSections} />
        }
      />

      <PageContent>
        {hasActiveGame && (
          <ResumeBanner
            title={t.resumeTitle}
            description={t.resumeDescription}
            actionLabel={t.resumeAction}
            to={ROUTES.mafiaGame}
          />
        )}
        <PlayerRosterEditor minPlayers={MAFIA_MIN_PLAYERS} />
        <RoleDistributionEditor />
        <MafiaOptions />
      </PageContent>

      <BottomBar>
        <StartMafiaButton />
      </BottomBar>
    </>
  )
}
