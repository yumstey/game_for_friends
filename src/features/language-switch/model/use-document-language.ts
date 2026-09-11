import { useEffect } from 'react'
import { useLanguage } from '@/shared/i18n'

/** `<html lang>` atributini joriy til bilan sinxronlaydi (ekran oʻquvchilar va SEO uchun). */
export function useDocumentLanguage(): void {
  const language = useLanguage()

  useEffect(() => {
    document.documentElement.lang = language
  }, [language])
}
