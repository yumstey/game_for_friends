import { defineMessages } from '@/shared/i18n'
import type { MafiaRoleId, MafiaTeam } from './roles'
import type { MafiaWinner } from '../model/types'

interface RoleText {
  name: string
  description: string
  goal: string
}

interface MafiaEntityMessages {
  roles: Record<MafiaRoleId, RoleText>
  teams: Record<MafiaTeam, string>
  winners: Record<MafiaWinner, string>
}

/** Rollar, jamoalar va gʻoliblar nomlari — mafia domeniga tegishli matnlar. */
export const mafiaMessages = defineMessages<MafiaEntityMessages>({
  uz: {
    roles: {
      civilian: {
        name: 'Tinch aholi',
        description:
          'Maxsus qobiliyatingiz yoʻq. Kunduzi mantiq va sezgi bilan mafiyani fosh qiling.',
        goal: 'Barcha mafiya va manyakni shahardan chiqarish.',
      },
      mafia: {
        name: 'Mafiya',
        description:
          'Har tunda sheriklaringiz bilan bitta qurbon tanlaysiz. Kunduzi oʻzingizni tinch odam qilib koʻrsating.',
        goal: 'Tinch aholi soniga tenglashish.',
      },
      don: {
        name: 'Don',
        description:
          'Mafiya boshligʻi. Mafiya bilan birga qurbon tanlaydi va har tunda bir kishini Komissar emasmi deb tekshiradi.',
        goal: 'Komissarni topib, mafiyani gʻalabaga olib chiqish.',
      },
      detective: {
        name: 'Komissar',
        description: 'Har tunda bitta oʻyinchini tekshirasiz: u mafiyami yoki yoʻq.',
        goal: 'Mafiyani topib, kunduzi shaharni toʻgʻri yoʻlga boshlash.',
      },
      doctor: {
        name: 'Doktor',
        description:
          'Har tunda bitta oʻyinchini davolaysiz. Bir odamni ketma-ket ikki tun davolay olmaysiz, oʻzingizni esa faqat bir marta.',
        goal: 'Tinch aholini tirik saqlash.',
      },
      lover: {
        name: 'Maʼshuqa',
        description:
          'Har tunda bitta oʻyinchini "band qilasiz": u shu tun qobiliyatidan foydalana olmaydi va ertasi kuni ovoz bermaydi.',
        goal: 'Tinch aholi bilan birga gʻalaba qozonish.',
      },
      maniac: {
        name: 'Manyak',
        description:
          'Hech kimga boʻysunmaysiz. Har tunda bitta oʻyinchini oʻldirasiz — mafiyani ham, tinch aholini ham.',
        goal: 'Oxirigacha tirik qolish (oxirgi ikki kishidan biri boʻlish).',
      },
    },
    teams: {
      town: 'Tinch aholi jamoasi',
      mafia: 'Mafiya jamoasi',
      solo: 'Yakka oʻyinchi',
    },
    winners: {
      town: 'Tinch aholi gʻalaba qozondi!',
      mafia: 'Mafiya gʻalaba qozondi!',
      maniac: 'Manyak gʻalaba qozondi!',
      draw: 'Durang!',
    },
  },
  en: {
    roles: {
      civilian: {
        name: 'Civilian',
        description: 'You have no special ability. Use logic and intuition to expose the mafia.',
        goal: 'Eliminate every mafia member and the maniac.',
      },
      mafia: {
        name: 'Mafia',
        description:
          'Every night you pick a victim with your partners. During the day, pretend to be innocent.',
        goal: 'Equal the number of civilians.',
      },
      don: {
        name: 'Don',
        description:
          'The mafia boss. Chooses the victim with the mafia and checks one player each night to find the Detective.',
        goal: 'Find the Detective and lead the mafia to victory.',
      },
      detective: {
        name: 'Detective',
        description: 'Every night you check one player: are they mafia or not?',
        goal: 'Find the mafia and guide the town during the day.',
      },
      doctor: {
        name: 'Doctor',
        description:
          'Every night you heal one player. You cannot heal the same person two nights in a row, and yourself only once.',
        goal: 'Keep the town alive.',
      },
      lover: {
        name: 'Lover',
        description:
          'Every night you "distract" one player: they cannot use their ability that night and cannot vote the next day.',
        goal: 'Win together with the town.',
      },
      maniac: {
        name: 'Maniac',
        description:
          'You obey no one. Every night you kill one player — mafia or civilian alike.',
        goal: 'Survive until the end (be one of the last two players).',
      },
    },
    teams: {
      town: 'Town',
      mafia: 'Mafia',
      solo: 'Solo',
    },
    winners: {
      town: 'The town wins!',
      mafia: 'The mafia wins!',
      maniac: 'The maniac wins!',
      draw: 'It is a draw!',
    },
  },
})
