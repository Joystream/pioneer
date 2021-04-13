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

export function relativeTime(time: string, now = Date.now()) {
  const dateNumber = new Date(time).valueOf()
  const format = new Intl.RelativeTimeFormat('en')
  const relativeSeconds = Math.floor((dateNumber - now) / 1000)

  for (const { scale, unit } of scales) {
    if (Math.abs(relativeSeconds) >= scale) {
      const positive = relativeSeconds > 0
      const round = positive ? Math.floor : Math.ceil
      return format.format(round(relativeSeconds / scale), unit)
    }
  }

  if (relativeSeconds > 0) {
    return 'soon'
  }
  return 'a short while ago'
}
