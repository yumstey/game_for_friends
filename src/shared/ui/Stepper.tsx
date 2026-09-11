import { Minus, Plus } from 'lucide-react'
import { useState } from 'react'
import { clamp, cn } from '@/shared/lib'

export interface StepperProps {
  value: number
  onChange: (value: number) => void
  /** Ekran oʻquvchilar uchun nom. */
  label: string
  min?: number
  max?: number
  disabled?: boolean
  size?: 'sm' | 'md'
  className?: string
}

/** `−` / `+` tugmalari va qoʻlda yoziladigan son maydoni. */
export function Stepper({
  value,
  onChange,
  label,
  min = 0,
  max = Number.MAX_SAFE_INTEGER,
  disabled = false,
  size = 'md',
  className,
}: StepperProps) {
  // Foydalanuvchi yozayotgan paytdagi vaqtinchalik qiymat (null — tahrirlanmayapti).
  const [draft, setDraft] = useState<string | null>(null)

  const commit = (raw: string) => {
    const parsed = Number.parseInt(raw, 10)
    if (!Number.isNaN(parsed)) onChange(clamp(parsed, min, max))
    setDraft(null)
  }

  const buttonClass = cn(
    'inline-flex items-center justify-center rounded-xl bg-muted text-foreground transition active:scale-90 disabled:opacity-35',
    size === 'md' ? 'size-10 [&_svg]:size-4' : 'size-8 [&_svg]:size-3.5',
  )

  return (
    <div
      role="group"
      aria-label={label}
      className={cn('inline-flex items-center gap-1.5', className)}
    >
      <button
        type="button"
        className={buttonClass}
        aria-label={`${label} −`}
        disabled={disabled || value <= min}
        onClick={() => onChange(clamp(value - 1, min, max))}
      >
        <Minus strokeWidth={2.5} />
      </button>

      <input
        type="number"
        inputMode="numeric"
        aria-label={label}
        disabled={disabled}
        min={min}
        max={max}
        value={draft ?? value}
        onFocus={(event) => {
          setDraft(String(value))
          event.currentTarget.select()
        }}
        onChange={(event) => setDraft(event.target.value)}
        onBlur={(event) => commit(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === 'Enter') event.currentTarget.blur()
        }}
        className={cn(
          'rounded-xl bg-transparent text-center font-display font-semibold tabular-nums outline-none focus:bg-muted disabled:opacity-50',
          size === 'md' ? 'h-10 w-12 text-lg' : 'h-8 w-9 text-base',
        )}
      />

      <button
        type="button"
        className={buttonClass}
        aria-label={`${label} +`}
        disabled={disabled || value >= max}
        onClick={() => onChange(clamp(value + 1, min, max))}
      >
        <Plus strokeWidth={2.5} />
      </button>
    </div>
  )
}
