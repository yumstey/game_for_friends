import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router'
import { cn } from '@/shared/lib'

interface GameCardProps {
  to: string
  title: string
  description: string
  meta: readonly string[]
  emoji: string
  playLabel: string
  resumeLabel?: string
  className: string
}

export function GameCard({
  to,
  title,
  description,
  meta,
  emoji,
  playLabel,
  resumeLabel,
  className,
}: GameCardProps) {
  return (
    <Link
      to={to}
      className={cn(
        'group relative isolate block animate-fade-up overflow-hidden rounded-4xl p-5 text-white shadow-xl transition active:scale-[0.98]',
        className,
      )}
    >
      <div className="pointer-events-none absolute -top-16 -right-16 -z-10 size-56 rounded-full bg-white/15 blur-3xl transition group-hover:bg-white/25" />
      <span
        aria-hidden
        className="absolute top-4 right-4 animate-float text-6xl drop-shadow-lg"
      >
        {emoji}
      </span>

      {resumeLabel && (
        <span className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-white/20 px-2.5 py-1 text-xs font-semibold backdrop-blur">
          <span className="size-1.5 animate-pulse rounded-full bg-lime-300" />
          {resumeLabel}
        </span>
      )}

      <h2 className="font-display text-3xl font-bold tracking-tight uppercase">
        {title}
      </h2>
      <p className="mt-2 pr-14 text-sm leading-relaxed text-white/85">{description}</p>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {meta.map((item) => (
          <span
            key={item}
            className="rounded-full bg-black/20 px-2.5 py-1 text-xs font-semibold backdrop-blur"
          >
            {item}
          </span>
        ))}
      </div>

      <span className="mt-5 inline-flex h-11 items-center gap-2 rounded-2xl bg-white px-4 text-sm font-bold text-zinc-900 shadow-lg transition group-hover:gap-3">
        {playLabel}
        <ArrowRight className="size-4" />
      </span>
    </Link>
  )
}
