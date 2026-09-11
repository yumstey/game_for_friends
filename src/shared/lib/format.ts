/** Soniyalarni `m:ss` koʻrinishiga oʻtkazadi: 95 → "1:35". */
export function formatDuration(totalSeconds: number): string {
  const safe = Math.max(0, Math.ceil(totalSeconds))
  const minutes = Math.floor(safe / 60)
  const seconds = safe % 60

  return `${minutes}:${seconds.toString().padStart(2, '0')}`
}

/** Qiymatni `[min, max]` oraligʻiga siqadi. */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value))
}
