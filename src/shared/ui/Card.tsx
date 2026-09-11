import type { ComponentProps, ReactNode } from 'react'
import { cn } from '@/shared/lib'

export function Card({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      className={cn(
        'rounded-3xl border border-border bg-card p-4 text-card-foreground shadow-sm shadow-black/[0.03]',
        className,
      )}
      {...props}
    />
  )
}

interface SectionProps {
  title: ReactNode
  description?: ReactNode
  action?: ReactNode
  children: ReactNode
  className?: string
}

/** Sarlavhali boʻlim: sozlamalar sahifalaridagi bloklar uchun. */
export function Section({ title, description, action, children, className }: SectionProps) {
  return (
    <section className={cn('flex flex-col gap-3', className)}>
      <header className="flex items-end justify-between gap-3 px-1">
        <div className="min-w-0">
          <h2 className="font-display text-[15px] font-semibold tracking-tight">{title}</h2>
          {description && (
            <p className="mt-0.5 text-sm text-muted-foreground">{description}</p>
          )}
        </div>
        {action}
      </header>
      {children}
    </section>
  )
}
