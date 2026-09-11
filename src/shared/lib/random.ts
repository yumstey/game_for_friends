/**
 * Kriptografik tasodifiylik (`crypto.getRandomValues`) asosidagi yordamchilar.
 *
 * `Math.random()` oʻrniga ishlatiladi: natijalar oldindan bashorat qilib boʻlmaydi,
 * `randomInt` esa "modulo bias"siz — har bir qiymat aynan bir xil ehtimollikka ega.
 * `getRandomValues` HTTP (secure boʻlmagan) kontekstda ham ishlaydi, shuning uchun
 * telefondan LAN orqali ochilganda ham muammo yoʻq.
 */

const UINT32_RANGE = 0x1_0000_0000

/** `[0, max)` oraliqdagi tasodifiy butun son. */
export function randomInt(max: number): number {
  if (!Number.isSafeInteger(max) || max <= 0 || max > UINT32_RANGE) {
    throw new RangeError(`randomInt: max must be an integer in (0, 2^32], got ${max}`)
  }

  // Rejection sampling: `limit`dan katta qiymatlarni tashlab yuboramiz.
  const limit = UINT32_RANGE - (UINT32_RANGE % max)
  const buffer = new Uint32Array(1)
  let value: number

  do {
    crypto.getRandomValues(buffer)
    value = buffer[0] ?? 0
  } while (value >= limit)

  return value % max
}

/** Fisher–Yates algoritmi bilan aralashtirilgan yangi massiv (asl massiv oʻzgarmaydi). */
export function shuffle<T>(items: readonly T[]): T[] {
  const result = [...items]

  for (let i = result.length - 1; i > 0; i--) {
    const j = randomInt(i + 1)
    ;[result[i], result[j]] = [result[j] as T, result[i] as T]
  }

  return result
}

/** Massivdan bitta tasodifiy element. Boʻsh massiv uchun xato. */
export function pickRandom<T>(items: readonly T[]): T {
  if (items.length === 0) {
    throw new RangeError('pickRandom: cannot pick from an empty list')
  }

  return items[randomInt(items.length)] as T
}

/** Takrorlanmaydigan `count` ta tasodifiy element. */
export function sample<T>(items: readonly T[], count: number): T[] {
  if (count < 0 || count > items.length) {
    throw new RangeError(`sample: count ${count} is out of range 0..${items.length}`)
  }

  return shuffle(items).slice(0, count)
}

/** 50/50 tasodifiy mantiqiy qiymat. */
export function coinFlip(): boolean {
  return randomInt(2) === 1
}
