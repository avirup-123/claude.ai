# CalTrack — Product Specification

## Overview

**CalTrack** is a lightweight, client-side web application for logging daily meals, monitoring calorie intake against a fixed daily target, and visualizing weekly calorie trends. There is no backend, no login, and no account creation — all data lives in the browser.

---

## Goals

- Make it effortless to log a meal in under 10 seconds
- Give a clear, at-a-glance view of today's calorie status
- Show a 7-day history so users can understand their weekly patterns
- Zero friction: no sign-up, no server, no installation required

---

## Tech Stack

| Layer | Choice | Notes |
|---|---|---|
| Framework | Next.js 16 (App Router) | Turbopack is the default dev bundler |
| Language | TypeScript | Strict mode via tsconfig |
| Styling | Tailwind CSS v4 | Utility-first; configured via `@tailwindcss/postcss` |
| Charts | Recharts v3 | Bar chart for weekly history |
| Food data | Open Food Facts API | Free, no API key required |
| Persistence | localStorage | No backend; data is browser-local |

---

## User Interface

### Layout

- Single-page app — no client-side routing
- Two tabs at the top: **Today** and **History**
- White card layout on a light gray (`bg-gray-100`) background
- Responsive: works on mobile and desktop

---

## Features

### Tab 1 — Today

#### Meal Logging

- Text input: user types a food name (e.g. "banana", "chicken breast")
- As the user types (debounced), query the Open Food Facts API for matching products
- Display up to 5 suggestions as a dropdown list, each showing:
  - Food name
  - Calories per 100g (or per serving if available)
- User selects a suggestion → food is added to today's log
- User can also manually enter a calorie value if no suggestion fits
- Logged entries appear as a flat list below the input:
  - Food name, calorie amount, delete button
  - Inline edit for calorie value

#### Daily Summary

- Progress bar: calories consumed vs. 2,000 kcal target
  - Blue when under target, red when over
- Text display:
  - "X kcal consumed of 2,000 kcal"
  - "Y kcal remaining" or "Z kcal over target"

---

### Tab 2 — History

#### 7-Day Bar Chart

- X-axis: last 7 days (Mon–Sun or rolling 7 days)
- Y-axis: calories (0 to ~2,500+)
- Each bar represents one day's total intake
  - **Blue** bar = under 2,000 kcal (deficit)
  - **Red** bar = over 2,000 kcal (surplus)
- A horizontal reference line at 2,000 kcal

#### Daily Breakdown Table

- Below the chart: table with columns — Date, Calories, Deficit/Surplus
- Final row: **7-day net total** (sum of daily deficit/surplus)

---

## Data Model

All data stored in `localStorage` under the key `caltrack_log`.

```json
{
  "2026-03-22": [
    { "id": "uuid", "name": "Banana", "calories": 89 },
    { "id": "uuid", "name": "Chicken breast 150g", "calories": 248 }
  ],
  "2026-03-21": [...]
}
```

---

## Non-Goals (out of scope)

- User accounts or authentication
- Syncing across devices
- Macro tracking (protein, fat, carbs)
- Custom calorie targets (fixed at 2,000 kcal)
- Meal categories (breakfast, lunch, dinner)
- Notifications or reminders
- PWA / offline-first caching

---

## Design Tokens

| Token | Value |
|---|---|
| Daily calorie target | 2,000 kcal |
| Background | `bg-gray-100` |
| Card | `bg-white`, rounded, shadow-sm |
| Under-target color | Blue (`#3B82F6`) |
| Over-target color | Red (`#EF4444`) |
| Font | System default via Tailwind |
