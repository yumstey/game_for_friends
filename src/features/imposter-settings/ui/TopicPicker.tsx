import { useImposterStore } from '@/entities/imposter'
import { TOPICS, TOPIC_IDS } from '@/entities/topic'
import { useLocalize, useTranslation } from '@/shared/i18n'
import { Button, Callout, ChoiceCard, Section } from '@/shared/ui'
import { imposterSettingsMessages } from './messages'

export function TopicPicker() {
  const t = useTranslation(imposterSettingsMessages)
  const localize = useLocalize()
  const topicIds = useImposterStore((state) => state.settings.topicIds)
  const { toggleTopic, updateSettings } = useImposterStore.getState()

  const selected = new Set(topicIds)
  const selectedCount = TOPIC_IDS.filter((id) => selected.has(id)).length
  const allSelected = selectedCount === TOPIC_IDS.length

  return (
    <Section
      title={t.topicsTitle}
      description={t.topicsDescription(selectedCount, TOPIC_IDS.length)}
      action={
        <Button
          variant="ghost"
          size="sm"
          onClick={() => updateSettings({ topicIds: allSelected ? [] : [...TOPIC_IDS] })}
        >
          {allSelected ? t.clearAll : t.selectAll}
        </Button>
      }
    >
      {selectedCount === 0 && <Callout tone="warning">{t.noTopics}</Callout>}

      <div className="grid grid-cols-2 gap-2.5">
        {TOPICS.map((topic) => (
          <ChoiceCard
            key={topic.id}
            selected={selected.has(topic.id)}
            onClick={() => toggleTopic(topic.id)}
            className="min-h-18"
          >
            <span className="text-2xl leading-none" aria-hidden>
              {topic.emoji}
            </span>
            <span className="min-w-0">
              <span className="block text-sm leading-tight font-semibold">
                {localize(topic.name)}
              </span>
              <span className="mt-0.5 block text-xs text-muted-foreground">
                {t.wordsCount(topic.words.length)}
              </span>
            </span>
          </ChoiceCard>
        ))}
      </div>
    </Section>
  )
}
