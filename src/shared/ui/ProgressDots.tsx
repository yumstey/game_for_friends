import { cn } from '@/shared/lib'

export interface ProgressDotsProps {
  total: number
  /** Joriy (0 dan boshlanadigan) qadam. */
  current: number
  className?: string
}

const MAX_DOTS = 16

export function ProgressDots({ total, current, className }: ProgressDotsProps) {
  return (
    <div
      role="progressbar"
      aria-valuemin={1}
      aria-valuemax={total}
      aria-valuenow={current + 1}
      className={cn('flex items-center justify-center gap-3', className)}
    >
      {total <= MAX_DOTS && (
        <div className="flex flex-wrap items-center justify-center gap-1.5">
          {Array.from({ length: total }, (_, index) => (
            <span
              key={index}
              className={cn(
                'h-1.5 rounded-full transition-all duration-300',
                index === current
                  ? 'w-6 bg-primary'
                  : index < current
                    ? 'w-1.5 bg-primary/50'
                    : 'w-1.5 bg-muted-foreground/25',
              )}
            />
          ))}
        </div>
      )}
      <span className="font-display text-xs font-semibold text-muted-foreground tabular-nums">
        {current + 1}/{total}
      </span>
    </div>
  )
}
