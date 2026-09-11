import type { NightStepId, TargetRestriction } from '@/entities/mafia'
import { defineMessages } from '@/shared/i18n'

interface NightMessages {
  steps: Record<NightStepId, { title: string; script: string }>
  restrictions: Record<TargetRestriction, string>
  awake: string
  chooseTarget: string
  dead: string
  blocked: (name: string) => string
  detectiveResult: (isMafia: boolean) => string
  donResult: (isDetective: boolean) => string
  showGesture: string
  back: string
  next: string
  skip: string
  finish: string
}

export const nightMessages = defineMessages<NightMessages>({
  uz: {
    steps: {
      lover: {
        title: 'Maʼshuqa',
        script: 'Maʼshuqa uygʻonadi va bu tun kimni band qilishini koʻrsatadi.',
      },
      mafia: {
        title: 'Mafiya',
        script: 'Mafiya uygʻonadi, bir-birini taniydi va qurbonni tanlaydi.',
      },
      don: {
        title: 'Don',
        script: 'Don uygʻonadi va Komissarni qidiradi.',
      },
      detective: {
        title: 'Komissar',
        script: 'Komissar uygʻonadi va bitta oʻyinchini tekshiradi.',
      },
      doctor: {
        title: 'Doktor',
        script: 'Doktor uygʻonadi va bu tun kimni davolashini tanlaydi.',
      },
      maniac: {
        title: 'Manyak',
        script: 'Manyak uygʻonadi va qurbonini tanlaydi.',
      },
    },
    restrictions: {
      self: 'Oʻzi',
      teammate: 'Sherigi',
      'repeat-heal': 'Kecha davolangan',
      'self-heal-used': 'Oʻzini davolab boʻlgan',
    },
    awake: 'Uygʻonadi',
    chooseTarget: 'Nishonni tanlang',
    dead: 'Bu rol oʻyindan chiqqan. Shubha uygʻotmaslik uchun bir necha soniya kutib, davom eting.',
    blocked: (name) => `Maʼshuqa band qildi: ${name}. Bu tun harakat qila olmaydi.`,
    detectiveResult: (isMafia) => (isMafia ? 'Ha, bu MAFIYA!' : 'Yoʻq, mafiya emas'),
    donResult: (isDetective) =>
      isDetective ? 'Ha, bu KOMISSAR!' : 'Yoʻq, Komissar emas',
    showGesture: 'Natijani imo-ishora bilan koʻrsating: 👍 ha / 👎 yoʻq',
    back: 'Orqaga',
    next: 'Keyingi',
    skip: 'Tanlovsiz oʻtish',
    finish: 'Tong otdi',
  },
  en: {
    steps: {
      lover: {
        title: 'Lover',
        script: 'The Lover wakes up and points at the player to distract tonight.',
      },
      mafia: {
        title: 'Mafia',
        script: 'The Mafia wakes up, meets each other and chooses a victim.',
      },
      don: {
        title: 'Don',
        script: 'The Don wakes up and searches for the Detective.',
      },
      detective: {
        title: 'Detective',
        script: 'The Detective wakes up and checks one player.',
      },
      doctor: {
        title: 'Doctor',
        script: 'The Doctor wakes up and chooses who to heal tonight.',
      },
      maniac: {
        title: 'Maniac',
        script: 'The Maniac wakes up and chooses a victim.',
      },
    },
    restrictions: {
      self: 'Self',
      teammate: 'Teammate',
      'repeat-heal': 'Healed last night',
      'self-heal-used': 'Self-heal used',
    },
    awake: 'Awake',
    chooseTarget: 'Choose a target',
    dead: 'This role is out of the game. Wait a few seconds so nobody gets suspicious, then continue.',
    blocked: (name) => `Distracted by the Lover: ${name}. No action tonight.`,
    detectiveResult: (isMafia) => (isMafia ? 'Yes, this is the MAFIA!' : 'No, not mafia'),
    donResult: (isDetective) =>
      isDetective ? 'Yes, this is the DETECTIVE!' : 'No, not the Detective',
    showGesture: 'Show the result with a gesture: 👍 yes / 👎 no',
    back: 'Back',
    next: 'Next',
    skip: 'Skip',
    finish: 'Morning',
  },
})
