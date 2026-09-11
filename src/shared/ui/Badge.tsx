import type { ComponentProps } from 'react'
import { cn } from '@/shared/lib'

const tones = {
  neutral: 'bg-muted text-muted-foreground',
  primary: 'bg-primary/12 text-primary',
  success: 'bg-emerald-500/12 text-emerald-600 dark:text-emerald-400',
  danger: 'bg-rose-500/12 text-rose-600 dark:text-rose-400',
  warning: 'bg-amber-500/15 text-amber-700 dark:text-amber-300',
  info: 'bg-sky-500/12 text-sky-700 dark:text-sky-300',
} as const

export type BadgeTone = keyof typeof tones

export interface BadgeProps extends ComponentProps<'span'> {
  tone?: BadgeTone
}

export function Badge({ tone = 'neutral', className, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold whitespace-nowrap [&_svg]:size-3.5',
        tones[tone],
        className,
      )}
      {...props}
    />
  )
}
