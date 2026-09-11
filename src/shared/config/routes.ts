export const ROUTES = {
  home: '/',
  imposterSetup: '/imposter',
  imposterGame: '/imposter/play',
  mafiaSetup: '/mafia',
  mafiaGame: '/mafia/play',
} as const

export type AppRoute = (typeof ROUTES)[keyof typeof ROUTES]
