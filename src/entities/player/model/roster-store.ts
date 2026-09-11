import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { STORAGE_KEYS } from '@/shared/config'
import { clamp, createId } from '@/shared/lib'
import { DEFAULT_PLAYER_NAMES, PLAYER_NAME_MAX_LENGTH, ROSTER_LIMITS } from '../config/defaults'
import type { Player } from './types'

type NameFactory = (existingNames: readonly string[]) => string

interface RosterState {
  players: Player[]
  addPlayer: (name: string) => void
  renamePlayer: (id: string, name: string) => void
  removePlayer: (id: string) => void
  /** Oʻyinchilar sonini oʻzgartiradi: yetishmaganini qoʻshadi, ortiqchasini oxiridan olib tashlaydi. */
  resize: (count: number, createName: NameFactory) => void
  resetToDefaults: () => void
}

const createPlayer = (name: string): Player => ({
  id: createId(),
  name: name.slice(0, PLAYER_NAME_MAX_LENGTH),
})

const createDefaultPlayers = (): Player[] => DEFAULT_PLAYER_NAMES.map(createPlayer)

export const useRosterStore = create<RosterState>()(
  persist(
    (set) => ({
      players: createDefaultPlayers(),

      addPlayer: (name) =>
        set(({ players }) =>
          players.length >= ROSTER_LIMITS.max
            ? { players }
            : { players: [...players, createPlayer(name)] },
        ),

      renamePlayer: (id, name) =>
        set(({ players }) => ({
          players: players.map((player) =>
            player.id === id
              ? { ...player, name: name.slice(0, PLAYER_NAME_MAX_LENGTH) }
              : player,
          ),
        })),

      removePlayer: (id) =>
        set(({ players }) =>
          players.length <= ROSTER_LIMITS.min
            ? { players }
            : { players: players.filter((player) => player.id !== id) },
        ),

      resize: (count, createName) =>
        set(({ players }) => {
          const target = clamp(count, ROSTER_LIMITS.min, ROSTER_LIMITS.max)
          if (target <= players.length) return { players: players.slice(0, target) }

          const next = [...players]
          while (next.length < target) {
            next.push(createPlayer(createName(next.map((player) => player.name))))
          }
          return { players: next }
        }),

      resetToDefaults: () => set({ players: createDefaultPlayers() }),
    }),
    {
      name: STORAGE_KEYS.players,
      version: 1,
      partialize: ({ players }) => ({ players }),
    },
  ),
)
