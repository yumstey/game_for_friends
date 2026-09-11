import { AlertTriangle, Info, OctagonAlert } from 'lucide-react'
import type { ReactNode } from 'react'
import { cn } from '@/shared/lib'

const tones = {
  info: {
    className: 'bg-sky-500/10 text-sky-800 dark:text-sky-200',
    icon: <Info />,
  },
  warning: {
    className: 'bg-amber-500/12 text-amber-800 dark:text-amber-200',
    icon: <AlertTriangle />,
  },
  danger: {
    className: 'bg-rose-500/10 text-rose-700 dark:text-rose-300',
    icon: <OctagonAlert />,
  },
} as const

export interface CalloutProps {
  tone?: keyof typeof tones
  children: ReactNode
  icon?: ReactNode
  className?: string
}

export function Callout({ tone = 'info', children, icon, className }: CalloutProps) {
  const config = tones[tone]

  return (
    <div
      role={tone === 'danger' ? 'alert' : 'note'}
      className={cn(
        'flex items-start gap-2.5 rounded-2xl px-3.5 py-3 text-sm leading-snug font-medium [&_svg]:mt-px [&_svg]:size-4 [&_svg]:shrink-0',
        config.className,
        className,
      )}
    >
      {icon ?? config.icon}
      <div className="min-w-0 flex-1">{children}</div>
    </div>
  )
}
