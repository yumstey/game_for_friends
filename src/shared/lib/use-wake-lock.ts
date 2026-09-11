import { useEffect } from 'react'

/**
 * Oʻyin davomida ekran oʻchib qolmasligi uchun Screen Wake Lock API.
 * API mavjud boʻlmasa (eski brauzer yoki HTTP) hech narsa qilmaydi.
 */
export function useWakeLock(enabled = true): void {
  useEffect(() => {
    if (!enabled || typeof navigator === 'undefined' || !('wakeLock' in navigator)) {
      return
    }

    let sentinel: WakeLockSentinel | null = null
    let disposed = false

    const request = async () => {
      try {
        const lock = await navigator.wakeLock.request('screen')
        if (disposed) {
          void lock.release()
          return
        }
        sentinel = lock
      } catch {
        // Masalan, sahifa fon rejimida — jim oʻtkazamiz.
      }
    }

    const handleVisibility = () => {
      if (document.visibilityState === 'visible') void request()
    }

    void request()
    document.addEventListener('visibilitychange', handleVisibility)

    return () => {
      disposed = true
      document.removeEventListener('visibilitychange', handleVisibility)
      void sentinel?.release()
    }
  }, [enabled])
}
