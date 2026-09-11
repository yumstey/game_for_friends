/** Qurilma imkoniyatlari: vibratsiya va ovozli signal. Qoʻllab-quvvatlanmasa jim oʻtadi. */

export function vibrate(pattern: number | number[]): void {
  if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
    navigator.vibrate(pattern)
  }
}

let audioContext: AudioContext | null = null

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined' || !('AudioContext' in window)) return null
  audioContext ??= new AudioContext()
  return audioContext
}

/**
 * Brauzerlar ovozni faqat foydalanuvchi harakatidan keyin ruxsat beradi.
 * Uni "Start" tugmasi bosilganda chaqiring.
 */
export function unlockAudio(): void {
  const context = getAudioContext()
  if (context?.state === 'suspended') void context.resume()
}

/** Qisqa signal ketma-ketligi (masalan, taymer tugaganda). */
export function playAlarm(beeps = 3): void {
  const context = getAudioContext()
  if (!context) return

  const beepDuration = 0.16
  const gap = 0.12

  for (let i = 0; i < beeps; i++) {
    const startAt = context.currentTime + i * (beepDuration + gap)
    const oscillator = context.createOscillator()
    const gain = context.createGain()

    oscillator.type = 'sine'
    oscillator.frequency.value = 880
    gain.gain.setValueAtTime(0.0001, startAt)
    gain.gain.exponentialRampToValueAtTime(0.3, startAt + 0.02)
    gain.gain.exponentialRampToValueAtTime(0.0001, startAt + beepDuration)

    oscillator.connect(gain).connect(context.destination)
    oscillator.start(startAt)
    oscillator.stop(startAt + beepDuration)
  }
}
