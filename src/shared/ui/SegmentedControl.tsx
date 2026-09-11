import type { ReactNode } from 'react'
import { cn } from '@/shared/lib'

export interface SegmentedOption<T extends string | number> {
  value: T
  label: ReactNode
}

export interface SegmentedControlProps<T extends string | number> {
  value: T
  options: readonly SegmentedOption<T>[]
  onChange: (value: T) => void
  label: string
  className?: string
}

export function SegmentedControl<T extends string | number>({
  value,
  options,
  onChange,
  label,
  className,
}: SegmentedControlProps<T>) {
  return (
    <div
      role="radiogroup"
      aria-label={label}
      className={cn('flex gap-1 overflow-x-auto rounded-2xl bg-muted p-1', className)}
    >
      {options.map((option) => {
        const isActive = option.value === value

        return (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={isActive}
            onClick={() => onChange(option.value)}
            className={cn(
              'h-9 min-w-0 flex-1 rounded-xl px-3 text-sm font-semibold whitespace-nowrap transition',
              isActive
                ? 'bg-card text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground',
            )}
          >
            {option.label}
          </button>
        )
      })}
    </div>
  )
}
