/**
 * Qisqa noyob identifikator.
 * `crypto.randomUUID` faqat HTTPS/localhost'da mavjud, shuning uchun
 * `getRandomValues` asosida yozilgan (LAN orqali telefonda ham ishlaydi).
 */
export function createId(): string {
  const bytes = crypto.getRandomValues(new Uint8Array(12))
  return Array.from(bytes, (byte) => byte.toString(16).padStart(2, '0')).join('')
}
