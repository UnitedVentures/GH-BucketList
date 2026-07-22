import { featured, upcoming } from '../data/editions.js'

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

// calendar-ordered (Jan → Dec), independent of the Sep→Aug edition cycle —
// shared by MonthRail (the list itself) and App (slide-direction lookups)
export const months = [featured, ...upcoming]
  .map((d) => ({
    slug: d.slug,
    place: d.place,
    short: MONTH_NAMES[
      MONTH_NAMES.findIndex((m) => d.month.startsWith(m))
    ].slice(0, 3).toUpperCase(),
    monthIndex: MONTH_NAMES.findIndex((m) => d.month.startsWith(m)),
  }))
  .sort((a, b) => a.monthIndex - b.monthIndex)

export function monthIndexForSlug(slug) {
  const found = months.find((m) => m.slug === slug)
  if (found) return found.monthIndex
  return months.find((m) => m.slug === featured.slug)?.monthIndex ?? 0
}
