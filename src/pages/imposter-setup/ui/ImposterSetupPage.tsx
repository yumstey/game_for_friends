import { IMPOSTER_MIN_PLAYERS, useImposterStore } from '@/entities/imposter'
import { ImposterOptions, TopicPicker } from '@/features/imposter-settings'
import { StartImposterButton } from '@/features/imposter-start'
import { PlayerRosterEditor } from '@/features/player-roster'
import { ROUTES } from '@/shared/config'
import { useTranslation } from '@/shared/i18n'
import { BottomBar, GuideButton, PageContent, ResumeBanner } from '@/shared/ui'
import { AppHeader } from '@/widgets/app-header'
import { imposterSetupMessages } from './messages'

export function ImposterSetupPage() {
  const t = useTranslation(imposterSetupMessages)
  const activeRound = useImposterStore((state) => state.session?.round.number)

  return (
    <>
      <AppHeader
        backTo={ROUTES.home}
        title={t.title}
        subtitle={t.subtitle}
        actions={<GuideButton label={t.rules} title={t.rulesTitle} sections={t.rulesSections} />}
      />

      <PageContent>
        {activeRound !== undefined && (
          <ResumeBanner
            title={t.resumeTitle}
            description={t.resumeDescription(activeRound)}
            actionLabel={t.resumeAction}
            to={ROUTES.imposterGame}
          />
        )}
        <PlayerRosterEditor minPlayers={IMPOSTER_MIN_PLAYERS} />
        <TopicPicker />
        <ImposterOptions />
      </PageContent>

      <BottomBar>
        <StartImposterButton />
      </BottomBar>
    </>
  )
}
