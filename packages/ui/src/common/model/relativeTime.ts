import { significantTimeUnit } from './significantTimeUnit'

export function relativeTime(time: string, now = Date.now()) {
  const dateNumber = new Date(time).valueOf()
  const relativeSeconds = Math.floor((dateNumber - now) / 1000)

  const { unit, count } = significantTimeUnit(relativeSeconds)
  if (unit) {
    const format = new Intl.RelativeTimeFormat('en')
    return format.format(count, unit)
  }

  if (relativeSeconds > 0) {
    return 'soon'
  }
  return 'a short while ago'
}
