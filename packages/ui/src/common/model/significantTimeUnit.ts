const secondsInMinute = 60
const secondsInHour = secondsInMinute * 60
const secondsInDay = secondsInHour * 24
const secondsInWeek = secondsInDay * 7
const secondsInMonth = secondsInDay * 30

const scales: { scale: number; unit: Intl.RelativeTimeFormatUnit }[] = [
  { scale: secondsInMonth, unit: 'month' },
  { scale: secondsInWeek, unit: 'week' },
  { scale: secondsInDay, unit: 'day' },
  { scale: secondsInHour, unit: 'hour' },
  { scale: secondsInMinute, unit: 'minute' },
]

export function significantTimeUnit(seconds: number) {
  for (const { scale, unit } of scales) {
    if (Math.abs(seconds) >= scale) {
      const positive = seconds > 0
      const round = positive ? Math.floor : Math.ceil
      return { count: round(seconds / scale), unit: unit }
    }
  }
  return { count: seconds, unit: undefined }
}
