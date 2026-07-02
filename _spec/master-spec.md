# brokenmandarin — Master Spec

## Brand

- **Name:** brokenmandarin
- **Instagram:** @brokenmandarin
- **Domain:** Squarespace-managed domain, pointed to Firebase App Hosting via CNAME/A records
- **Identity:** Bold, graphic, avant-garde music brand. Aesthetic references: editorial design, glitch art, strong typography.

---

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 16 (App Router), React 19 |
| Styling | Tailwind CSS v4 (CSS-first config in `globals.css`, no `tailwind.config.ts`) |
| Font | Barlow (Google Fonts) — 400, 600, 700, 800 |
| Firebase services | App Hosting, Firestore, Storage, Auth, Cloud Functions, Analytics |
| Deployment | Firebase App Hosting — auto-deploys on `git push` to `main` |
| Repo | https://github.com/shyroboto/broken-mandarin-site |

### Design tokens (`globals.css @theme`)
| Token | Value | Usage |
|---|---|---|
| `--color-background` | `#1b34c8` | Cobalt blue, sampled from artwork |
| `--color-foreground` | `#ffffff` | All primary text |
| `--color-orange` | `#f5a500` | Accents, labels, hover states |
| `--color-red` | `#c8000a` | Glitch ghost, accent |
| `--color-green` | `#2a8c2a` | Available for future use |

---

## Current Site — Landing Page (Phase 1)

**Goal:** Single viewport, no scroll. Announce first music release. Build hype.

### Layout
- **Full-viewport lockdown** — `html`/`body` overflow hidden, `h-dvh` on main
- **Artwork** — `Shot Orange Square.jpg` (mandarin illustration, `public/shot-orange.jpg`) floats in 3D space, positioned right-of-center on desktop, centered on mobile
- **Wordmark** — "Broken / Mandarin" in Barlow 800, `clamp(3rem, 15vw, 15rem)`, anchored lower-left
- **Nav** — top bar: wordmark label left, "New Music / Vol. 001" right
- **Footer** — "Out July 2026 — stay close" left, Instagram link + © right
- **Vertical edge label** — "New music dropping soon" rotated along left margin (desktop only)
- **Kicker** — "— First release" above wordmark in orange

### 3D Artwork (`src/app/_components/Artwork3D.tsx`)
- Client component with `useEffect` mouse listener
- **Cursor parallax tilt** — ±24° on X/Y, `0.35s cubic-bezier` smoothing, rAF-throttled
- **Idle float** — 9s ease-in-out drift + 0.6° rotation
- **Perspective** — 1400px, origin at 60% 45%
- `brightness(0.8)` filter + `drop-shadow` on the artwork image
- Chromatic aberration ghosts at `translateZ(40px)` / `translateZ(80px)` — hidden by default, flash on during glitch beats only (no permanent color wash)

### Visual effects
- **Glitch beats** — red/cyan image layers jitter into view for ~1–2 frames on staggered timers (4.2s / 3.6s cycles)
- **Slice displacement** — base image snaps a horizontal band sideways briefly
- **CRT scanlines** — `repeating-linear-gradient` at `z-10` (below UI text at `z-20` so type stays crisp)
- **Scanline flicker** — opacity pulses on a 3s steps timer
- **Vignette** — radial gradient overlay, adds depth to flat blue
- **Title glitch** — subtle horizontal shimmer on wordmark (~0.02em offset, 0.4 opacity), preserves readability
- **`prefers-reduced-motion`** — all animation disabled, ghosts hidden

### Assets
- `assets/Shot Orange Square.jpg` — web-res artwork (105KB)
- `assets/Shot Orange 3000x3000.jpg` — high-res master (301KB)
- `assets/Shot Orange.png` — PNG master, used as favicon
- `public/shot-orange.jpg` — JPEG served by Next.js Image
- `public/favicon.png` — favicon copy in public
- `src/app/icon.png` — favicon registered via Next.js App Router convention (auto-detected, no code needed)

---

## Planned Features (Future Phases)

### Music sharing
- Route: `/music`
- Firebase Storage for audio files
- Firestore `tracks` collection for metadata (title, release date, description, cover art)
- Streaming player component

### Blog
- Route: `/blog`
- Firestore `posts` collection
- Admin writes via Firebase Admin SDK (Server Actions or Route Handlers)
- Firestore security rules: public read, admin write only

### Merch store
- Route: `/merch`
- Options to evaluate: Shopify Buy SDK vs. Firestore + Stripe integration

### Admin
- Firebase Auth (email/password, single admin account)
- Role stored in Firestore `users/{uid}.role`
- No self-registration — admin account created manually

---

## Firebase Setup Notes

- **Project ID:** `brokenmandarin-a5e3e`
- **App Hosting backend:** `broken-mandarin-app` — deploys on push to `main`
- **Firestore rules:** locked down (`allow read, write: if false`) until features are built
- **Storage rules:** same — locked down
- **Functions:** `functions/` directory, TypeScript, v2 API, Node 24, `maxInstances: 10`
- `functions/` is excluded from root `tsconfig.json` (has its own)
- Firebase client SDK initialized in `src/lib/firebase/client.ts` — uses `getApps()` guard, Analytics is browser-only (`typeof window !== "undefined"`)

---

## Design Principles

- **No scroll on landing** — everything fits in one viewport
- **Bold whitespace** — generous negative space is intentional, not empty
- **Typography-forward** — the wordmark is the primary visual element
- **Artwork as 3D object** — the illustration floats, it's not wallpaper
- **Glitch is subtle** — effects should feel like a malfunction, not a theme park; readability always wins
- **Original colors held** — the cobalt blue and mandarin orange are canonical; chromatic aberration should never permanently wash them
