import { ScrollText, Undo2 } from 'lucide-react'
import { useState } from 'react'
import { GameLog, useMafiaStore } from '@/entities/mafia'
import { useTranslation } from '@/shared/i18n'
import { Dialog, IconButton } from '@/shared/ui'
import { mafiaGameMessages } from './messages'

/** Oxirgi faza oʻtishini bekor qilish (boshlovchi xato bosib yuborsa). */
export function UndoButton() {
  const t = useTranslation(mafiaGameMessages)
  const canUndo = useMafiaStore(
    (state) => state.history.length > 0 && state.session?.phase !== 'reveal',
  )
  const undo = useMafiaStore((state) => state.undo)

  return (
    <IconButton
      label={t.undo}
      icon={<Undo2 />}
      variant="outline"
      disabled={!canUndo}
      onClick={undo}
    />
  )
}

export function JournalButton() {
  const t = useTranslation(mafiaGameMessages)
  const session = useMafiaStore((state) => state.session)
  const [isOpen, setIsOpen] = useState(false)

  if (!session) return null

  return (
    <>
      <IconButton
        label={t.journal}
        icon={<ScrollText />}
        variant="outline"
        disabled={session.phase === 'reveal'}
        onClick={() => setIsOpen(true)}
      />
      <Dialog open={isOpen} onClose={() => setIsOpen(false)} title={t.journal}>
        <div className="pb-4 pl-2">
          <GameLog log={session.log} players={session.players} />
        </div>
      </Dialog>
    </>
  )
}
