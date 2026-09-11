import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { STORAGE_KEYS } from '@/shared/config'
import { DEFAULT_IMPOSTER_SETTINGS } from '../config/rules'
import { advanceReveal, createSession, revealImposters } from './session'
import type { ImposterRound, ImposterSession, ImposterSettings } from './types'

/** Tarix juda uzayib ketmasligi uchun (barcha soʻzlar ~500 ta). */
const MAX_USED_WORDS = 600

interface ImposterState {
  settings: ImposterSettings
  session: ImposterSession | null
  /** Chiqib boʻlgan soʻzlar — ular tugamaguncha takrorlanmaydi. */
  usedWordKeys: string[]

  updateSettings: (patch: Partial<ImposterSettings>) => void
  toggleTopic: (topicId: string) => void

  startRound: (round: ImposterRound, options?: { resetWordHistory?: boolean }) => void
  revealNext: () => void
  revealImposters: () => void
  endSession: () => void
}

type PersistedImposterState = Pick<ImposterState, 'settings' | 'session' | 'usedWordKeys'>

export const useImposterStore = create<ImposterState>()(
  persist(
    (set) => {
      const updateSession = (update: (session: ImposterSession) => ImposterSession) =>
        set(({ session }) => (session ? { session: update(session) } : {}))

      return {
        settings: DEFAULT_IMPOSTER_SETTINGS,
        session: null,
        usedWordKeys: [],

        updateSettings: (patch) =>
          set(({ settings }) => ({ settings: { ...settings, ...patch } })),

        toggleTopic: (topicId) =>
          set(({ settings }) => ({
            settings: {
              ...settings,
              topicIds: settings.topicIds.includes(topicId)
                ? settings.topicIds.filter((id) => id !== topicId)
                : [...settings.topicIds, topicId],
            },
          })),

        startRound: (round, { resetWordHistory = false } = {}) =>
          set(({ usedWordKeys }) => ({
            session: createSession(round),
            usedWordKeys: [...(resetWordHistory ? [] : usedWordKeys), round.wordKey].slice(
              -MAX_USED_WORDS,
            ),
          })),

        revealNext: () => updateSession(advanceReveal),
        revealImposters: () => updateSession(revealImposters),
        endSession: () => set({ session: null }),
      }
    },
    {
      name: STORAGE_KEYS.imposter,
      version: 2,
      partialize: ({ settings, session, usedWordKeys }): PersistedImposterState => ({
        settings,
        session,
        usedWordKeys,
      }),
      // v1 da ovoz berish fazalari bor edi — eski sessiyani tashlab, sozlamalarni saqlaymiz.
      migrate: (persisted, version) => {
        const state = persisted as Partial<PersistedImposterState>
        return {
          settings: { ...DEFAULT_IMPOSTER_SETTINGS, ...state.settings },
          usedWordKeys: state.usedWordKeys ?? [],
          session: version < 2 ? null : (state.session ?? null),
        }
      },
    },
  ),
)
