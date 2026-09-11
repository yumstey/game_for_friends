import type { ComponentProps, ReactNode } from 'react'
import { cn } from '@/shared/lib'

export interface IconButtonProps extends Omit<ComponentProps<'button'>, 'children'> {
  /** Ekran oʻquvchilar uchun majburiy nom. */
  label: string
  icon: ReactNode
  variant?: 'ghost' | 'outline' | 'solid'
  size?: 'sm' | 'md'
}

const variants = {
  ghost: 'text-foreground hover:bg-muted',
  outline: 'border border-border bg-card text-foreground hover:bg-muted',
  solid: 'bg-muted text-foreground hover:bg-muted/70',
} as const

export function IconButton({
  label,
  icon,
  variant = 'ghost',
  size = 'md',
  className,
  type = 'button',
  ...props
}: IconButtonProps) {
  return (
    <button
      type={type}
      aria-label={label}
      title={label}
      className={cn(
        'inline-flex shrink-0 items-center justify-center rounded-2xl transition active:scale-95 disabled:pointer-events-none disabled:opacity-40',
        size === 'md' ? 'size-11 [&_svg]:size-5' : 'size-9 [&_svg]:size-4',
        variants[variant],
        className,
      )}
      {...props}
    >
      {icon}
    </button>
  )
}
