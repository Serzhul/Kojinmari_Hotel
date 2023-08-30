import { add, formatDistance, parseISO } from 'date-fns'
import { differenceInDays } from 'date-fns/esm'

export const subtractDates = (dateStr1: string, dateStr2: string) =>
  differenceInDays(parseISO(String(dateStr1)), parseISO(String(dateStr2)))

export const formatDistanceFromNow = (dateStr: string) =>
  formatDistance(parseISO(dateStr), new Date(), {
    addSuffix: true,
  })
    .replace('about ', '')
    .replace('in', 'In')

export const getToday = function (options: { end?: boolean }) {
  const today = new Date()

  if (options?.end)
    // Set to the last second of the day
    today.setUTCHours(23, 59, 59, 999)
  else today.setUTCHours(0, 0, 0, 0)
  return today.toISOString()
}

export const formatCurrency = (value: number) =>
  new Intl.NumberFormat('ko', { style: 'decimal' }).format(value)

export function fromToday(numDays: number, withTime = false) {
  const date = add(new Date(), { days: numDays })
  if (!withTime) date.setUTCHours(0, 0, 0, 0)
  return date.toISOString().slice(0, -1)
}
