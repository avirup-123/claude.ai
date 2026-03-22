# CaloriePal

A personal calorie tracker that calculates your daily deficit goal and helps you stay on track with simple meal logging and progress charts.

---

## Tech Stack

| Layer | Choice |
|---|---|
| Frontend | Next.js (React) |
| Styling | Tailwind CSS |
| Database | SQLite via Prisma |
| Charts | Recharts |
| Deployment | Vercel |

---

## Key Features

1. **Smart goal setup** — One-time form collects age, sex, height, weight, and activity level; TDEE is calculated via Mifflin-St Jeor and a 500 cal/day deficit target is set automatically.
2. **Meal logging** — Log meals by name and calorie count; recent meals are saved for quick re-use.
3. **Progress tracking** — 7-day calorie chart vs. goal, plus a weight log with trend view.

---

## Pages

| Page | Purpose |
|---|---|
| `/setup` | One-time onboarding form |
| `/` (Dashboard) | Today's calories, meals logged today, 7-day chart |
| `/log` | Meal entry form + recent meals list |
| `/weight` | Weight input + trend chart |

---

## Design Preferences

<!-- Add your design preferences here, e.g. color scheme, font, dark/light mode, component style -->

---

## Development Notes

- Deploy via Vercel: push to GitHub, connect repo, set `DATABASE_URL` env var.
- Keep onboarding to a single screen — users should reach the dashboard in under 2 minutes.
