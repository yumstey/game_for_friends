import type { ImposterSession } from '@/entities/imposter'
import { DiscussionStage } from './DiscussionStage'
import { ResultStage } from './ResultStage'
import { RevealStage } from './RevealStage'

/** Imposter oʻyinining joriy fazasiga mos ekranni koʻrsatadi. */
export function ImposterGame({ session }: { session: ImposterSession }) {
  switch (session.phase) {
    case 'reveal':
      return <RevealStage session={session} />
    case 'discussion':
      return <DiscussionStage session={session} />
    case 'result':
      return <ResultStage session={session} />
  }
}
