import { Navigate, useNavigate } from 'react-router'
import { useImposterStore } from '@/entities/imposter'
import { ExitGameButton } from '@/features/exit-game'
import { ROUTES } from '@/shared/config'
import { useTranslation } from '@/shared/i18n'
import { useScrollToTop, useWakeLock } from '@/shared/lib'
import { PageContent } from '@/shared/ui'
import { AppHeader } from '@/widgets/app-header'
import { ImposterGame, imposterGameMessages } from '@/widgets/imposter-game'

export function ImposterGamePage() {
  const t = useTranslation(imposterGameMessages)
  const navigate = useNavigate()
  const session = useImposterStore((state) => state.session)
  const endSession = useImposterStore((state) => state.endSession)

  useWakeLock()
  useScrollToTop(session && `${session.round.number}:${session.phase}`)

  if (!session) return <Navigate to={ROUTES.imposterSetup} replace />

  return (
    <>
      <AppHeader
        compact
        backTo={ROUTES.imposterSetup}
        title="Imposter"
        subtitle={`${t.round(session.round.number)} · ${t.phases[session.phase]}`}
        actions={
          <ExitGameButton
            onExit={() => {
              endSession()
              navigate(ROUTES.imposterSetup, { replace: true })
            }}
          />
        }
      />

      <PageContent>
        <ImposterGame
          // Yangi raund yoki faza — komponentlar ichki holati toza boshlanadi.
          key={`${session.round.number}:${session.phase}`}
          session={session}
        />
      </PageContent>
    </>
  )
}
