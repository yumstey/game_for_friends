import type { ReactNode } from 'react'
import { cn } from '@/shared/lib'

export interface SwitchProps {
  checked: boolean
  onChange: (checked: boolean) => void
  label: ReactNode
  description?: ReactNode
  icon?: ReactNode
  disabled?: boolean
  className?: string
}

/** Butun qator bosiladigan yoqish/oʻchirish tugmasi. */
export function Switch({
  checked,
  onChange,
  label,
  description,
  icon,
  disabled = false,
  className,
}: SwitchProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => onChange(!checked)}
      className={cn(
        'flex w-full items-center gap-3 rounded-2xl px-1 py-2 text-left transition disabled:opacity-50',
        className,
      )}
    >
      {icon && (
        <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-muted text-lg [&_svg]:size-5">
          {icon}
        </span>
      )}
      <span className="min-w-0 flex-1">
        <span className="block text-[15px] font-semibold">{label}</span>
        {description && (
          <span className="mt-0.5 block text-sm leading-snug text-muted-foreground">
            {description}
          </span>
        )}
      </span>
      <span
        aria-hidden
        className={cn(
          'relative h-7 w-12 shrink-0 rounded-full transition-colors duration-200',
          checked ? 'bg-primary' : 'bg-muted-foreground/30',
        )}
      >
        <span
          className={cn(
            'absolute top-1 left-1 size-5 rounded-full bg-white shadow transition-transform duration-200',
            checked && 'translate-x-5',
          )}
        />
      </span>
    </button>
  )
}
