import { Option } from '@polkadot/types'
import { AccountId32 } from '@polkadot/types/interfaces'
import { combineLatest, map } from 'rxjs'

import { encodeAddress } from '@/accounts/model/encodeAddress'
import { Api } from '@/api'
import { whenDefined } from '@/common/utils'

export const argoConstraints$ = (api: Api | undefined) =>
  whenDefined(api?.query.argoBridge, (argoBridge) =>
    combineLatest({
      operatorAccount: argoBridge
        .operatorAccount()
        .pipe(map((account: Option<AccountId32>) => whenDefined(account.unwrapOr(null)?.toString(), encodeAddress))),
      pauserAccounts: argoBridge
        .pauserAccounts()
        .pipe(map((accounts) => accounts.map((account) => encodeAddress(account.toString())))),
      bridgingFee: argoBridge.bridgingFee(),
      thawnDuration: argoBridge.thawnDuration().pipe(map((duration) => duration.toNumber())),
      remoteChains: argoBridge.remoteChains().pipe(map((chains) => chains.map((chain) => chain.toNumber()))),
    } as const)
  )
