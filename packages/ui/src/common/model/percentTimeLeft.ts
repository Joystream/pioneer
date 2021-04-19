export const percentTimeLeft = (end: string, start: string, passed: Date = new Date()) => {
  const endTime = new Date(end).valueOf()
  const startTime = new Date(start).valueOf()
  const nowTime = passed.valueOf()

  if (endTime < nowTime) {
    return 0
  }

  if (startTime > nowTime) {
    return 100
  }

  const fullTime = endTime - startTime
  const timeLeft = endTime - nowTime

  return Math.round((timeLeft * 100) / fullTime)
}
