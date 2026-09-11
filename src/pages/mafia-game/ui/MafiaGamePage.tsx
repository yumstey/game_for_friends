import { Navigate, useNavigate } from 'react-router'
import { useMafiaStore } from '@/entities/mafia'
import { ExitGameButton } from '@/features/exit-game'
import { ROUTES } from '@/shared/config'
import { useScrollToTop, useWakeLock } from '@/shared/lib'
import { PageContent } from '@/shared/ui'
import { AppHeader } from '@/widgets/app-header'
import {
  JournalButton,
  MafiaGame,
  MafiaPhaseLabel,
  UndoButton,
} from '@/widgets/mafia-game'

export function MafiaGamePage() {
  const navigate = useNavigate()
  const session = useMafiaStore((state) => state.session)
  const endSession = useMafiaStore((state) => state.endSession)
  const stageKey = session && `${session.cycle}:${session.phase}:${session.log.length}`

  useWakeLock()
  useScrollToTop(stageKey)

  if (!session) return <Navigate to={ROUTES.mafiaSetup} replace />

  return (
    <>
      <AppHeader
        compact
        backTo={ROUTES.mafiaSetup}
        title="Mafia"
        subtitle={<MafiaPhaseLabel session={session} />}
        actions={
          <>
            <UndoButton />
            <JournalButton />
            <ExitGameButton
              onExit={() => {
                endSession()
                navigate(ROUTES.mafiaSetup, { replace: true })
              }}
            />
          </>
        }
      />

      <PageContent>
        <MafiaGame key={stageKey} session={session} />
      </PageContent>
    </>
  )
}
