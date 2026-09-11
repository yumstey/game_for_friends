import type { ComponentProps, ReactNode } from 'react'
import { cn } from '@/shared/lib'

/** Mobil ustun: markazda, maksimal kenglik bilan. */
export function Container({ className, ...props }: ComponentProps<'div'>) {
  return <div className={cn('mx-auto w-full max-w-md px-4', className)} {...props} />
}

/** Sahifaning asosiy qismi — pastki panel ostida qolmasligi uchun joy qoldiradi. */
export function PageContent({
  className,
  withBottomBar = true,
  ...props
}: ComponentProps<'main'> & { withBottomBar?: boolean }) {
  return (
    <main
      className={cn(
        'mx-auto flex w-full max-w-md flex-col gap-6 px-4 pt-2',
        withBottomBar ? 'pb-40' : 'pb-10',
        className,
      )}
      {...props}
    />
  )
}

/** Ekran pastiga yopishgan harakat paneli (safe-area hisobga olingan). */
export function BottomBar({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-30 bg-linear-to-t from-background from-60% to-transparent pt-8">
      <div
        className={cn(
          'pointer-events-auto mx-auto flex w-full max-w-md flex-col gap-2 px-4 pb-[max(1rem,env(safe-area-inset-bottom))]',
          className,
        )}
      >
        {children}
      </div>
    </div>
  )
}
