/** Birinchi sahifa chunk'i yuklanayotganda koʻrinadigan yengil yuklovchi. */
export function AppLoader() {
  return (
    <div className="flex min-h-dvh items-center justify-center bg-background">
      <span
        role="status"
        aria-label="Loading"
        className="size-10 animate-spin rounded-full border-4 border-primary/20 border-t-primary"
      />
    </div>
  )
}
