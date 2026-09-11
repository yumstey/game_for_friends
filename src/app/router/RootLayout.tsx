import { Outlet, ScrollRestoration } from 'react-router'
import { useDocumentLanguage } from '@/features/language-switch'
import { useApplyTheme } from '@/features/theme-toggle'

/** Barcha sahifalar uchun umumiy qobiq: tema, til va scroll tiklanishi. */
export function RootLayout() {
  useApplyTheme()
  useDocumentLanguage()

  return (
    <div className="min-h-dvh bg-background text-foreground">
      <Outlet />
      <ScrollRestoration />
    </div>
  )
}
