import { Eye, Timer, VenetianMask } from 'lucide-react'
import {
  DISCUSSION_PRESETS_SECONDS,
  getMaxImposters,
  useImposterStore,
} from '@/entities/imposter'
import { useRosterStore } from '@/entities/player'
import { commonMessages, useTranslation } from '@/shared/i18n'
import { Card, SegmentedControl, Section, Stepper, Switch } from '@/shared/ui'
import { imposterSettingsMessages } from './messages'

export function ImposterOptions() {
  const t = useTranslation(imposterSettingsMessages)
  const common = useTranslation(commonMessages)
  const settings = useImposterStore((state) => state.settings)
  const updateSettings = useImposterStore((state) => state.updateSettings)
  const playerCount = useRosterStore((state) => state.players.length)

  const maxImposters = getMaxImposters(playerCount)
  const imposterCount = Math.min(settings.imposterCount, maxImposters)

  return (
    <Section title={t.optionsTitle}>
      <Card className="flex flex-col gap-1 divide-y divide-border py-2">
        <div className="flex items-center gap-3 py-2">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-rose-500/12 text-rose-500">
            <VenetianMask className="size-5" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-[15px] font-semibold">{t.imposterCount}</p>
            <p className="text-sm leading-snug text-muted-foreground">
              {t.imposterCountHint(maxImposters)}
            </p>
          </div>
          <Stepper
            size="sm"
            label={t.imposterCount}
            value={imposterCount}
            min={1}
            max={maxImposters}
            onChange={(count) => updateSettings({ imposterCount: count })}
          />
        </div>

        <Switch
          className="py-3"
          icon={<Eye />}
          label={t.showTopic}
          description={t.showTopicHint}
          checked={settings.showTopicToImposter}
          onChange={(checked) => updateSettings({ showTopicToImposter: checked })}
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
            onChange={(seconds) => updateSettings({ discussionSeconds: seconds })}
            options={DISCUSSION_PRESETS_SECONDS.map((seconds) => ({
              value: seconds,
              label: seconds === 0 ? common.off : common.minutesShort(seconds / 60),
            }))}
          />
        </div>
      </Card>
    </Section>
  )
}
