import { Moon, Sun } from 'lucide-react'
import { commonMessages, useTranslation } from '@/shared/i18n'
import { cn } from '@/shared/lib'
import { IconButton } from '@/shared/ui'
import { useResolvedTheme, useThemeStore } from '../model/theme-store'

export function ThemeToggle({ className }: { className?: string }) {
  const t = useTranslation(commonMessages)
  const theme = useResolvedTheme()
  const setMode = useThemeStore((state) => state.setMode)
  const isDark = theme === 'dark'

  return (
    <IconButton
      label={isDark ? t.lightTheme : t.darkTheme}
      variant="outline"
      className={cn('overflow-hidden', className)}
      onClick={() => setMode(isDark ? 'light' : 'dark')}
      icon={
        <span className="relative grid size-5 place-items-center">
          <Sun
            className={cn(
              'absolute transition-all duration-300',
              isDark ? 'scale-50 rotate-90 opacity-0' : 'scale-100 rotate-0 opacity-100',
            )}
          />
          <Moon
            className={cn(
              'absolute transition-all duration-300',
              isDark ? 'scale-100 rotate-0 opacity-100' : 'scale-50 -rotate-90 opacity-0',
            )}
          />
        </span>
      }
    />
  )
}
