import { useTranslation } from '@/shared/i18n'
import { Badge } from '@/shared/ui'
import { mafiaMessages } from '../config/messages'
import { MAFIA_ROLES, type MafiaRoleId } from '../config/roles'
import { TEAM_TONES } from '../config/team-tones'

interface RoleBadgeProps {
  role: MafiaRoleId
  className?: string
}

export function RoleBadge({ role, className }: RoleBadgeProps) {
  const t = useTranslation(mafiaMessages)
  const definition = MAFIA_ROLES[role]

  return (
    <Badge tone={TEAM_TONES[definition.team]} className={className}>
      <span aria-hidden>{definition.emoji}</span>
      {t.roles[role].name}
    </Badge>
  )
}
