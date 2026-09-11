import type { ImposterSettings } from '../model/types'

export const IMPOSTER_MIN_PLAYERS = 3

export const DISCUSSION_PRESETS_SECONDS = [0, 60, 120, 180, 300] as const

export const DEFAULT_IMPOSTER_SETTINGS: ImposterSettings = {
  topicIds: ['home', 'nature', 'animals', 'cartoons', 'movies', 'food'],
  imposterCount: 1,
  showTopicToImposter: true,
  discussionSeconds: 120,
}

/** Har 3 oʻyinchiga koʻpi bilan 1 imposter: 3–5 → 1, 6–8 → 2, 9–11 → 3. */
export function getMaxImposters(playerCount: number): number {
  return Math.max(1, Math.floor(playerCount / IMPOSTER_MIN_PLAYERS))
}
