import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/** Tailwind klasslarini shartli birlashtiradi va ziddiyatlarini hal qiladi. */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs))
}
