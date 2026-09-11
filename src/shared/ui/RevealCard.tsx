import type { ReactNode } from 'react'
import { cn } from '@/shared/lib'

export interface RevealCardProps {
  revealed: boolean
  onReveal: () => void
  /** Yopiq tomon — kimga tegishli ekani va "bosing" ishorasi. */
  front: ReactNode
  /** Ochiq tomon — maxfiy maʼlumot. */
  back: ReactNode
  frontLabel: string
  backClassName?: string
  className?: string
}

/**
 * 3D aylanadigan maxfiy karta ("telefonni uzat va och" mexanikasi).
 * Ikkala tomon bitta grid katakda turadi, shuning uchun balandlik kattaroq tomonga moslashadi.
 */
export function RevealCard({
  revealed,
  onReveal,
  front,
  back,
  frontLabel,
  backClassName,
  className,
}: RevealCardProps) {
  return (
    <div className={cn('perspective-[1400px]', className)}>
      <div
        className={cn(
          'grid transition-transform duration-600 ease-[cubic-bezier(0.3,1.3,0.5,1)] transform-3d',
          revealed && 'rotate-y-180',
        )}
      >
        <button
          type="button"
          onClick={onReveal}
          disabled={revealed}
          aria-label={frontLabel}
          aria-hidden={revealed}
          className="col-start-1 row-start-1 flex min-h-[23rem] flex-col items-center justify-center gap-4 rounded-4xl border border-border bg-card p-6 text-center shadow-xl shadow-black/5 backface-hidden active:scale-[0.99]"
        >
          {front}
        </button>

        <div
          aria-hidden={!revealed}
          aria-live="polite"
          className={cn(
            'col-start-1 row-start-1 flex min-h-[23rem] rotate-y-180 flex-col items-center justify-center gap-4 rounded-4xl p-6 text-center shadow-xl backface-hidden',
            backClassName,
          )}
        >
          {revealed && back}
        </div>
      </div>
    </div>
  )
}
