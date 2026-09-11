import type { MafiaPhase } from '@/entities/mafia'
import { defineMessages } from '@/shared/i18n'

interface MafiaGameMessages {
  phaseLabel: (phase: MafiaPhase, cycle: number) => string
  aliveCount: (alive: number, total: number) => string
  reveal: {
    takePhone: string
    tapToReveal: string
    goal: string
    partners: string
    hideAndPass: string
    openFirst: string
    allDone: string
    allDoneHint: string
    startNight: string
  }
  night: {
    title: (cycle: number) => string
    hint: string
  }
  morning: {
    title: string
    subtitle: (cycle: number) => string
    killed: string
    roleHidden: string
    nobodyDied: string
    hostOnly: string
    saved: (name: string) => string
    blocked: (name: string) => string
    toDay: string
    toResult: string
  }
  day: {
    title: (cycle: number) => string
    hint: string
    alive: string
    dead: string
    toVoting: string
  }
  verdict: {
    eliminated: (name: string) => string
    nobody: string
    nobodyHint: string
    toNight: string
    toResult: string
  }
  over: {
    players: string
    log: string
    playAgain: string
    settings: string
    alive: string
    dead: string
  }
  undo: string
  journal: string
  showRoles: string
  hideRoles: string
}

const uzPhases: Record<MafiaPhase, (cycle: number) => string> = {
  reveal: () => 'Rollarni tarqatish',
  night: (cycle) => `${cycle}-tun`,
  morning: (cycle) => `${cycle}-tun natijasi`,
  day: (cycle) => `${cycle}-kun · muhokama`,
  voting: (cycle) => `${cycle}-kun · ovoz berish`,
  verdict: (cycle) => `${cycle}-kun · hukm`,
  over: () => 'Oʻyin tugadi',
}

const enPhases: Record<MafiaPhase, (cycle: number) => string> = {
  reveal: () => 'Dealing roles',
  night: (cycle) => `Night ${cycle}`,
  morning: (cycle) => `Night ${cycle} results`,
  day: (cycle) => `Day ${cycle} · discussion`,
  voting: (cycle) => `Day ${cycle} · voting`,
  verdict: (cycle) => `Day ${cycle} · verdict`,
  over: () => 'Game over',
}

export const mafiaGameMessages = defineMessages<MafiaGameMessages>({
  uz: {
    phaseLabel: (phase, cycle) => uzPhases[phase](cycle),
    aliveCount: (alive, total) => `Tirik: ${alive}/${total}`,
    reveal: {
      takePhone: 'Telefon shu oʻyinchida',
      tapToReveal: 'Rolingizni koʻrish uchun bosing',
      goal: 'Maqsad',
      partners: 'Sheriklaringiz',
      hideAndPass: 'Yashirish va uzatish',
      openFirst: 'Avval kartani oching',
      allDone: 'Rollar tarqatildi!',
      allDoneHint:
        'Telefonni boshlovchiga bering. Hamma koʻzini yumsin — shahar uyquga ketadi.',
      startNight: 'Birinchi tunni boshlash',
    },
    night: {
      title: (cycle) => `${cycle}-tun`,
      hint: 'Shahar uxlaydi. Hamma koʻzini yumsin — boshlovchi rollarni navbat bilan uygʻotadi.',
    },
    morning: {
      title: 'Tong otdi',
      subtitle: (cycle) => `${cycle}-tun natijalari`,
      killed: 'Bu tun halok boʻldi',
      roleHidden: 'Rol sir',
      nobodyDied: 'Bu tun hech kim halok boʻlmadi',
      hostOnly: 'Faqat boshlovchi uchun',
      saved: (name) => `Doktor qutqarib qoldi: ${name}`,
      blocked: (name) => `Maʼshuqa band qildi: ${name} (bugun ovoz bermaydi)`,
      toDay: 'Kunduzgi muhokama',
      toResult: 'Natijani koʻrish',
    },
    day: {
      title: (cycle) => `${cycle}-kun`,
      hint: 'Muhokama: kim mafiya? Har bir oʻyinchi fikrini aytsin.',
      alive: 'Tiriklar',
      dead: 'Oʻyindan chiqqanlar',
      toVoting: 'Ovoz berishga oʻtish',
    },
    verdict: {
      eliminated: (name) => `${name} shahardan chiqarildi`,
      nobody: 'Hech kim chiqarilmadi',
      nobodyHint: 'Shahar qaror qabul qila olmadi.',
      toNight: 'Tunni boshlash',
      toResult: 'Natijani koʻrish',
    },
    over: {
      players: 'Barcha rollar',
      log: 'Oʻyin jurnali',
      playAgain: 'Qayta oʻynash',
      settings: 'Sozlamalar',
      alive: 'Tirik',
      dead: 'Halok',
    },
    undo: 'Oxirgi harakatni bekor qilish',
    journal: 'Oʻyin jurnali',
    showRoles: 'Rollarni koʻrsatish',
    hideRoles: 'Rollarni yashirish',
  },
  en: {
    phaseLabel: (phase, cycle) => enPhases[phase](cycle),
    aliveCount: (alive, total) => `Alive: ${alive}/${total}`,
    reveal: {
      takePhone: 'This player holds the phone',
      tapToReveal: 'Tap to see your role',
      goal: 'Goal',
      partners: 'Your partners',
      hideAndPass: 'Hide and pass',
      openFirst: 'Reveal the card first',
      allDone: 'All roles are dealt!',
      allDoneHint:
        'Give the phone to the host. Everyone closes their eyes — the town falls asleep.',
      startNight: 'Start the first night',
    },
    night: {
      title: (cycle) => `Night ${cycle}`,
      hint: 'The town sleeps. Everyone closes their eyes — the host wakes the roles one by one.',
    },
    morning: {
      title: 'Morning has come',
      subtitle: (cycle) => `Results of night ${cycle}`,
      killed: 'Killed tonight',
      roleHidden: 'Role hidden',
      nobodyDied: 'Nobody died tonight',
      hostOnly: 'Host only',
      saved: (name) => `Saved by the Doctor: ${name}`,
      blocked: (name) => `Distracted by the Lover: ${name} (cannot vote today)`,
      toDay: 'Day discussion',
      toResult: 'See the result',
    },
    day: {
      title: (cycle) => `Day ${cycle}`,
      hint: 'Discussion: who is the mafia? Let every player speak.',
      alive: 'Alive',
      dead: 'Out of the game',
      toVoting: 'Go to voting',
    },
    verdict: {
      eliminated: (name) => `${name} leaves the town`,
      nobody: 'Nobody was eliminated',
      nobodyHint: 'The town could not agree.',
      toNight: 'Start the night',
      toResult: 'See the result',
    },
    over: {
      players: 'All roles',
      log: 'Game log',
      playAgain: 'Play again',
      settings: 'Settings',
      alive: 'Alive',
      dead: 'Dead',
    },
    undo: 'Undo last action',
    journal: 'Game log',
    showRoles: 'Show roles',
    hideRoles: 'Hide roles',
  },
})
