import { defineMessages } from '@/shared/i18n'

export const rosterMessages = defineMessages({
  uz: {
    title: 'Oʻyinchilar',
    description: 'Sonini kiriting va ismlarni tahrirlang',
    count: 'Oʻyinchilar soni',
    add: 'Oʻyinchi qoʻshish',
    remove: (name: string) => `Oʻchirish: ${name || 'ism yoʻq'}`,
    namePlaceholder: (index: number) => `${index}-oʻyinchi ismi`,
    fallbackName: (index: number) => `Oʻyinchi ${index}`,
    quickAdd: 'Tezkor qoʻshish',
    reset: 'Standart roʻyxat',
    minHint: (count: number) => `Bu oʻyin uchun kamida ${count} ta oʻyinchi kerak`,
    issues: {
      empty: 'Ism kiritilmagan',
      duplicate: 'Bu ism takrorlanmoqda',
    },
  },
  en: {
    title: 'Players',
    description: 'Set the number and edit the names',
    count: 'Number of players',
    add: 'Add player',
    remove: (name: string) => `Remove ${name || 'unnamed player'}`,
    namePlaceholder: (index: number) => `Player ${index} name`,
    fallbackName: (index: number) => `Player ${index}`,
    quickAdd: 'Quick add',
    reset: 'Default list',
    minHint: (count: number) => `This game needs at least ${count} players`,
    issues: {
      empty: 'Name is empty',
      duplicate: 'This name is duplicated',
    },
  },
})
