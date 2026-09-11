import type { ImposterPhase, TurnDirection } from '@/entities/imposter'
import { defineMessages } from '@/shared/i18n'

interface ImposterGameMessages {
  phases: Record<ImposterPhase, string>
  round: (round: number) => string
  reveal: {
    takePhone: string
    tapToReveal: string
    secretWord: string
    topic: string
    crewHint: string
    imposterWord: string
    imposterHint: string
    topicHidden: string
    openFirst: string
    hideAndPass: string
    startDiscussion: string
  }
  discussion: {
    starts: string
    directions: Record<TurnDirection, string>
    topic: string
    topicSecret: string
    tipsTitle: string
    tips: string[]
    revealImposter: (count: number) => string
    confirmTitle: (count: number) => string
    confirmDescription: string
    confirm: string
  }
  result: {
    imposterWas: (count: number) => string
    word: string
    topic: string
    nextRound: string
    settings: string
  }
}

export const imposterGameMessages = defineMessages<ImposterGameMessages>({
  uz: {
    phases: {
      reveal: 'Kartalarni koʻrish',
      discussion: 'Muhokama',
      result: 'Natija',
    },
    round: (round) => `${round}-raund`,
    reveal: {
      takePhone: 'Telefon shu oʻyinchida',
      tapToReveal: 'Kartani ochish uchun bosing',
      secretWord: 'Yashirin soʻz',
      topic: 'Mavzu',
      crewHint: 'Soʻzni imposterga bildirib qoʻymang',
      imposterWord: 'IMPOSTER',
      imposterHint: 'Soʻzni bilmaysiz — oʻzingizni sezdirmang',
      topicHidden: 'Sir',
      openFirst: 'Avval kartani oching',
      hideAndPass: 'Yashirish va uzatish',
      startDiscussion: 'Muhokamani boshlash',
    },
    discussion: {
      starts: 'Birinchi boʻlib gapiradi',
      directions: {
        clockwise: 'Soat mili boʻyicha ↻',
        counterclockwise: 'Soat miliga teskari ↺',
      },
      topic: 'Mavzu',
      topicSecret: 'Mavzu sir saqlanadi',
      tipsTitle: 'Qanday oʻynaladi?',
      tips: [
        'Navbat bilan har kim soʻz haqida bitta qisqa ishora beradi.',
        'Juda aniq aytmang — imposter soʻzni topib olishi mumkin.',
        'Muhokamadan soʻng imposterni ogʻzaki tanlang va pastdagi tugmani bosing.',
      ],
      revealImposter: (count) => (count === 1 ? 'Imposterni koʻrsatish' : 'Imposterlarni koʻrsatish'),
      confirmTitle: (count) => (count === 1 ? 'Imposterni ochamizmi?' : 'Imposterlarni ochamizmi?'),
      confirmDescription: 'Hamma oʻz tanlovini aytib boʻlganiga ishonch hosil qiling.',
      confirm: 'Ha, koʻrsatish',
    },
    result: {
      imposterWas: (count) => (count === 1 ? 'Imposter' : 'Imposterlar'),
      word: 'Yashirin soʻz',
      topic: 'Mavzu',
      nextRound: 'Keyingi raund',
      settings: 'Sozlamalar',
    },
  },
  en: {
    phases: {
      reveal: 'Reveal cards',
      discussion: 'Discussion',
      result: 'Result',
    },
    round: (round) => `Round ${round}`,
    reveal: {
      takePhone: 'This player holds the phone',
      tapToReveal: 'Tap to reveal your card',
      secretWord: 'Secret word',
      topic: 'Topic',
      crewHint: 'Do not give the word away to the imposter',
      imposterWord: 'IMPOSTER',
      imposterHint: 'You do not know the word — blend in',
      topicHidden: 'Secret',
      openFirst: 'Reveal the card first',
      hideAndPass: 'Hide and pass',
      startDiscussion: 'Start discussion',
    },
    discussion: {
      starts: 'Goes first',
      directions: {
        clockwise: 'Clockwise ↻',
        counterclockwise: 'Counterclockwise ↺',
      },
      topic: 'Topic',
      topicSecret: 'The topic stays secret',
      tipsTitle: 'How to play?',
      tips: [
        'In turn, everyone gives one short hint about the word.',
        'Do not be too obvious — the imposter might guess the word.',
        'After the discussion, pick the imposter out loud and press the button below.',
      ],
      revealImposter: (count) => (count === 1 ? 'Show the imposter' : 'Show the imposters'),
      confirmTitle: (count) => (count === 1 ? 'Reveal the imposter?' : 'Reveal the imposters?'),
      confirmDescription: 'Make sure everyone has named their suspect.',
      confirm: 'Yes, show',
    },
    result: {
      imposterWas: (count) => (count === 1 ? 'The imposter' : 'The imposters'),
      word: 'Secret word',
      topic: 'Topic',
      nextRound: 'Next round',
      settings: 'Settings',
    },
  },
})
