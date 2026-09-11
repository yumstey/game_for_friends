import { X } from 'lucide-react'
import { useEffect, useRef, type ReactNode } from 'react'
import { commonMessages, useTranslation } from '@/shared/i18n'
import { cn } from '@/shared/lib'
import { Button } from './Button'
import { IconButton } from './IconButton'

export interface DialogProps {
  open: boolean
  onClose: () => void
  title: ReactNode
  description?: ReactNode
  children?: ReactNode
  footer?: ReactNode
  /** `sheet` — pastdan chiquvchi panel (mobil uchun), `center` — markazdagi oyna. */
  variant?: 'sheet' | 'center'
}

/** Nativ `<dialog>` asosidagi modal: fokus tuzogʻi va Esc brauzer tomonidan taʼminlanadi. */
export function Dialog({
  open,
  onClose,
  title,
  description,
  children,
  footer,
  variant = 'sheet',
}: DialogProps) {
  const ref = useRef<HTMLDialogElement>(null)
  const t = useTranslation(commonMessages)

  useEffect(() => {
    const dialog = ref.current
    if (!dialog) return

    if (open && !dialog.open) dialog.showModal()
    if (!open && dialog.open) dialog.close()
  }, [open])

  return (
    <dialog
      ref={ref}
      onCancel={(event) => {
        event.preventDefault()
        onClose()
      }}
      onClick={(event) => {
        // Faqat fon (backdrop) bosilganda yopamiz.
        if (event.target === event.currentTarget) onClose()
      }}
      className={cn(
        'w-full max-w-md bg-card text-card-foreground shadow-2xl backdrop:bg-black/55 backdrop:backdrop-blur-[2px] open:animate-fade-up',
        variant === 'sheet'
          ? 'mx-auto mt-auto mb-0 max-h-[88dvh] rounded-t-4xl'
          : 'm-auto max-h-[85dvh] w-[calc(100%-2rem)] rounded-4xl',
      )}
    >
      <div className="flex max-h-[inherit] flex-col">
        <header className="flex items-start gap-3 px-5 pt-5">
          <div className="min-w-0 flex-1">
            <h2 className="font-display text-lg font-semibold tracking-tight">{title}</h2>
            {description && (
              <p className="mt-1 text-sm text-muted-foreground">{description}</p>
            )}
          </div>
          <IconButton
            label={t.close}
            icon={<X />}
            size="sm"
            variant="solid"
            onClick={onClose}
          />
        </header>

        {children && (
          <div className="min-h-0 flex-1 overflow-y-auto px-5 pt-4 pb-2">{children}</div>
        )}

        {footer && (
          <footer className="flex flex-col gap-2 px-5 pt-3 pb-[max(1.25rem,env(safe-area-inset-bottom))]">
            {footer}
          </footer>
        )}
      </div>
    </dialog>
  )
}

export interface ConfirmDialogProps {
  open: boolean
  title: ReactNode
  description?: ReactNode
  confirmLabel: string
  tone?: 'danger' | 'primary'
  onConfirm: () => void
  onCancel: () => void
}

export function ConfirmDialog({
  open,
  title,
  description,
  confirmLabel,
  tone = 'danger',
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  const t = useTranslation(commonMessages)

  return (
    <Dialog
      open={open}
      onClose={onCancel}
      title={title}
      description={description}
      variant="center"
      footer={
        <div className="grid grid-cols-2 gap-2">
          <Button variant="secondary" onClick={onCancel}>
            {t.cancel}
          </Button>
          <Button variant={tone} onClick={onConfirm}>
            {confirmLabel}
          </Button>
        </div>
      }
    />
  )
}
