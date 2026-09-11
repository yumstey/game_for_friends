import { defineMessages } from '@/shared/i18n'

export const mafiaRolesMessages = defineMessages({
  uz: {
    rolesTitle: 'Rollar',
    rolesSummary: (mafia: number, town: number) =>
      `Mafiya: ${mafia} · Qolganlar: ${town}`,
    auto: 'Avtomatik taqsimlash',
    autoHint: 'Oʻyinchilar soniga qarab eng muvozanatli variant',
    civiliansHint: 'Qolgan oʻrinlar avtomatik toʻldiriladi',
    optionsTitle: 'Qoidalar',
    revealRole: 'Oʻlganning roli ochilsin',
    revealRoleHint:
      'Oʻldirilgan yoki chiqarilgan oʻyinchining roli hammaga eʼlon qilinadi',
    timer: 'Kunduzgi muhokama taymeri',
  },
  en: {
    rolesTitle: 'Roles',
    rolesSummary: (mafia: number, town: number) => `Mafia: ${mafia} · Others: ${town}`,
    auto: 'Automatic distribution',
    autoHint: 'The most balanced setup for the number of players',
    civiliansHint: 'Remaining seats are filled automatically',
    optionsTitle: 'Rules',
    revealRole: 'Reveal role on death',
    revealRoleHint: 'The role of a killed or voted-out player is announced to everyone',
    timer: 'Day discussion timer',
  },
})
