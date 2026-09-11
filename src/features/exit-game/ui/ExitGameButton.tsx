import { LogOut } from 'lucide-react'
import { useState } from 'react'
import { commonMessages, useTranslation } from '@/shared/i18n'
import { ConfirmDialog, IconButton } from '@/shared/ui'

interface ExitGameButtonProps {
  /** Tasdiqlangandan keyin chaqiriladi (sessiyani tozalash va yoʻnaltirish). */
  onExit: () => void
}

/** Tasodifiy bosilib ketmasligi uchun tasdiqlash oynali "Chiqish" tugmasi. */
export function ExitGameButton({ onExit }: ExitGameButtonProps) {
  const t = useTranslation(commonMessages)
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <IconButton
        label={t.exitGame}
        icon={<LogOut />}
        variant="outline"
        onClick={() => setIsOpen(true)}
      />
      <ConfirmDialog
        open={isOpen}
        title={t.exitGameTitle}
        description={t.exitGameDescription}
        confirmLabel={t.exit}
        onCancel={() => setIsOpen(false)}
        onConfirm={() => {
          setIsOpen(false)
          onExit()
        }}
      />
    </>
  )
}
