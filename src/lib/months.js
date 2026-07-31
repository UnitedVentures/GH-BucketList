import { featured, upcoming } from '../data/editions.js'

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

// calendar-ordered (Jan → Dec), independent of the Sep→Aug edition cycle
export const months = [featured, ...upcoming]
  .map((d) => {
    const name = MONTH_NAMES[MONTH_NAMES.findIndex((m) => d.month.startsWith(m))]
    return {
      ...d,
      short: name.slice(0, 3).toUpperCase(),
      full: name.toUpperCase(),
      monthIndex: MONTH_NAMES.indexOf(name),
    }
  })
  .sort((a, b) => a.monthIndex - b.monthIndex)
