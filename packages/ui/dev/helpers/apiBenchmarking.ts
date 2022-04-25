import { performance } from 'perf_hooks'

import { ApiPromise, ApiRx } from '@polkadot/api'
import { firstValueFrom, Observable } from 'rxjs'

import { benchmark } from '../../src/common/utils/benchmark'
import { ALICE } from '../node-mocks/data/addresses'
import { withPromiseApi, withRxApi } from '../node-mocks/lib/api'

const ENDPOINT = 'wss://rpc.joystream.org:9944' // TODO pass as a parameter
const DEFAULT_DURATION = 5_000

export const apiBenchmarking = {
  command: 'api-benchmarking',
  describe: 'Benchmark the chain api',
  handler: () =>
    benchmarkApi.rxjs(
      {
        title: 'PaymentInfo',
        operation: (api) => api.tx.members.confirmStakingAccount(0, ALICE).paymentInfo(ALICE),
      },
      {
        title: 'voteExistsByProposalByVoter',
        operation: (api) => api.query.proposalsEngine.voteExistsByProposalByVoter.size(0, 0),
      }
    ),
}

interface Operation<Api, R> {
  title: string
  operation: (api: Api, count: number) => R
  duration?: number
}

const benchmarkApi = {
  promise: (...operations: Operation<ApiPromise, Promise<any>>[]) =>
    withPromiseApi(ENDPOINT)(async (api) => {
      for (const { title, operation, duration = DEFAULT_DURATION } of operations)
        await benchmark(title, (count) => operation(api, count), duration, performance)
    }),

  rxjs: (...operations: Operation<ApiRx, Observable<any>>[]) =>
    withRxApi(ENDPOINT)(async (api) => {
      for (const { title, operation, duration = DEFAULT_DURATION } of operations)
        await benchmark(title, (count) => firstValueFrom(operation(api, count)), duration, performance)
    }),
}
