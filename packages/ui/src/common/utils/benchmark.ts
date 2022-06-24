import { debounce } from 'lodash'

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
  info(`${title}: Average of ${average.toLocaleString('en-GB')}ms (${count} samples)`)
}

// Report the combine amount of time spent in all the executions of a function
export const watchFunction = <F extends (...args: any[]) => any>(
  label: string,
  toWatch: F,
  showParams?: (...params: Parameters<F>) => any
): ((...params: Parameters<F>) => ReturnType<F>) => {
  let totalDuration = 0
  let totalCall = 0
  const paramsHistory: any[] = []
  const show = debounce(
    () =>
      info(
        `${label}: Called for ${totalDuration.toLocaleString('en-GB')}ms, ${totalCall.toLocaleString('en-GB')} times`,
        ...(showParams ? [paramsHistory] : [])
      ),
    1000
  )

  return (...params) => {
    const start = performance.now()

    const result = toWatch(...params)

    totalDuration += performance.now() - start
    totalCall++
    showParams && paramsHistory.push(showParams(...params))
    show()

    return result
  }
}
