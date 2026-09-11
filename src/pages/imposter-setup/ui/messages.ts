import type { GuideSection } from '@/shared/ui'
import { defineMessages } from '@/shared/i18n'

interface ImposterSetupMessages {
  title: string
  subtitle: string
  rules: string
  rulesTitle: string
  rulesSections: GuideSection[]
  resumeTitle: string
  resumeDescription: (round: number) => string
  resumeAction: string
}

export const imposterSetupMessages = defineMessages<ImposterSetupMessages>({
  uz: {
    title: 'Imposter',
    subtitle: 'Oʻyin sozlamalari',
    rules: 'Qoidalar',
    rulesTitle: 'Imposter qoidalari',
    rulesSections: [
      {
        title: '1. Kartalar',
        items: [
          'Telefon navbat bilan har bir oʻyinchiga uzatiladi.',
          'Hamma bitta yashirin soʻzni koʻradi, imposter esa faqat “Siz IMPOSTERsiz” yozuvini koʻradi.',
          'Imposter, soʻz, mavzu va kim boshlashi — hammasi tasodifiy tanlanadi.',
        ],
      },
      {
        title: '2. Muhokama',
        items: [
          'Navbat bilan har kim soʻz haqida bitta qisqa ishora beradi.',
          'Juda aniq aytmang — imposter soʻzni topib olishi mumkin.',
          'Imposter boshqalarni tinglab, oʻziga mos ishora oʻylab topadi.',
        ],
      },
      {
        title: '3. Imposterni topish',
        items: [
          'Muhokamadan soʻng hamma kim imposter ekanini ogʻzaki aytadi.',
          '“Imposterni koʻrsatish” tugmasi bosilganda imposter va yashirin soʻz ochiladi.',
          'Barcha kartalar bir xil koʻrinishda — rangidan hech kim hech narsa bilib ololmaydi.',
        ],
      },
    ],
    resumeTitle: 'Tugallanmagan oʻyin bor',
    resumeDescription: (round) => `${round}-raund davom etmoqda`,
    resumeAction: 'Davom etish',
  },
  en: {
    title: 'Imposter',
    subtitle: 'Game setup',
    rules: 'Rules',
    rulesTitle: 'Imposter rules',
    rulesSections: [
      {
        title: '1. Cards',
        items: [
          'The phone is passed to each player in turn.',
          'Everyone sees the same secret word, while the imposter only sees “You are the IMPOSTER”.',
          'The imposter, the word, the topic and the first speaker are all chosen at random.',
        ],
      },
      {
        title: '2. Discussion',
        items: [
          'In turn, everyone gives one short hint about the word.',
          'Do not be too obvious — the imposter might guess the word.',
          'The imposter listens and comes up with a matching hint.',
        ],
      },
      {
        title: '3. Finding the imposter',
        items: [
          'After the discussion, everyone names their suspect out loud.',
          'Press “Show the imposter” to reveal the imposter and the secret word.',
          'All cards look exactly the same — nobody can tell anything from the color.',
        ],
      },
    ],
    resumeTitle: 'Unfinished game',
    resumeDescription: (round) => `Round ${round} in progress`,
    resumeAction: 'Resume',
  },
})
