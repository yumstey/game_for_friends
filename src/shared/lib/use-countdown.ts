import { useEffect, useEffectEvent, useRef, useState } from 'react'

export type CountdownStatus = 'idle' | 'running' | 'paused' | 'finished'

interface UseCountdownOptions {
  onFinish?: () => void
}

export interface Countdown {
  status: CountdownStatus
  /** Qolgan vaqt (soniya, butun songa yuqoriga yuvarlangan). */
  remainingSeconds: number
  /** 0…1 — qancha vaqt oʻtgani. */
  progress: number
  start: () => void
  pause: () => void
  reset: () => void
}

const TICK_MS = 200

/**
 * Aniq teskari sanoq taymeri.
 * Interval hisobiga emas, `endAt` vaqt belgisiga tayanadi — shuning uchun
 * tab fonga oʻtsa ham vaqt "suzib" ketmaydi.
 */
export function useCountdown(
  durationSeconds: number,
  { onFinish }: UseCountdownOptions = {},
): Countdown {
  const durationMs = durationSeconds * 1000
  const [status, setStatus] = useState<CountdownStatus>('idle')
  const [remainingMs, setRemainingMs] = useState(durationMs)
  const endAtRef = useRef(0)

  const handleFinish = useEffectEvent(() => onFinish?.())

  useEffect(() => {
    if (status !== 'running') return

    const intervalId = window.setInterval(() => {
      const left = Math.max(0, endAtRef.current - Date.now())
      setRemainingMs(left)

      if (left === 0) {
        setStatus('finished')
        handleFinish()
      }
    }, TICK_MS)

    return () => window.clearInterval(intervalId)
  }, [status])

  const start = () => {
    const base = status === 'finished' ? durationMs : remainingMs
    endAtRef.current = Date.now() + base
    setRemainingMs(base)
    setStatus('running')
  }

  const pause = () => {
    if (status !== 'running') return
    setRemainingMs(Math.max(0, endAtRef.current - Date.now()))
    setStatus('paused')
  }

  const reset = () => {
    setRemainingMs(durationMs)
    setStatus('idle')
  }

  return {
    status,
    remainingSeconds: Math.ceil(remainingMs / 1000),
    progress: durationMs === 0 ? 1 : 1 - remainingMs / durationMs,
    start,
    pause,
    reset,
  }
}
