import type { GuideSection } from '@/shared/ui'
import { defineMessages } from '@/shared/i18n'

interface MafiaSetupMessages {
  title: string
  subtitle: string
  rules: string
  rulesTitle: string
  rulesSections: GuideSection[]
  resumeTitle: string
  resumeDescription: string
  resumeAction: string
}

export const mafiaSetupMessages = defineMessages<MafiaSetupMessages>({
  uz: {
    title: 'Mafia',
    subtitle: 'Oʻyin sozlamalari',
    rules: 'Qoidalar',
    rulesTitle: 'Mafia qoidalari',
    rulesSections: [
      {
        title: 'Tayyorgarlik',
        items: [
          'Bitta boshlovchi tanlanadi — u oʻyinda qatnashmaydi va telefonni boshqaradi.',
          'Telefon navbat bilan uzatiladi: har kim faqat oʻz rolini koʻradi.',
          'Mafiya aʼzolari bir-birini kartadayoq koʻradi.',
        ],
      },
      {
        title: 'Tun',
        items: [
          'Hamma koʻzini yumadi. Boshlovchi rollarni tartib bilan uygʻotadi: Maʼshuqa → Mafiya → Don → Komissar → Doktor → Manyak.',
          'Uygʻongan rol imo-ishora bilan nishonni koʻrsatadi, boshlovchi uni ilovada belgilaydi.',
          'Doktor davolagan odam shu tun oʻlmaydi. Maʼshuqa band qilgan odam qobiliyatidan foydalana olmaydi.',
        ],
      },
      {
        title: 'Kun',
        items: [
          'Boshlovchi tun natijasini eʼlon qiladi.',
          'Muhokamadan soʻng ovoz beriladi va koʻpchilik tanlagan oʻyinchi chiqariladi.',
          'Xato bosib yuborilsa — tepadagi “Ortga” tugmasi bilan oxirgi harakatni bekor qiling.',
        ],
      },
      {
        title: 'Gʻalaba',
        items: [
          'Tinch aholi — barcha mafiya va manyak chiqarilganda.',
          'Mafiya — manyak yoʻq boʻlib, mafiya soni qolganlar soniga tenglashganda.',
          'Manyak — mafiya qolmagan va u oxirgi ikki kishidan biri boʻlganda.',
        ],
      },
    ],
    resumeTitle: 'Tugallanmagan oʻyin bor',
    resumeDescription: 'Oxirgi holatdan davom etishingiz mumkin',
    resumeAction: 'Davom etish',
  },
  en: {
    title: 'Mafia',
    subtitle: 'Game setup',
    rules: 'Rules',
    rulesTitle: 'Mafia rules',
    rulesSections: [
      {
        title: 'Setup',
        items: [
          'Choose a host — they do not play and control the phone.',
          'The phone is passed around: everyone sees only their own role.',
          'Mafia members see each other right on their cards.',
        ],
      },
      {
        title: 'Night',
        items: [
          'Everyone closes their eyes. The host wakes roles in order: Lover → Mafia → Don → Detective → Doctor → Maniac.',
          'The awake role points at a target, and the host marks it in the app.',
          'A player healed by the Doctor survives the night. A player distracted by the Lover cannot use their ability.',
        ],
      },
      {
        title: 'Day',
        items: [
          'The host announces the night results.',
          'After the discussion, the town votes and the chosen player is eliminated.',
          'Made a mistake? Use the “Undo” button at the top to revert the last action.',
        ],
      },
      {
        title: 'Victory',
        items: [
          'Town — when all mafia members and the maniac are gone.',
          'Mafia — when the maniac is gone and the mafia equals the rest in number.',
          'Maniac — when no mafia is left and they are one of the last two players.',
        ],
      },
    ],
    resumeTitle: 'Unfinished game',
    resumeDescription: 'You can continue from where you left off',
    resumeAction: 'Resume',
  },
})
