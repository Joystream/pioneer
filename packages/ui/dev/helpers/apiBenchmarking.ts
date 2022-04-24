import { performance } from 'perf_hooks'

import { firstValueFrom } from 'rxjs'

import { benchmark } from '../../src/common/utils/benchmark'
import { ALICE } from '../node-mocks/data/addresses'
import { withPromiseApi, withRxApi } from '../node-mocks/lib/api'

const ENDPOINT = 'wss://rpc.joystream.org:9944' // TODO pass as a parameter

const paymentInfo = async () => {
  // Promise API
  await withPromiseApi(ENDPOINT)((api) =>
    benchmark(
      'PaymentInfo promise api',
      () => api.tx.members.confirmStakingAccount(0, ALICE).paymentInfo(ALICE),
      5_000,
      performance
    )
  )

  // RXJS API
  await withRxApi(ENDPOINT)((api) =>
    benchmark(
      'PaymentInfo rxjs api',
      () => firstValueFrom(api.tx.members.confirmStakingAccount(0, ALICE).paymentInfo(ALICE)),
      5_000,
      performance
    )
  )
}

export const apiBenchmarking = {
  command: 'api-benchmarking',
  describe: 'Benchmark the promise api vs rxjs api',
  handler: async () => {
    await paymentInfo()
  },
}
