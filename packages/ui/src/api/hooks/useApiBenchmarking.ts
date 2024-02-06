import { useEffect } from 'react'
import { firstValueFrom } from 'rxjs'

import { benchmark } from '@/common/utils/benchmark'

import { Api } from '..'

const ALICE = 'j4W7rVcUCxi2crhhjRq46fNDRbVHTjJrz6bKxZwehEMQxZeSf'

const operation = (api: Api) => {
  const tx = api.tx.members.confirmStakingAccount(0, ALICE)
  return firstValueFrom(tx.paymentInfo(ALICE))
}

export const useApiBenchmarking = (api: Api | undefined) => {
  useEffect(() => {
    if (process.env.REACT_APP_API_BENCHMARK?.toUpperCase() === 'TRUE' && api) {
      let waiting = false
      const interval = setInterval(() => {
        if (!waiting) {
          waiting = true
          benchmark('Payment info', () => operation(api), 2_000).then(() => (waiting = false))
        }
      }, 6_000)
      return () => clearInterval(interval)
    }
  }, [api])
}
