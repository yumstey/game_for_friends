import { defineMessages } from '@/shared/i18n'

export const homeMessages = defineMessages({
  uz: {
    badge: 'Doʻstlar davrasi uchun',
    title: 'Qaysi oʻyinni oʻynaymiz?',
    subtitle: 'Bitta telefon — butun kompaniya. Oʻyinni tanlang va boshlang!',
    play: 'Oʻynash',
    resume: 'Davom etayotgan oʻyin',
    imposter: {
      title: 'Imposter',
      description:
        'Hamma bitta yashirin soʻzni biladi — faqat imposter bilmaydi. Ishoralar bering va uni fosh qiling!',
      meta: ['👥 3+ oʻyinchi', '⏱ 5–10 daq', '🔤 16 mavzu'],
    },
    mafia: {
      title: 'Mafia',
      description:
        'Klassik rolli oʻyin: Mafiya, Don, Komissar, Doktor, Manyak va Maʼshuqa. Boshlovchi uchun qulay rejim.',
      meta: ['👥 4+ oʻyinchi', '⏱ 20–40 daq', '🎭 7 rol'],
    },
    roster: (count: number) => `Roʻyxatda ${count} ta oʻyinchi`,
  },
  en: {
    badge: 'For your group of friends',
    title: 'What are we playing?',
    subtitle: 'One phone — the whole crew. Pick a game and start!',
    play: 'Play',
    resume: 'Game in progress',
    imposter: {
      title: 'Imposter',
      description:
        'Everyone knows the secret word — except the imposter. Give hints and expose them!',
      meta: ['👥 3+ players', '⏱ 5–10 min', '🔤 16 topics'],
    },
    mafia: {
      title: 'Mafia',
      description:
        'The classic role game: Mafia, Don, Detective, Doctor, Maniac and Lover. With a handy host mode.',
      meta: ['👥 4+ players', '⏱ 20–40 min', '🎭 7 roles'],
    },
    roster: (count: number) => `${count} players in the list`,
  },
})
