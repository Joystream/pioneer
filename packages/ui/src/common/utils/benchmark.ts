import { info } from '../logger'

export const benchmark = async (
  title: string,
  operation: (count: number) => Promise<any>,
  duration: number,
  performance: Pick<Performance, 'now'> = global.performance
) => {
  let count = 0
  const start = performance.now()

  while (performance.now() - start < duration) {
    await operation(count)
    count++
  }
  const average = (performance.now() - start) / count
  info(`${title}: Average of ${average}ms (${count} samples)`)
}
