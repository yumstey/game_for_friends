# 🎭 Maboys — Imposter & Mafia

Doʻstlar davrasi uchun **bitta telefonda** oʻynaladigan ikkita oʻyin: **Imposter** va **Mafia**.
Toʻliq mobil uchun moslashtirilgan, yorugʻ/qorongʻi rejim, oʻzbek va ingliz tillari.

- ⚛️ React 19 + TypeScript 6 (strict) + React Compiler
- 🧱 Feature-Sliced Design (FSD) arxitekturasi
- 🎨 Tailwind CSS v4 (semantik tokenlar, dark mode)
- 🗂 Zustand (localStorage'da saqlanadigan holat)
- 🧭 React Router v8 (sahifalar lazy yuklanadi)
- ✅ Vitest — oʻyin mantigʻi unit testlar bilan qoplangan

---

## Mundarija

1. [Imkoniyatlar](#imkoniyatlar)
2. [Tezkor start](#tezkor-start)
3. [Skriptlar](#skriptlar)
4. [Oʻyin qoidalari](#oyin-qoidalari)
   - [Imposter](#imposter)
   - [Mafia](#mafia)
5. [Arxitektura (FSD)](#arxitektura-fsd)
6. [Holat boshqaruvi](#holat-boshqaruvi)
7. [Tasodifiylik](#tasodifiylik)
8. [Tarjimalar (i18n)](#tarjimalar-i18n)
9. [Dizayn tizimi va temalar](#dizayn-tizimi-va-temalar)
10. [Kengaytirish qoʻllanmasi](#kengaytirish-qollanmasi)
11. [Testlar](#testlar)
12. [Deploy](#deploy)
13. [Kod yozish qoidalari](#kod-yozish-qoidalari)

---

## Imkoniyatlar

### Umumiy

| Imkoniyat                  | Tavsif                                                                                                                                         |
| -------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| 👥 Oʻyinchilar roʻyxati    | Standart 7 kishi: **Rustam, Bekzat, Bekmurat, Samat, Almaz, Diyar, Marat**. Sonini yozish, ism tahrirlash, qoʻshish/oʻchirish, tezkor qoʻshish |
| 🌗 Yorugʻ / qorongʻi rejim | Tizim sozlamasiga moslashadi, qoʻlda almashtirish mumkin, sahifa yuklanishida "oq chaqnash" yoʻq                                               |
| 🌐 Ikki til                | Interfeys **va soʻzlar** toʻliq oʻzbekcha yoki inglizcha                                                                                       |
| 💾 Avtosaqlash             | Sozlamalar va davom etayotgan oʻyin sahifa yangilansa ham saqlanib qoladi                                                                      |
| 📱 Mobil tajriba           | Safe-area, katta tugmalar, vibratsiya, ekran oʻchmasligi (Wake Lock), taymer tugaganda ovozli signal                                           |
| 🔒 Bir xil kartalar        | Barcha maxfiy kartalar **bir xil rang va tuzilmada** — yonidagilar rangidan hech narsa bilib ololmaydi                                         |

### Imposter

- 16 ta mavzu, **500+ soʻz** (har biri oʻzbek va ingliz tilida), mavzularni tanlash mumkin
- Hammasi tasodifiy: **imposter**, **soʻz**, **mavzu**, **kim boshlashi** va **navbat yoʻnalishi**
- Chiqqan soʻzlar tugamaguncha takrorlanmaydi
- Imposterlar sonini sozlash (har 3 oʻyinchiga 1 tagacha), imposterga mavzuni koʻrsatish/yashirish
- Muhokama taymeri (oʻchiq / 1 / 2 / 3 / 5 daqiqa)
- Imposter **ogʻzaki** tanlanadi — keyin bitta tugma bilan imposter va soʻz ochiladi

### Mafia

- 7 ta rol: **Tinch aholi, Mafiya, Don, Komissar, Doktor, Maʼshuqa, Manyak**
- Oʻyinchilar soniga qarab **avtomatik muvozanatli taqsimot** yoki qoʻlda sozlash (validatsiya bilan)
- Boshlovchi uchun **tungi ustoz (wizard)**: kim uygʻonadi, nima deyish kerak, nishon tanlash, tekshiruv natijasi
- Qoidalar avtomatik nazorat qilinadi: Doktor ketma-ket ikki tun bir odamni davolay olmaydi, oʻzini faqat bir marta; Maʼshuqa band qilgan oʻyinchi harakat qila olmaydi
- Tun natijasi, kunduzgi taymer, ovoz berish, gʻolibni avtomatik aniqlash
- **Ortga qaytarish (Undo)** — boshlovchi xato bossa, oxirgi faza oʻtishini bekor qiladi
- **Oʻyin jurnali** — har bir tun va ovoz berishning toʻliq tarixi

---

## Tezkor start

Talablar: **Node.js 20.19+ yoki 22.12+** va **pnpm** (loyiha `pnpm-lock.yaml` bilan keladi).

```bash
pnpm install
pnpm dev
```

Brauzerda: <http://localhost:5173>

### Telefonda sinash

Kompyuter va telefon bitta Wi-Fi tarmogʻida boʻlsin:

```bash
pnpm dev:host
```

Terminalda chiqqan `Network: http://192.168.x.x:5173` manzilini telefonda oching.

> ℹ️ Oddiy HTTP orqali ochilganda brauzer **Wake Lock** (ekran oʻchmasligi) API'sini bermaydi —
> ilova buni jim oʻtkazib yuboradi, qolgan hamma narsa ishlaydi. Tasodifiylik va ID yaratish
> ataylab `crypto.getRandomValues` asosida yozilgan, chunki u HTTP'da ham mavjud.

---

## Skriptlar

| Buyruq              | Vazifasi                                                  |
| ------------------- | --------------------------------------------------------- |
| `pnpm dev`          | Dev server (HMR)                                          |
| `pnpm dev:host`     | Dev server lokal tarmoqda (telefondan kirish uchun)       |
| `pnpm build`        | Tip tekshiruvi + production build (`dist/`)               |
| `pnpm preview`      | Production build'ni lokal koʻrish                         |
| `pnpm typecheck`    | Faqat TypeScript tekshiruvi                               |
| `pnpm lint`         | ESLint (React Hooks + React Compiler qoidalari bilan)     |
| `pnpm format`       | Prettier bilan formatlash (Tailwind klasslari saralanadi) |
| `pnpm format:check` | Formatlash tekshiruvi (CI uchun)                          |
| `pnpm test`         | Unit testlar (bir marta)                                  |
| `pnpm test:watch`   | Unit testlar (kuzatuv rejimi)                             |

---

## Oʻyin qoidalari

### Imposter

**Oʻyinchilar:** 3+ · **Davomiyligi:** 5–10 daqiqa

1. **Sozlash.** Oʻyinchilar, mavzular va qoʻshimcha sozlamalarni tanlang → **"Oʻyinni boshlash"**.
2. **Kartalar.** Telefon navbat bilan uzatiladi. Har bir oʻyinchi kartani bosib ochadi:
   - oddiy oʻyinchi — **yashirin soʻz** va mavzuni koʻradi;
   - imposter — **"IMPOSTER"** yozuvini (va sozlamaga koʻra mavzuni) koʻradi.

   Kartalar hamma uchun **bir xil rangda**, vibratsiya ham bir xil — tashqaridan farqlab boʻlmaydi.

3. **Muhokama.** Ilova tasodifiy tanlagan oʻyinchidan boshlab, tasodifiy yoʻnalishda
   (soat mili boʻyicha yoki teskari) har kim soʻz haqida bitta qisqa ishora beradi.
4. **Imposterni topish.** Hamma kim imposter ekanini **ogʻzaki** aytadi.
5. **"Imposterni koʻrsatish"** (tasdiqlash bilan) — imposter(lar) va yashirin soʻz ochiladi.
6. **"Keyingi raund"** — yangi soʻz, yangi imposter, yangi boshlovchi.

### Mafia

**Oʻyinchilar:** 4+ va **1 ta boshlovchi** (u oʻynamaydi, telefonni boshqaradi) · **Davomiyligi:** 20–40 daqiqa

#### Rollar

| Rol            | Jamoa       | Qobiliyat                                                                                       |
| -------------- | ----------- | ----------------------------------------------------------------------------------------------- |
| 🙂 Tinch aholi | Tinch aholi | Maxsus qobiliyat yoʻq, kunduzi mafiyani topishga harakat qiladi                                 |
| 🔫 Mafiya      | Mafiya      | Har tunda sheriklari bilan bitta qurbon tanlaydi                                                |
| 🎩 Don         | Mafiya      | Mafiya bilan birga oʻldiradi + har tunda bir kishini **Komissarmi** deb tekshiradi              |
| 🕵️ Komissar    | Tinch aholi | Har tunda bir kishini **mafiyami** deb tekshiradi (Don ham mafiya boʻlib chiqadi)               |
| 💉 Doktor      | Tinch aholi | Har tunda bir kishini davolaydi. Bir odamni ketma-ket 2 tun — yoʻq; oʻzini — faqat 1 marta      |
| 💋 Maʼshuqa    | Tinch aholi | Bir kishini "band qiladi": u shu tun qobiliyatidan foydalanolmaydi va ertasi kuni ovoz bermaydi |
| 🔪 Manyak      | Yakka       | Har tunda istalgan bitta oʻyinchini oʻldiradi                                                   |

#### Tavsiya etilgan taqsimot (avtomatik rejim)

Formula: mafiya jamoasi = `max(1, floor(n / 3))`, 7+ oʻyinchida ulardan biri **Don**;
Doktor 4+, Komissar 5+, Maʼshuqa 9+, Manyak 10+ oʻyinchida qoʻshiladi.

| Oʻyinchi | Mafiya |  Don  | Komissar | Doktor | Maʼshuqa | Manyak | Tinch aholi |
| :------: | :----: | :---: | :------: | :----: | :------: | :----: | :---------: |
|    4     |   1    |   –   |    –     |   1    |    –     |   –    |      2      |
|    5     |   1    |   –   |    1     |   1    |    –     |   –    |      2      |
|    6     |   2    |   –   |    1     |   1    |    –     |   –    |      2      |
|  **7**   | **1**  | **1** |  **1**   | **1**  |    –     |   –    |    **3**    |
|    8     |   1    |   1   |    1     |   1    |    –     |   –    |      4      |
|    9     |   2    |   1   |    1     |   1    |    1     |   –    |      3      |
|    10    |   2    |   1   |    1     |   1    |    1     |   1    |      3      |
|    12    |   3    |   1   |    1     |   1    |    1     |   1    |      4      |
|    15    |   4    |   1   |    1     |   1    |    1     |   1    |      6      |

Qoʻlda sozlashda quyidagilar tekshiriladi: kamida 1 mafiya, mafiya tinch aholidan **kam**,
maxsus rollar oʻyinchilardan koʻp emas, yakka rollar (Don, Komissar, …) faqat bittadan.

#### Oʻyin jarayoni

1. **Rol tarqatish** — telefon navbat bilan uzatiladi, har kim oʻz rolini koʻradi.
   Mafiya aʼzolari sheriklarini kartadayoq koʻradi. Keyin telefon boshlovchiga beriladi.
2. **Tun** — hamma koʻzini yumadi. Boshlovchi ilova koʻrsatgan tartibda rollarni uygʻotadi:

   **Maʼshuqa → Mafiya → Don → Komissar → Doktor → Manyak**

   Har bir qadamda ilova aytiladigan gapni (skript), uygʻonadiganlarni va nishonlar roʻyxatini
   koʻrsatadi. Tekshiruv natijasi (👍/👎) darhol chiqadi. Rol egasi oʻlgan boʻlsa ham qadam
   koʻrsatiladi — boshlovchi shubha uygʻotmaslik uchun baribir "chaqiradi".

3. **Tong** — kim halok boʻlgani (va sozlamaga koʻra roli) eʼlon qilinadi. "Faqat boshlovchi
   uchun" blokida Doktor kimni qutqargani va Maʼshuqa kimni band qilgani koʻrinadi.
4. **Kun** — muhokama taymeri, tirik va halok boʻlganlar roʻyxati.
5. **Ovoz berish** — koʻpchilik tanlagan oʻyinchi chiqariladi yoki "Hech kim chiqarilmaydi".
6. Gʻolib aniqlanmaguncha 2-bosqichdan takrorlanadi.

#### Tun natijasi qanday hisoblanadi

```
hujum qilinganlar = { mafiya nishoni, manyak nishoni }   (faqat faol qadamlar)
agar doktor nishoni hujum qilinganlar ichida boʻlsa → u qutqariladi
halok boʻlganlar = qolgan hujum qilinganlar
```

- **Faol qadam** — rol egasi tirik va Maʼshuqa uni band qilmagan.
- Mafiya qadami faqat **barcha** tirik mafiya aʼzolari band qilingandagina bekor boʻladi
  (yaʼni yagona tirik mafiyani band qilish kerak).

#### Gʻalaba shartlari

Har bir tun va ovoz berishdan keyin tekshiriladi (tartib muhim):

1. Hech kim tirik qolmadi → **Durang**
2. Mafiya ham, Manyak ham qolmadi → **Tinch aholi**
3. Manyak yoʻq va mafiya soni ≥ qolganlar soni → **Mafiya**
4. Mafiya yoʻq, Manyak tirik va tinch aholidan ≤ 1 kishi qoldi → **Manyak**
5. Faqat Manyak va mafiya qoldi: mafiya ≥ 2 → **Mafiya**, aks holda **Durang**

---

## Arxitektura (FSD)

Loyiha [Feature-Sliced Design](https://feature-sliced.design) metodologiyasi boʻyicha qurilgan.
Kod **qatlamlarga** (layers), qatlamlar **boʻlaklarga** (slices), boʻlaklar **segmentlarga** boʻlinadi.

### Qatlamlar va import qoidasi

```
app        → ilovani ishga tushirish: router, global stillar, provayderlar
pages      → toʻliq sahifalar (marshrutlar)
widgets    → katta mustaqil UI bloklari (oʻyin ekranlari, header)
features   → foydalanuvchi harakatlari (oʻyinni boshlash, rol sozlash, ovoz berish…)
entities   → biznes obyektlari va ularning mantigʻi (player, topic, imposter, mafia)
shared     → biznesdan xoli qayta ishlatiladigan kod (UI-kit, lib, i18n, config)
```

**Asosiy qoida:** qatlam faqat **oʻzidan pastdagi** qatlamlardan import qila oladi.
Bir qatlamdagi boʻlaklar bir-birini import qilmaydi (masalan, `features/mafia-night`
`features/mafia-vote`'ni bilmaydi).

```
app ──▶ pages ──▶ widgets ──▶ features ──▶ entities ──▶ shared
```

### Public API

Har bir boʻlakning ildizida `index.ts` bor — tashqariga faqat u orqali chiqiladi:

```ts
// ✅ Toʻgʻri
import { useMafiaStore, RoleBadge } from '@/entities/mafia'

// ❌ Notoʻgʻri — boʻlakning ichki tuzilmasiga bogʻlanib qolish
import { useMafiaStore } from '@/entities/mafia/model/store'
```

### Segmentlar

| Segment   | Nima saqlanadi                                             |
| --------- | ---------------------------------------------------------- |
| `ui/`     | React komponentlar va ularning tarjimalari (`messages.ts`) |
| `model/`  | Turlar, sof domen funksiyalari, Zustand store'lar, hooklar |
| `lib/`    | Boʻlak ichidagi yordamchi funksiyalar                      |
| `config/` | Konstantalar, statik maʼlumotlar (rollar, soʻzlar bazasi)  |

### Fayl tuzilmasi

```
src/
├── main.tsx                         # Kirish nuqtasi
├── app/
│   ├── App.tsx                      # RouterProvider
│   ├── router/
│   │   ├── router.tsx               # Marshrutlar (lazy sahifalar)
│   │   ├── RootLayout.tsx           # Tema va tilni qoʻllash, ScrollRestoration
│   │   └── AppLoader.tsx            # Birinchi yuklanish indikatori
│   └── styles/index.css             # Tailwind, tokenlar, animatsiyalar
│
├── pages/
│   ├── home/                        # Oʻyin tanlash
│   ├── imposter-setup/              # Imposter sozlamalari + qoidalar
│   ├── imposter-game/               # Imposter oʻyini (sessiya guard'i bilan)
│   ├── mafia-setup/                 # Mafia sozlamalari + qoidalar
│   └── mafia-game/                  # Mafia oʻyini (Undo, jurnal, chiqish)
│
├── widgets/
│   ├── app-header/                  # Sticky header: orqaga, sarlavha, til, tema
│   ├── imposter-game/               # Reveal → Discussion → Result bosqichlari
│   └── mafia-game/                  # Reveal → Night → Morning → Day → Voting → Verdict → Over
│
├── features/
│   ├── player-roster/               # Oʻyinchilar soni va ismlarini tahrirlash
│   ├── imposter-settings/           # Mavzular va Imposter parametrlari
│   ├── imposter-start/              # Validatsiya + tasodifiy raund yaratish
│   ├── mafia-roles/                 # Rollar taqsimoti va qoidalar
│   ├── mafia-start/                 # Validatsiya + rollarni tarqatish
│   ├── mafia-night/                 # Boshlovchi uchun tungi wizard
│   ├── mafia-vote/                  # Kunduzgi ovoz berish paneli
│   ├── exit-game/                   # Tasdiqlash bilan oʻyindan chiqish
│   ├── theme-toggle/                # Tema store'i va tugmasi
│   └── language-switch/             # UZ | EN almashtirgich
│
├── entities/
│   ├── player/                      # Player turi, roster store, ism validatsiyasi
│   ├── topic/                       # 16 mavzu, 500+ soʻz, tasodifiy soʻz tanlash
│   ├── imposter/                    # Raund yaratish, fazalar, store
│   └── mafia/                       # Rollar, taqsimot, tun mantigʻi, gʻolib, store (undo), RoleBadge, GameLog
│
└── shared/
    ├── ui/                          # Button, Card, Stepper, Switch, Dialog, RevealCard, CountdownTimer…
    ├── lib/                         # random, cn, useCountdown, useWakeLock, vibrate/playAlarm…
    ├── i18n/                        # defineMessages, useTranslation, til store'i
    └── config/                      # ROUTES, STORAGE_KEYS
```

### Muhim dizayn qarorlari

- **Sof domen mantigʻi.** Oʻyin qoidalari (`entities/*/model/*.ts`) React'dan mustaqil sof
  funksiyalar: `(session, harakat) → yangi session`. Store'lar faqat ularni chaqiradi.
  Shu sababli mantiq oson testlanadi.
- **Oʻyin sessiyasi — snapshot.** Oʻyin boshlanganda oʻyinchilar roʻyxatining nusxasi olinadi,
  shuning uchun oʻyin davomida roʻyxatni tahrirlash joriy oʻyinni buzmaydi.
- **Entity'lar bir-birini import qilmaydi.** Masalan, `entities/imposter` mavzu turini emas,
  oʻzining `ImposterTopicSnapshot`'ini ishlatadi; soʻz tanlash va raund yaratishni
  `features/imposter-start` birlashtiradi.
- **Sahifalar lazy yuklanadi**, `react`/`react-router` alohida vendor chunk'larda — ilova kodi
  yangilanganda brauzer kutubxonalarni keshdan oladi.

---

## Holat boshqaruvi

Barcha global holat — **Zustand** store'lar, `persist` middleware orqali `localStorage`'da:

| Store              | Kalit             | Nima saqlanadi                                         |
| ------------------ | ----------------- | ------------------------------------------------------ |
| `useRosterStore`   | `maboys:players`  | Oʻyinchilar roʻyxati (ikkala oʻyin uchun umumiy)       |
| `useImposterStore` | `maboys:imposter` | Sozlamalar, joriy sessiya, chiqqan soʻzlar tarixi      |
| `useMafiaStore`    | `maboys:mafia`    | Sozlamalar, joriy sessiya, undo tarixi (30 qadamgacha) |
| `useThemeStore`    | `maboys:theme`    | `light` / `dark` / `system`                            |
| `useLanguageStore` | `maboys:language` | `uz` / `en`                                            |

### Imposter fazalari

```
reveal ──(oxirgi oʻyinchi)──▶ discussion ──("Imposterni koʻrsatish")──▶ result ──("Keyingi raund")──▶ reveal
```

### Mafia fazalari

```
reveal ─▶ night ─▶ morning ─▶ day ─▶ voting ─▶ verdict ─▶ night …
                      │                            │
                      └──── (gʻolib bor) ─────▶ over ◀┘
```

### Undo (Mafia)

Store'da ikki xil yangilash bor:

- `patch` — mayda oʻzgarishlar (nishon tanlash, wizard qadami) — tarixga yozilmaydi;
- `commit` — faza oʻtishlari (tunni yakunlash, ovoz berish…) — oldingi holat `history`'ga saqlanadi.

`undo()` oxirgi `commit`dan oldingi holatni qaytaradi.

### Versiyalar va migratsiya

Saqlangan holat tuzilmasi oʻzgarsa, store `version` oshiriladi va `migrate` yoziladi.
Masalan, `maboys:imposter` v2 da ovoz berish fazalari olib tashlangan: eski sessiya tashlanadi,
sozlamalar va soʻzlar tarixi saqlanib qoladi.

---

## Tasodifiylik

`shared/lib/random.ts` — barcha tasodifiy tanlovlar shu yerdan:

| Funksiya         | Tavsif                                                              |
| ---------------- | ------------------------------------------------------------------- |
| `randomInt(max)` | `crypto.getRandomValues` + **rejection sampling** — modulo bias'siz |
| `shuffle(items)` | **Fisher–Yates** algoritmi, asl massivni oʻzgartirmaydi             |
| `pickRandom`     | Bitta tasodifiy element                                             |
| `sample(n)`      | Takrorlanmaydigan `n` ta element                                    |
| `coinFlip()`     | 50/50                                                               |

**Soʻz tanlash** (`entities/topic/lib/pick-word.ts`) ikki bosqichli:

1. Tanlangan mavzulardan biri — **teng ehtimollikda** (mavzudagi soʻzlar soniga bogʻliq emas);
2. Shu mavzuning **hali chiqmagan** soʻzlaridan biri.

Tanlangan mavzulardagi barcha soʻzlar chiqib boʻlsa, tarix avtomatik tozalanadi.

---

## Tarjimalar (i18n)

Tashqi kutubxona ishlatilmagan — oʻrniga **tip-xavfsiz** kichik yechim. Tarjimalar
FSD ruhida **oʻz boʻlagi yonida** saqlanadi (`ui/messages.ts`):

```ts
import { defineMessages, useTranslation } from '@/shared/i18n'

const messages = defineMessages({
  uz: { title: 'Oʻyinchilar', count: (n: number) => `${n} ta oʻyinchi` },
  en: { title: 'Players', count: (n: number) => `${n} players` },
})

export function Example() {
  const t = useTranslation(messages)
  return <h2>{t.title} · {t.count(7)}</h2>
}
```

- `uz` — manba tuzilma. `en`'da kalit yetishmasa yoki ortiqcha boʻlsa — **TypeScript xatosi**.
- Gaplar funksiya boʻlishi mumkin (sonlar, ismlar uchun).
- Domen maʼlumotlari (soʻzlar, mavzu nomlari) `LocalizedText` koʻrinishida: `{ uz: 'Sher', en: 'Lion' }`.
- Umumiy soʻzlar: `commonMessages` (`shared/i18n/common.ts`).

**Yangi til qoʻshish** (masalan, `ru`): `shared/i18n/types.ts`'dagi `LANGUAGES`'ga qoʻshing —
TypeScript tarjimasi yetishmayotgan barcha joylarni koʻrsatadi.

---

## Dizayn tizimi va temalar

- **Tailwind CSS v4**, konfiguratsiya CSS ichida: `src/app/styles/index.css`.
- **Semantik rang tokenlari**: `background`, `foreground`, `card`, `muted`, `muted-foreground`,
  `border`, `primary`, `ring`. `:root` va `.dark` da qiymatlari almashadi, komponentlar esa
  `bg-card text-foreground` kabi klasslardan foydalanadi — `dark:` prefiksi deyarli kerak emas.
- **Dark mode** — `@custom-variant dark` orqali `<html class="dark">` ga bogʻlangan.
  `index.html`'dagi kichik inline skript temani React yuklanishidan **oldin** qoʻllaydi.
- **Shriftlar**: `Unbounded` (sarlavhalar), `Manrope` (matn) — `@fontsource-variable` orqali,
  internetsiz ham ishlaydi.
- **Mobil**: `max-w-md` ustun, `100dvh`, `env(safe-area-inset-*)`, pastki harakat paneli (`BottomBar`).
- **Harakat**: `prefers-reduced-motion` yoqilgan boʻlsa animatsiyalar oʻchadi.
- **Klasslarni birlashtirish**: `cn()` = `clsx` + `tailwind-merge`.

---

## Kengaytirish qoʻllanmasi

### Yangi soʻz qoʻshish

`src/entities/topic/config/topics/*.ts` — kerakli mavzuga `[oʻzbekcha, inglizcha]` juftligini qoʻshing:

```ts
export const animalsTopic = defineTopic({
  id: 'animals',
  emoji: '🦁',
  name: { uz: 'Hayvonlar', en: 'Animals' },
  words: [
    ['Sher', 'Lion'],
    ['Yoʻlbars', 'Tiger'],
    ['Kalamush', 'Rat'], // ← yangi
  ],
})
```

> Soʻzlar ataylab **oddiy va hammaga tushunarli** tanlangan (kundalik nutqdagi soʻzlar,
> keng tarqalgan oʻzlashma soʻzlar). Test takroriy soʻzlarni avtomatik aniqlaydi.

### Yangi mavzu qoʻshish

1. `entities/topic/model/types.ts` → `TopicId`'ga yangi id qoʻshing.
2. Mos faylda `defineTopic({...})` bilan mavzu yarating (kamida 25 ta soʻz — test tekshiradi).
3. `entities/topic/config/topics/index.ts` → `TOPICS` massiviga qoʻshing.

### Yangi Mafia roli qoʻshish

1. `entities/mafia/config/roles.ts` — `MAFIA_ROLE_IDS`, `MAFIA_ROLES`, `SPECIAL_ROLE_IDS`;
   tunda harakat qilsa — `NIGHT_STEP_IDS`.
2. `entities/mafia/config/messages.ts` — nomi, tavsifi, maqsadi (uz/en). TypeScript eslatadi.
3. `entities/mafia/model/distribution.ts` — `recommendRoleCounts`.
4. `entities/mafia/model/night.ts` — `getTargetRestriction`, `resolveNight` (agar taʼsiri boʻlsa).
5. `entities/mafia/model/winner.ts` — agar alohida gʻalaba sharti boʻlsa.
6. `features/mafia-night/ui/messages.ts` — tungi skript matni.
7. `entities/mafia/model/mafia.test.ts` — testlar.

### Yangi oʻyin qoʻshish

1. `entities/<oʻyin>` — turlar, sof mantiq, store.
2. `features/<oʻyin>-start`, `features/<oʻyin>-settings` — sozlash va boshlash.
3. `widgets/<oʻyin>-game` — fazalar boʻyicha ekranlar.
4. `pages/<oʻyin>-setup`, `pages/<oʻyin>-game`.
5. `shared/config/routes.ts` va `app/router/router.tsx` — marshrutlar; `pages/home` — kartochka.

---

## Testlar

```bash
pnpm test
```

| Fayl                                      | Nima tekshiriladi                                                                  |
| ----------------------------------------- | ---------------------------------------------------------------------------------- |
| `shared/lib/random.test.ts`               | Diapazon, taqsimotning tekisligi, shuffle/sample toʻgʻriligi                       |
| `entities/player/lib/names.test.ts`       | Ism taklif qilish, boʻsh/takroriy ismlarni aniqlash                                |
| `entities/topic/lib/pick-word.test.ts`    | Soʻzlar bazasi yaxlitligi, takrorlanmaslik, tarix tugashi                          |
| `entities/imposter/model/session.test.ts` | Raund yaratish, imposterlar soni, fazalar                                          |
| `entities/mafia/model/mafia.test.ts`      | Taqsimot (4–24 oʻyinchi), tun natijasi, Doktor/Maʼshuqa qoidalari, gʻolib, sikllar |

Oʻyin mantigʻi React'dan ajratilgani uchun testlar brauzersiz, millisekundlarda ishlaydi.

---

## Deploy

```bash
pnpm build   # natija: dist/
```

Bu **SPA** (React Router `createBrowserRouter`) — hosting barcha yoʻllarni `index.html`'ga yoʻnaltirishi kerak.

**Vercel** — `vercel.json`:

```json
{ "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }] }
```

**Netlify** — `public/_redirects`:

```
/*  /index.html  200
```

---

## Kod yozish qoidalari

- **TypeScript strict** + `noUncheckedIndexedAccess` + `erasableSyntaxOnly` (enum oʻrniga `as const` va union turlar).
- **Import alias**: `@/` → `src/`. Boʻlaklar orasida faqat public API (`index.ts`) orqali.
- **Komponentlar** — named export, PascalCase fayl nomi; hooklar va mantiq — kebab-case `.ts` fayllar.
- **React Compiler** yoqilgan: `useMemo`/`useCallback` qoʻlda yozilmaydi; render paytida
  `Date.now()`, `Math.random()` va ref'larni oʻqish taqiqlanadi (ESLint nazorat qiladi).
- **Store'dagi mantiq** — sof funksiyalarda (`model/session.ts`), store faqat ularni chaqiradi.
- **Formatlash** — Prettier (nuqtali vergulsiz, bitta qoʻshtirnoq, Tailwind klasslari avtomatik saralanadi).
- **Izohlar** — oʻzbek tilida, faqat "nima uchun"ni tushuntirish kerak boʻlgan joylarda.
