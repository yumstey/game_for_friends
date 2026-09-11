import { NIGHT_STEP_IDS, isMafiaTeam, type NightStepId } from '../config/roles'
import type { MafiaPlayer, MafiaSession, NightActions, NightReport } from './types'

export const EMPTY_NIGHT_ACTIONS: NightActions = {
  lover: null,
  mafia: null,
  don: null,
  detective: null,
  doctor: null,
  maniac: null,
}

/**
 * active  — rol tirik va harakat qila oladi
 * dead    — rol egasi oʻyindan chiqqan (boshlovchi baribir "chaqiradi", shubha tugʻilmasin)
 * blocked — Maʼshuqa bu tunda uni band qildi
 */
export type NightStepAvailability = 'active' | 'dead' | 'blocked'

export type TargetRestriction = 'self' | 'teammate' | 'repeat-heal' | 'self-heal-used'

/** Oʻyinda mavjud rollarga tegishli tungi qadamlar (tartib boʻyicha). */
export function getNightSteps(players: readonly MafiaPlayer[]): NightStepId[] {
  const roles = new Set(players.map((player) => player.role))

  return NIGHT_STEP_IDS.filter((step) =>
    step === 'mafia' ? roles.has('mafia') || roles.has('don') : roles.has(step),
  )
}

/** Qadamni bajaruvchi tirik oʻyinchilar. */
export function getStepActors(players: readonly MafiaPlayer[], step: NightStepId): MafiaPlayer[] {
  return players.filter(
    (player) => player.alive && (step === 'mafia' ? isMafiaTeam(player.role) : player.role === step),
  )
}

export function getStepAvailability(
  session: Pick<MafiaSession, 'players' | 'night'>,
  step: NightStepId,
): NightStepAvailability {
  const actors = getStepActors(session.players, step)
  if (actors.length === 0) return 'dead'

  const blockedId = step === 'lover' ? null : session.night.lover
  if (blockedId && actors.every((actor) => actor.id === blockedId)) return 'blocked'

  return 'active'
}

/** Nishonni tanlab boʻlmasa — sababini qaytaradi. */
export function getTargetRestriction(
  session: Pick<MafiaSession, 'doctorLastTargetId' | 'doctorSelfHealUsed'>,
  step: NightStepId,
  target: MafiaPlayer,
): TargetRestriction | null {
  switch (step) {
    case 'mafia':
      return isMafiaTeam(target.role) ? 'teammate' : null
    case 'don':
      if (target.role === 'don') return 'self'
      return isMafiaTeam(target.role) ? 'teammate' : null
    case 'doctor':
      if (target.id === session.doctorLastTargetId) return 'repeat-heal'
      return target.role === 'doctor' && session.doctorSelfHealUsed ? 'self-heal-used' : null
    case 'detective':
    case 'maniac':
    case 'lover':
      return target.role === step ? 'self' : null
  }
}

/**
 * Tekshiruv natijasi:
 * - Komissar uchun: nishon mafiya jamoasidanmi (Don ham mafiya sifatida chiqadi);
 * - Don uchun: nishon Komissarmi.
 */
export function getCheckResult(
  players: readonly MafiaPlayer[],
  step: 'detective' | 'don',
  targetId: string | null,
): boolean | null {
  const target = players.find((player) => player.id === targetId)
  if (!target) return null

  return step === 'detective' ? isMafiaTeam(target.role) : target.role === 'detective'
}

/** Faqat haqiqatda amalga oshgan harakatlar (oʻlik/bloklangan qadamlar tozalanadi). */
export function getEffectiveActions(session: Pick<MafiaSession, 'players' | 'night'>): NightActions {
  const effective = { ...EMPTY_NIGHT_ACTIONS }

  for (const step of NIGHT_STEP_IDS) {
    if (getStepAvailability(session, step) === 'active') effective[step] = session.night[step]
  }

  return effective
}

/** Tun natijasini hisoblaydi: kim oʻldi, kim qutqarildi. Holatni oʻzgartirmaydi. */
export function resolveNight(session: Pick<MafiaSession, 'players' | 'night' | 'cycle'>): {
  actions: NightActions
  report: NightReport
} {
  const actions = getEffectiveActions(session)
  const attacked = new Set([actions.mafia, actions.maniac].filter((id) => id !== null))
  const savedIds: string[] = []

  if (actions.doctor && attacked.has(actions.doctor)) {
    attacked.delete(actions.doctor)
    savedIds.push(actions.doctor)
  }

  const killedIds = session.players
    .filter((player) => player.alive && attacked.has(player.id))
    .map((player) => player.id)

  return {
    actions,
    report: { cycle: session.cycle, killedIds, savedIds, blockedId: actions.lover },
  }
}
