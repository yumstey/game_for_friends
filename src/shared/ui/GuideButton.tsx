import { BookOpen } from 'lucide-react'
import { useState } from 'react'
import { IconButton } from './IconButton'
import { Dialog } from './Dialog'

export interface GuideSection {
  title: string
  items: readonly string[]
}

export interface GuideButtonProps {
  label: string
  title: string
  sections: readonly GuideSection[]
}

/** "Qoidalar" tugmasi: bosilganda boʻlimlarga ajratilgan qoʻllanma ochiladi. */
export function GuideButton({ label, title, sections }: GuideButtonProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <IconButton
        label={label}
        icon={<BookOpen />}
        variant="outline"
        onClick={() => setIsOpen(true)}
      />
      <Dialog open={isOpen} onClose={() => setIsOpen(false)} title={title}>
        <div className="flex flex-col gap-5 pb-4">
          {sections.map((section) => (
            <section key={section.title}>
              <h3 className="font-display text-sm font-semibold">{section.title}</h3>
              <ul className="mt-2 flex flex-col gap-2">
                {section.items.map((item) => (
                  <li
                    key={item}
                    className="flex gap-2.5 text-sm leading-relaxed text-muted-foreground"
                  >
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </Dialog>
    </>
  )
}
