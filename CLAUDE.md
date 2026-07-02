# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

**brokenmandarin** — music brand website. Currently a landing page announcing a new music release. Planned future features: merch store, blog, music sharing.

## Commands

```bash
npm run dev          # local dev server (http://localhost:3000)
npm run build        # production build
npm run lint         # ESLint

firebase deploy --only firestore   # deploy Firestore rules
```

### Firebase App Hosting (deployment)

This project deploys via **Firebase App Hosting** (not classic Firebase Hosting). Deploy by pushing to the connected git branch — App Hosting builds and deploys automatically. Manual deploys use:

```bash
firebase apphosting:backends:deploy
```

First-time setup: `firebase apphosting:backends:create` (interactive), then link it to the git repo.

## Tech stack

| Layer | Choice |
|---|---|
| Frontend | Next.js 16 (App Router), React 19 |
| Styles | Tailwind CSS v4 (CSS-first config) |
| Fonts | Space Grotesk (via `next/font/google`) |
| Auth/DB | Firebase (Auth, Firestore) |
| Storage | Firebase Storage (for music/images) |
| Hosting | Firebase App Hosting |

## Architecture

### Tailwind v4

This project uses Tailwind v4, which configures via `globals.css` rather than `tailwind.config.ts`. Custom colors, fonts, and tokens live in the `@theme {}` block in `src/app/globals.css`. There is no `tailwind.config.ts`.

Custom design tokens:
- `--color-background`: `#0d0d0d` → `bg-background`, `text-background`
- `--color-foreground`: `#f5f0ec` → `text-foreground`
- `--color-accent`: `#ff6b35` (mandarin orange) → `text-accent`, `bg-accent`
- `--font-sans`: Space Grotesk (via CSS variable from `next/font`)

The `.wordmark` CSS class in `globals.css` handles the responsive fluid display type for the brand name.

### Firebase

`src/lib/firebase/client.ts` initializes the Firebase client SDK using `getApps()` to prevent duplicate initialization in Next.js hot-reload. All `NEXT_PUBLIC_FIREBASE_*` env vars must be set in `.env.local` (copy from `.env.local.example`).

For server-side Firebase (Admin SDK — needed for blog/merch/music admin writes), add `src/lib/firebase/admin.ts` using `firebase-admin` with a service account.

### Future features

When adding these features, follow this structure:
- **Blog** — `src/app/blog/` route, Firestore `posts` collection, admin writes via Firebase Admin SDK in Server Actions or Route Handlers
- **Music** — `src/app/music/` route, Firebase Storage for audio files, Firestore `tracks` collection for metadata
- **Merch** — `src/app/merch/` route; evaluate Shopify Buy SDK vs. a custom Firestore + Stripe integration

### Firebase Security Rules

`firestore.rules` is currently locked down (deny all). Expand it as features are added. Deploy with `firebase deploy --only firestore`.
