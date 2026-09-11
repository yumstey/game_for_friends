import { Check } from 'lucide-react'
import type { ComponentProps } from 'react'
import { cn } from '@/shared/lib'

export interface ChoiceCardProps extends ComponentProps<'button'> {
  selected: boolean
  tone?: 'primary' | 'danger' | 'mafia'
  /** Tanlanganda burchakda belgi koʻrsatilsinmi. */
  showCheck?: boolean
}

const selectedTones = {
  primary: 'border-primary bg-primary/8 ring-primary',
  danger: 'border-rose-500 bg-rose-500/8 ring-rose-500',
  mafia: 'border-amber-500 bg-amber-500/10 ring-amber-500',
} as const

const checkTones = {
  primary: 'bg-primary text-primary-foreground',
  danger: 'bg-rose-500 text-white',
  mafia: 'bg-amber-500 text-zinc-950',
} as const

/** Tanlanadigan karta: mavzular, ovoz berish, tungi nishonlar uchun. */
export function ChoiceCard({
  selected,
  tone = 'primary',
  showCheck = true,
  className,
  children,
  type = 'button',
  ...props
}: ChoiceCardProps) {
  return (
    <button
      type={type}
      aria-pressed={selected}
      className={cn(
        'relative flex items-center gap-3 rounded-2xl border border-border bg-card p-3 text-left transition active:scale-[0.98] disabled:pointer-events-none disabled:opacity-40',
        selected && ['ring-1', selectedTones[tone]],
        className,
      )}
      {...props}
    >
      {children}
      {showCheck && selected && (
        <span
          className={cn(
            'absolute -top-1.5 -right-1.5 flex size-5 animate-pop-in items-center justify-center rounded-full shadow',
            checkTones[tone],
          )}
        >
          <Check className="size-3" strokeWidth={3.5} />
        </span>
      )}
    </button>
  )
}
