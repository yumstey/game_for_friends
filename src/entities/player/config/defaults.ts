/** Standart oʻyinchilar — birinchi ochilganda roʻyxat shular bilan toʻladi. */
export const DEFAULT_PLAYER_NAMES = [
  'Rustam',
  'Bekzat',
  'Bekmurat',
  'Samat',
  'Almaz',
  'Diyar',
  'Marat',
] as const

export const PLAYER_NAME_MAX_LENGTH = 20

/** Roʻyxatning umumiy chegarasi (oʻyinlar oʻzining minimal talabini alohida tekshiradi). */
export const ROSTER_LIMITS = { min: 1, max: 24 } as const
