import { Wand2 } from 'lucide-react'
import type { ReactNode } from 'react'
import {
  MAFIA_ROLES,
  SPECIAL_ROLE_IDS,
  countCivilians,
  countMafiaTeam,
  getEffectiveRoleCounts,
  getRoleLimit,
  mafiaMessages,
  recommendRoleCounts,
  useMafiaStore,
  type MafiaRoleId,
  type MafiaTeam,
} from '@/entities/mafia'
import { useRosterStore } from '@/entities/player'
import { useTranslation } from '@/shared/i18n'
import { cn } from '@/shared/lib'
import { Card, Section, Stepper, Switch } from '@/shared/ui'
import { mafiaRolesMessages } from './messages'

const teamIconClasses: Record<MafiaTeam, string> = {
  town: 'bg-emerald-500/12',
  mafia: 'bg-rose-500/12',
  solo: 'bg-violet-500/12',
}

interface RoleRowProps {
  role: MafiaRoleId
  description: string
  children: ReactNode
}

function RoleRow({ role, description, children }: RoleRowProps) {
  const t = useTranslation(mafiaMessages)
  const definition = MAFIA_ROLES[role]

  return (
    <li className="flex items-center gap-3 py-2.5">
      <span
        aria-hidden
        className={cn(
          'flex size-11 shrink-0 items-center justify-center rounded-2xl text-xl',
          teamIconClasses[definition.team],
        )}
      >
        {definition.emoji}
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-[15px] font-semibold">{t.roles[role].name}</p>
        <p className="line-clamp-2 text-xs leading-snug text-muted-foreground">
          {description}
        </p>
      </div>
      {children}
    </li>
  )
}

export function RoleDistributionEditor() {
  const t = useTranslation(mafiaRolesMessages)
  const roleTexts = useTranslation(mafiaMessages).roles
  const settings = useMafiaStore((state) => state.settings)
  const { updateSettings, setRoleCount } = useMafiaStore.getState()
  const playerCount = useRosterStore((state) => state.players.length)

  const counts = getEffectiveRoleCounts(settings, playerCount)
  const mafiaTeam = countMafiaTeam(counts)

  const toggleAuto = (autoRoles: boolean) =>
    updateSettings(
      // Qoʻlda rejimga oʻtganda hozirgi tavsiyadan boshlaymiz.
      autoRoles
        ? { autoRoles }
        : { autoRoles, roleCounts: recommendRoleCounts(playerCount) },
    )

  return (
    <Section
      title={t.rolesTitle}
      description={t.rolesSummary(mafiaTeam, Math.max(0, playerCount - mafiaTeam))}
    >
      <Card className="flex flex-col py-2">
        <Switch
          className="py-2.5"
          icon={<Wand2 />}
          label={t.auto}
          description={t.autoHint}
          checked={settings.autoRoles}
          onChange={toggleAuto}
        />

        <ul className="divide-y divide-border border-t border-border">
          {SPECIAL_ROLE_IDS.map((role) => (
            <RoleRow key={role} role={role} description={roleTexts[role].description}>
              <Stepper
                size="sm"
                label={roleTexts[role].name}
                value={counts[role]}
                min={0}
                max={getRoleLimit(role, playerCount)}
                disabled={settings.autoRoles}
                onChange={(count) => setRoleCount(role, count)}
              />
            </RoleRow>
          ))}

          <RoleRow role="civilian" description={t.civiliansHint}>
            <span className="w-28 text-center font-display text-lg font-semibold tabular-nums">
              {countCivilians(counts, playerCount)}
            </span>
          </RoleRow>
        </ul>
      </Card>
    </Section>
  )
}
