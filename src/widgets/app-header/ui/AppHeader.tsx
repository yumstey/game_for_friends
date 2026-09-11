import { ArrowLeft } from 'lucide-react'
import type { ReactNode } from 'react'
import { Link } from 'react-router'
import { LanguageSwitch } from '@/features/language-switch'
import { ThemeToggle } from '@/features/theme-toggle'
import { commonMessages, useTranslation } from '@/shared/i18n'
import { cn } from '@/shared/lib'

interface AppHeaderProps {
  title?: ReactNode
  subtitle?: ReactNode
  /** Orqaga tugmasi manzili. Berilmasa — logotip koʻrsatiladi. */
  backTo?: string
  /** Standart tugmalar (til, tema) oʻrniga yoki yoniga qoʻshimcha harakatlar. */
  actions?: ReactNode
  /** O'yin ichida til/tema tugmalarini yashirish (joy tejash). */
  compact?: boolean
}

export function AppHeader({
  title,
  subtitle,
  backTo,
  actions,
  compact = false,
}: AppHeaderProps) {
  const t = useTranslation(commonMessages)

  return (
    <header className="sticky top-0 z-20 bg-background/80 pt-[env(safe-area-inset-top)] backdrop-blur-xl">
      <div className="mx-auto flex h-16 w-full max-w-md items-center gap-2 px-4">
        {backTo ? (
          <Link
            to={backTo}
            aria-label={t.back}
            title={t.back}
            className="flex size-11 shrink-0 items-center justify-center rounded-2xl border border-border bg-card transition active:scale-95"
          >
            <ArrowLeft className="size-5" />
          </Link>
        ) : (
          <span
            aria-hidden
            className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-linear-to-br from-rose-500 to-violet-600 text-xl shadow-lg shadow-violet-500/25"
          >
            🎭
          </span>
        )}

        <div className="min-w-0 flex-1 px-1">
          <p
            className={cn(
              'truncate font-display font-semibold tracking-tight',
              subtitle ? 'text-base' : 'text-lg',
            )}
          >
            {title ?? t.appName}
          </p>
          {subtitle && (
            <p className="truncate text-xs text-muted-foreground">{subtitle}</p>
          )}
        </div>

        {actions}
        {!compact && (
          <>
            <LanguageSwitch />
            <ThemeToggle />
          </>
        )}
      </div>
    </header>
  )
}
