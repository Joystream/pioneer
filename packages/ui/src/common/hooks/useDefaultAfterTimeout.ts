import { DependencyList, useEffect, useState } from 'react'

import { isDefined } from '@/common/utils'

export const useDefaultAfterTimeout = <T>(
  value: T | undefined,
  delay: number,
  defaultValue: T,
  deps: DependencyList = [value]
) => {
  const [result, setResult] = useState(value)

  useEffect(() => value && setResult(value), [deps])

  useEffect(() => {
    if (!isDefined(result)) {
      const timeout = setTimeout(() => setResult(defaultValue), delay)
      return () => clearTimeout(timeout)
    }
  }, [result])

  return result
}
