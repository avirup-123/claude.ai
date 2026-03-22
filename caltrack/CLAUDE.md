@AGENTS.md

# CalTrack

A simple web app to log daily meals, monitor calorie intake, and visualize your weekly calorie deficit.

## Tech Stack

- **Framework**: Next.js 16 (App Router) — Turbopack is the default dev bundler
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 (configured via `@tailwindcss/postcss`)
- **Charts**: Recharts v3
- **Food data**: Open Food Facts API (free, no API key)
- **Storage**: localStorage (no backend, no login)

## Key Features

1. **Meal logging** — Type a food name to get calorie suggestions from Open Food Facts, then add it to today's flat list. Entries can be edited or deleted.
2. **Daily dashboard** — Shows calories consumed vs. a fixed 2,000 kcal daily target with a progress bar (blue = under, red = over). Displays remaining or over-by amount.
3. **7-day chart** — Bar chart showing daily calories consumed vs. target. Blue = under target (deficit), red = over target (surplus). Includes a daily breakdown table with a 7-day net deficit/surplus total.

## Design Preferences

- Clean, minimal UI with a white card layout on a light gray background
- Single-page app with two tabs: **Today** and **History** — no routing
- Daily target is fixed at **2,000 kcal**
- No user accounts, no login, no backend
- Data persists in the browser via localStorage
