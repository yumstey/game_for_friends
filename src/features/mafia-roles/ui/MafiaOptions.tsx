import { Skull, Timer } from 'lucide-react'
import { MAFIA_DISCUSSION_PRESETS_SECONDS, useMafiaStore } from '@/entities/mafia'
import { commonMessages, useTranslation } from '@/shared/i18n'
import { Card, SegmentedControl, Section, Switch } from '@/shared/ui'
import { mafiaRolesMessages } from './messages'

export function MafiaOptions() {
  const t = useTranslation(mafiaRolesMessages)
  const common = useTranslation(commonMessages)
  const settings = useMafiaStore((state) => state.settings)
  const updateSettings = useMafiaStore((state) => state.updateSettings)

  return (
    <Section title={t.optionsTitle}>
      <Card className="flex flex-col divide-y divide-border py-2">
        <Switch
          className="py-3"
          icon={<Skull />}
          label={t.revealRole}
          description={t.revealRoleHint}
          checked={settings.revealRoleOnDeath}
          onChange={(revealRoleOnDeath) => updateSettings({ revealRoleOnDeath })}
        />

        <div className="flex flex-col gap-3 py-3">
          <div className="flex items-center gap-3">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-muted">
              <Timer className="size-5" />
            </span>
            <p className="text-[15px] font-semibold">{t.timer}</p>
          </div>
          <SegmentedControl
            label={t.timer}
            value={settings.discussionSeconds}
            onChange={(discussionSeconds) => updateSettings({ discussionSeconds })}
            options={MAFIA_DISCUSSION_PRESETS_SECONDS.map((seconds) => ({
              value: seconds,
              label: seconds === 0 ? common.off : common.minutesShort(seconds / 60),
            }))}
          />
        </div>
      </Card>
    </Section>
  )
}
