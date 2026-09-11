import { defineMessages } from '@/shared/i18n'

export const imposterSettingsMessages = defineMessages({
  uz: {
    topicsTitle: 'Mavzular',
    topicsDescription: (selected: number, total: number) => `${selected} / ${total} tanlandi`,
    selectAll: 'Hammasi',
    clearAll: 'Tozalash',
    wordsCount: (count: number) => `${count} ta soʻz`,
    noTopics: 'Kamida bitta mavzu tanlang',
    optionsTitle: 'Qoʻshimcha sozlamalar',
    imposterCount: 'Imposterlar soni',
    imposterCountHint: (max: number) => `Hozirgi oʻyinchilar soni uchun koʻpi bilan ${max} ta`,
    showTopic: 'Imposter mavzuni koʻrsin',
    showTopicHint: 'Soʻzni bilmaydi, lekin mavzuni koʻradi — yashirinish osonroq',
    timer: 'Muhokama taymeri',
  },
  en: {
    topicsTitle: 'Topics',
    topicsDescription: (selected: number, total: number) => `${selected} of ${total} selected`,
    selectAll: 'All',
    clearAll: 'Clear',
    wordsCount: (count: number) => `${count} words`,
    noTopics: 'Select at least one topic',
    optionsTitle: 'More options',
    imposterCount: 'Number of imposters',
    imposterCountHint: (max: number) => `Up to ${max} for the current number of players`,
    showTopic: 'Imposter sees the topic',
    showTopicHint: 'They do not know the word, but see the topic — easier to blend in',
    timer: 'Discussion timer',
  },
})
