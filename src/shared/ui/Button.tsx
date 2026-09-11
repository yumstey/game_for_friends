import type { ComponentProps, ReactNode } from 'react'
import { cn } from '@/shared/lib'

const variants = {
  primary:
    'bg-primary text-primary-foreground shadow-lg shadow-primary/25 hover:brightness-110',
  secondary: 'bg-muted text-foreground hover:bg-muted/70',
  outline: 'border border-border bg-card text-foreground hover:bg-muted',
  ghost: 'text-foreground hover:bg-muted',
  danger: 'bg-rose-600 text-white shadow-lg shadow-rose-600/25 hover:bg-rose-500',
  success:
    'bg-emerald-600 text-white shadow-lg shadow-emerald-600/25 hover:bg-emerald-500',
  mafia: 'bg-amber-400 text-zinc-950 shadow-lg shadow-amber-500/25 hover:bg-amber-300',
} as const

const sizes = {
  sm: 'h-9 gap-1.5 rounded-xl px-3 text-sm',
  md: 'h-11 gap-2 rounded-2xl px-4 text-[15px]',
  lg: 'h-14 gap-2.5 rounded-2xl px-6 text-base',
} as const

export type ButtonVariant = keyof typeof variants

export interface ButtonProps extends ComponentProps<'button'> {
  variant?: ButtonVariant
  size?: keyof typeof sizes
  fullWidth?: boolean
  icon?: ReactNode
  iconRight?: ReactNode
}

export function Button({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  icon,
  iconRight,
  className,
  children,
  type = 'button',
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        'inline-flex shrink-0 items-center justify-center font-semibold whitespace-nowrap transition-[filter,background-color,transform,opacity] duration-150 select-none active:scale-[0.97] disabled:pointer-events-none disabled:opacity-45 [&_svg]:size-[1.15em] [&_svg]:shrink-0',
        variants[variant],
        sizes[size],
        fullWidth && 'w-full',
        className,
      )}
      {...props}
    >
      {icon}
      {children}
      {iconRight}
    </button>
  )
}
