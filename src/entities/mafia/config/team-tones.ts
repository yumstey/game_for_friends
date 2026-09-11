import type { BadgeTone } from '@/shared/ui'
import type { MafiaTeam } from './roles'

/** Jamoalarning rang tonlari (badge'lar uchun). */
export const TEAM_TONES: Readonly<Record<MafiaTeam, BadgeTone>> = {
  town: 'success',
  mafia: 'danger',
  solo: 'primary',
}
