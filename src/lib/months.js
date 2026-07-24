import { featured, upcoming } from '../data/editions.js'

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

// calendar-ordered (Jan → Dec), independent of the Sep→Aug edition cycle
export const months = [featured, ...upcoming]
  .map((d) => ({
    ...d,
    short: MONTH_NAMES[
      MONTH_NAMES.findIndex((m) => d.month.startsWith(m))
    ].slice(0, 3).toUpperCase(),
    monthIndex: MONTH_NAMES.findIndex((m) => d.month.startsWith(m)),
  }))
  .sort((a, b) => a.monthIndex - b.monthIndex)
