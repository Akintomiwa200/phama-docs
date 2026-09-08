# Metebolme — Design System

The design language used by the homepage (and app shell) so every new page ships
with the same look. Components referenced here already exist — reuse them, don't
reinvent.

---

## 1. Brand & Voice

- **Name:** Metebolme
- **What it is:** a medical dictionary, library and database.
  Headlines frame the three pillars: *dictionary*, *drug database*, *library*.
- **Tone:** clear, trustworthy, plain‑language. Avoid AI/neuroscience jargon
  (that was an earlier brand direction and is gone).
- **Emphasis trick:** on the hero, one word of a headline is de‑emphasized
  (lighter weight + muted color) rather than highlighted — see Hero.

## 2. Color

### Accent — rose (pink/red)

Single accent scale, used for brand touches, active states and primary actions.

| Token | Use |
| --- | --- |
| `rose-600` `#e11d48` | primary buttons, active icons |
| `rose-500` `#f43f5e` | chart primary, focus borders, spinner, logo |
| `rose-700` `#be123c` | hover text on active sidebar items, stat icon |
| `rose-400` `#fb7185` | dark‑mode active text / secondary chart |
| `rose-300` `#fda4af` | tertiary chart color, dark‑mode tints |
| `rose-100` | light avatar/icon chips |
| `rose-50` / `dark:rose-900/20` | active row highlight / icon tiles |
| `Favicon` | red gradient `#dc2626 → #ef4444`, white glyph |

**Chart palettes** (Recharts `fill`):
- categorical: `#f43f5e → #fb7185 → #fda4af → #fecdd3 → #ffe4e6 → #fff1f2`
- semantic: success `#22c55e`, warning `#eab308`, danger `#ef4444`, info `#06b6d4`

### Neutrals & surfaces

- Headings: `text-gray-900 dark:text-gray-100`
- Body/meta: `text-gray-500 dark:text-gray-400`
- Section background (marketing): `bg-white dark:bg-gray-950`
- App surfaces (dashboards): `bg-gray-50 dark:bg-gray-900` sidebar, `bg-white
  dark:bg-gray-800` inputs/table rows
- Borders/cards: `border-gray-200 dark:border-gray-800`, list dividers
  `divide-gray-200 dark:divide-gray-800`
- Buttons/dark pills: `bg-gray-900 dark:bg-white dark:text-gray-900`

> **Rule:** every color utility gets a `dark:` twin. No hardcoded hex except the
> rose chart palette in `src/lib/constants.ts`.

## 3. Typography

- **Fonts:** Geist Sans (`--font-geist-sans`) + Geist Mono (`--font-geist-mono`),
  applied via `class` on `<html>` in `app/layout.tsx`. Fallback `Arial, Helvetica`.
- **Marketing display** (Hero): `font-[600]`, `tracking-[-0.055em]`,
  `leading-[0.92]`, `text-[42px] → sm:48 → lg:54 → xl:58`. Headings on large
  sections: `text-2xl sm:text-[1.75rem]` to `text-[2rem] sm:text-[2.5rem]`,
  `tracking-tight`.
- **App page headings:** `h1 text-2xl font-bold text-gray-900 dark:text-gray-100`;
  subtitle `text-sm text-gray-500 dark:text-gray-400`.
- **Body/meta:** `text-[10px]–[13px]`, `text-xs`, `leading-relaxed`. Avoid pure
  black; use gray shades.
- De‑emphasized word in a headline: `font-[400] text-[#9b9b9f] dark:text-gray-500`.

## 4. Layout & Spacing

- **Marketing container:** `mx-auto max-w-[1280px] (hero) / max-w-[1440px]`,
  padding `px-5→12` responsive. Landing sections separated by
  `border-t border-gray-200 dark:border-gray-800`.
- **Section vertical rhythm:** `py-[60px] sm:py-[80px] lg:py-[100px]`.
- **App pages:** parent `div.space-y-6`; content columns
  `grid gap-6 lg:grid-cols-2`; stat band `grid gap-4 sm:grid-cols-2 lg:grid-cols-4`.
- **Cards** use the shared `Card/CardHeader/CardTitle/CardDescription` kit.
- Navbar floats above everything: `fixed inset-x-0 top-4 z-40` (see §8).

## 5. Component Kit (`src/components/ui/`)

Reuse these; they already implement theme + variants:

- `Button` — `primary` (rose), `default` (gray), `outline`, `ghost`; `size sm|md`.
- `Card`, `CardHeader`, `CardTitle`, `CardDescription`
- `Badge` — `success | warning | danger | info`
- `Input` — supports `label` prop; focus ring is rose
- `Table` — `TableHeader/TableBody/Row/Head/Cell`
- `StatCard` — title, value, +/- change, icon
- `Tabs`, `Modal`, `EmptyState`, `LoadingSpinner`

## 6. Charts (`src/components/charts/`)

Thin Recharts wrappers. Props used everywhere:

```tsx
dataKeys={[{ key: "value", color: "#f43f5e", name: "Searches" }]}
```

- `AreaChartComponent`, `BarChartComponent`, `LineChartComponent`,
  `PieChartComponent (innerRadius/outerRadius)`, `RadialBarChartComponent`,
  `ComparisonBarChartComponent (dataKey1/dataKey2)`, `StackedBarChartComponent`.
- All data lives in `src/lib/constants.ts`; access via
  `src/services/data.ts` getters (see §10).

## 7. Page Template (app pages)

```tsx
<div className="space-y-6">
  <div>
    <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Dictionary</h1>
    <p className="text-sm text-gray-500 dark:text-gray-400">Subtitle…</p>
  </div>
  <StatsOverview />
  <div className="grid gap-6 lg:grid-cols-2">
    <RevenueChart />
    <CategoryChart />
  </div>
  ...
</div>
```

Reference: `app/dashboard/page.tsx`, `app/medications/page.tsx`,
`app/analytics/page.tsx`, `app/reports/page.tsx`.

## 8. Navbar & Adaptive Text

- Floating pill: `fixed inset-x-0 top-4 z-40 flex justify-center`,
  pill `grid h-14 w-full max-w-6xl grid-cols-[auto_1fr_auto] rounded-full
  border border-white/40 shadow-lg backdrop-blur-2xl backdrop-saturate-150`,
  glass layers live **below** the text (see note below).
- Wordmark + links use `.text-adaptive` (`color:#fff; mix-blend-mode: difference`).
  Inactive links `opacity-70`, active `opacity-100`.
- **Important:** keep `backdrop-blur` on a separate absolutely‑positioned layer
  (`-z-10`) inside the pill, NOT on the pill itself — applying blur on the pill
  breaks `mix-blend-mode` for text in light mode.
- Brand mark: rose `N`/`M` tile (`rounded-md bg-rose-500 text-white`).
- Mobile: dropdown card below the pill, same glass recipe, `md:hidden`.

## 9. Theme & Dark Mode

- Derived from `app/globals.css`: `@custom-variant dark`, light defaults in
  `:root`, `.dark` overrides, `color-scheme` per theme.
- Default follows the OS; user override persisted in `localStorage["theme"]`
  (`light | dark | system`) via `ThemeProvider` in `app/layout.tsx`.
- Add the toggle with `useTheme()` (light/dark/system cards) — see
  `app/settings/page.tsx`.
- Custom scrollbar (thin, rose, reacts to scrolling) is global — don't add your own.

## 10. Data Layer

- **Domain vocabulary** (use in copy): terms / drug entries / monographs /
  library documents / specialties (Cardiology, Neurology, Oncology,
  Endocrinology, Infectious Diseases, Pulmonology) / lookups / saved entries.
- Domain data is centralized, typed, imported from `@/lib/constants` and wrapped
  again by `src/services/data.ts` getters — add new data there, not inline in pages.
- Keep chart data `object[]` with `fill?`; array shapes must match the chart
  wrapper props (`ChartDataPoint`, `SalesData`, `InventoryData`, …).

## 11. Golden Rules

1. Every element ships a `dark:` twin; use the `.dark`-class system, never
   `prefers-color-scheme` alone.
2. Reuse the kit (`Button/Card/Badge/Table/…`) and chart wrappers.
3. Say "dictionary/library/drug database" — the old pharma‑ops and
   neuroscience wording is retired.
4. Copy UI copy into `src/lib/constants.ts` when a page needs data.
5. After building a page, run `pnpm run lint` and `pnpm run build`.