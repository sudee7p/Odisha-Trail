# OdishaTrail — Smart Tourism Planner

A frontend-only React + Vite + Tailwind v4 travel companion for Odisha.
42 curated destinations, 12 hotels, 6 festivals, route optimisation, expense planner, and a beautiful landing page.

## Quick start

Requires **Node.js 18+** (works on 18, 20, 22, 24).

```bash
npm install
npm run dev
```

Then open <http://localhost:5173>.

## Build for production

```bash
npm run build
npm run preview
```

The optimised bundle is emitted to `dist/`.

## Tech stack

- React 18 + TypeScript
- Vite 5
- Tailwind CSS v4 (via `@tailwindcss/vite`)
- wouter (router), lucide-react (icons)
- Radix UI primitives + shadcn-style components
- 100% client-side — no backend, no database. State is persisted in `localStorage`.

## Project structure

```
src/
  pages/         Landing, Dashboard, Explore, Map, Hotels, Festivals, Itinerary, Wishlist
  components/    Sidebar, Topbar, PlaceCard, HotelCard, DetailModal, LeafletMap, ui/*
  data/          places.ts (42 destinations + 6 festivals), hotels.ts (12 hotels)
  utils/         distance.ts (haversine + nearest-neighbour route), expense.ts (cost calc)
  lib/           state.ts (localStorage-backed singleton), utils.ts
  hooks/         use-mobile, use-toast
```

## Features

- **Smart route planner** — greedy nearest-neighbour optimisation across selected stops, grouped into days.
- **Expense planner** — live travel/hotel/food/entry-fee breakdown with budget warnings.
- **Hotel booking (mock)** — 12 properties filterable by city, price, rating.
- **Festival matchmaker** — auto-surfaces Odia festivals overlapping your travel dates.
- **Beautiful landing page** with sign-in (mock auth — name + email saved locally).

## Notes

No pnpm, no monorepo, no native bindings — `npm install && npm run dev` is all you need.
