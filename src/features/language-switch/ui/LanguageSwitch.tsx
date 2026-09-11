import { LANGUAGES, commonMessages, useLanguageStore, useTranslation } from '@/shared/i18n'
import { cn } from '@/shared/lib'

const labels = { uz: 'UZ', en: 'EN' } as const

/** Ikki holatli til almashtirgich: UZ | EN. */
export function LanguageSwitch({ className }: { className?: string }) {
  const t = useTranslation(commonMessages)
  const language = useLanguageStore((state) => state.language)
  const setLanguage = useLanguageStore((state) => state.setLanguage)

  return (
    <div
      role="radiogroup"
      aria-label={t.language}
      className={cn('flex h-11 items-center rounded-2xl border border-border bg-card p-1', className)}
    >
      {LANGUAGES.map((code) => (
        <button
          key={code}
          type="button"
          role="radio"
          aria-checked={language === code}
          onClick={() => setLanguage(code)}
          className={cn(
            'h-full rounded-xl px-2.5 font-display text-xs font-semibold transition',
            language === code
              ? 'bg-foreground text-background'
              : 'text-muted-foreground hover:text-foreground',
          )}
        >
          {labels[code]}
        </button>
      ))}
    </div>
  )
}
