import { differenceInHours } from 'date-fns'

import { formatDateString } from './formatters'
import { relativeTime } from './relativeTime'

export const relativeIfRecent = (timestamp: string, hoursBreakpoint = 24, now = new Date()) =>
  differenceInHours(now, new Date(timestamp)) >= hoursBreakpoint
    ? formatDateString(timestamp)
    : relativeTime(timestamp, now.getTime())
