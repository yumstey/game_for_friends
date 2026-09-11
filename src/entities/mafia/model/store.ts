import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { STORAGE_KEYS } from '@/shared/config'
import type { NightStepId, SpecialRoleId } from '../config/roles'
import { recommendRoleCounts } from './distribution'
import {
  advanceReveal,
  completeNight,
  continueAfterVerdict,
  eliminateByVote,
  setNightStep,
  setNightTarget,
  startDay,
  startNight,
  startVoting,
} from './session'
import type { MafiaSession, MafiaSettings } from './types'

/** Nechta qadam orqaga qaytish mumkin. */
const MAX_HISTORY = 30

const DEFAULT_PLAYER_COUNT = 7

export const DEFAULT_MAFIA_SETTINGS: MafiaSettings = {
  autoRoles: true,
  roleCounts: recommendRoleCounts(DEFAULT_PLAYER_COUNT),
  revealRoleOnDeath: true,
  discussionSeconds: 120,
}

type SessionUpdater = (session: MafiaSession) => MafiaSession

interface MafiaState {
  settings: MafiaSettings
  session: MafiaSession | null
  /** Faza oʻtishlaridan oldingi holatlar — "Ortga qaytarish" uchun. */
  history: MafiaSession[]

  updateSettings: (patch: Partial<MafiaSettings>) => void
  setRoleCount: (role: SpecialRoleId, count: number) => void

  startGame: (session: MafiaSession) => void
  revealNext: () => void
  startNight: () => void
  selectNightTarget: (step: NightStepId, targetId: string | null) => void
  goToNightStep: (index: number) => void
  completeNight: () => void
  startDay: () => void
  startVoting: () => void
  vote: (playerId: string | null) => void
  continueAfterVerdict: () => void
  undo: () => void
  endSession: () => void
}

export const useMafiaStore = create<MafiaState>()(
  persist(
    (set, get) => {
      /** Tarixga yozmasdan yangilash (tanlovlar, qadamlar). */
      const patch = (update: SessionUpdater) => {
        const { session } = get()
        if (session) set({ session: update(session) })
      }

      /** Muhim oʻtish: oldingi holat tarixga saqlanadi. */
      const commit = (update: SessionUpdater) => {
        const { session, history } = get()
        if (!session) return
        set({
          session: update(session),
          history: [...history, session].slice(-MAX_HISTORY),
        })
      }

      return {
        settings: DEFAULT_MAFIA_SETTINGS,
        session: null,
        history: [],

        updateSettings: (changes) =>
          set(({ settings }) => ({ settings: { ...settings, ...changes } })),

        setRoleCount: (role, count) =>
          set(({ settings }) => ({
            settings: {
              ...settings,
              roleCounts: { ...settings.roleCounts, [role]: Math.max(0, count) },
            },
          })),

        startGame: (session) => set({ session, history: [] }),
        revealNext: () => patch(advanceReveal),
        startNight: () => commit(startNight),
        selectNightTarget: (step, targetId) =>
          patch((session) => setNightTarget(session, step, targetId)),
        goToNightStep: (index) => patch((session) => setNightStep(session, index)),
        completeNight: () => commit(completeNight),
        startDay: () => commit(startDay),
        startVoting: () => commit(startVoting),
        vote: (playerId) => commit((session) => eliminateByVote(session, playerId)),
        continueAfterVerdict: () => commit(continueAfterVerdict),

        undo: () => {
          const { history } = get()
          const previous = history.at(-1)
          if (previous) set({ session: previous, history: history.slice(0, -1) })
        },

        endSession: () => set({ session: null, history: [] }),
      }
    },
    {
      name: STORAGE_KEYS.mafia,
      version: 1,
      partialize: ({ settings, session, history }) => ({ settings, session, history }),
    },
  ),
)
