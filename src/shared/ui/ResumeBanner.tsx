import { ArrowRight, Gamepad2 } from 'lucide-react'
import { Link } from 'react-router'

export interface ResumeBannerProps {
  title: string
  description: string
  actionLabel: string
  to: string
}

/** Tugallanmagan oʻyin haqida eslatma va unga qaytish havolasi. */
export function ResumeBanner({ title, description, actionLabel, to }: ResumeBannerProps) {
  return (
    <div className="flex animate-fade-up items-center gap-3 rounded-3xl border border-primary/30 bg-primary/8 p-3 pl-4">
      <Gamepad2 className="size-6 shrink-0 text-primary" />
      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold">{title}</p>
        <p className="truncate text-xs text-muted-foreground">{description}</p>
      </div>
      <Link
        to={to}
        className="inline-flex h-10 shrink-0 items-center gap-1.5 rounded-2xl bg-primary px-3.5 text-sm font-semibold text-primary-foreground transition active:scale-95"
      >
        {actionLabel}
        <ArrowRight className="size-4" />
      </Link>
    </div>
  )
}
