import { cn } from '@/shared/lib'

// Tailwind klasslari toʻliq yozilishi shart — aks holda build paytida topilmaydi.
const palette = [
  'bg-rose-500',
  'bg-orange-500',
  'bg-amber-500',
  'bg-lime-600',
  'bg-emerald-500',
  'bg-teal-500',
  'bg-cyan-600',
  'bg-sky-500',
  'bg-indigo-500',
  'bg-violet-500',
  'bg-fuchsia-500',
  'bg-pink-500',
] as const

const sizes = {
  xs: 'size-7 text-xs',
  sm: 'size-9 text-sm',
  md: 'size-11 text-base',
  lg: 'size-16 text-2xl',
  xl: 'size-24 text-4xl',
} as const

function hashString(value: string): number {
  let hash = 0
  for (const char of value) hash = (hash * 31 + char.charCodeAt(0)) | 0
  return Math.abs(hash)
}

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean)
  if (parts.length === 0) return '?'
  if (parts.length === 1) return (parts[0] ?? '').slice(0, 1).toUpperCase()
  return `${parts[0]?.[0] ?? ''}${parts[1]?.[0] ?? ''}`.toUpperCase()
}

export interface AvatarProps {
  name: string
  size?: keyof typeof sizes
  className?: string
}

/** Ism asosida doimiy rangli bosh harf avatari. */
export function Avatar({ name, size = 'md', className }: AvatarProps) {
  const color = palette[hashString(name.trim().toLowerCase()) % palette.length]

  return (
    <span
      aria-hidden
      className={cn(
        'inline-flex shrink-0 items-center justify-center rounded-full font-display font-semibold text-white shadow-inner shadow-black/10',
        sizes[size],
        color,
        className,
      )}
    >
      {getInitials(name)}
    </span>
  )
}
