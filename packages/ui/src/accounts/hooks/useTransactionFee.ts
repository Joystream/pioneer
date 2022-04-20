import { SubmittableExtrinsic } from '@polkadot/api/types'
import { ISubmittableResult } from '@polkadot/types/types'
import { useEffect, useMemo } from 'react'
import { map, takeUntil, timer, merge, switchAll, defaultIfEmpty, of, Observable } from 'rxjs'

import { BN_ZERO } from '@/common/constants'
import { useObservable } from '@/common/hooks/useObservable'
import { useTransactionStatus } from '@/common/hooks/useTransactionStatus'
import { Address } from '@/common/types'
import { whenDefined } from '@/common/utils'

import { useBalance } from './useBalance'

const defaultWhenTimeout =
  <T>(fallback: T, timeout: number) =>
  (source: Observable<T>) =>
    source.pipe(
      takeUntil(timer(timeout)),
      defaultIfEmpty(fallback),
      map((data) => merge(of(data), source)),
      switchAll()
    )

export function useTransactionFee(address?: Address, transaction?: SubmittableExtrinsic<'rxjs', ISubmittableResult>) {
  const { status, setStatus } = useTransactionStatus()
  const partialFee = useObservable(
    whenDefined(address, (address) =>
      transaction?.paymentInfo(address).pipe(
        map((paymentInfo) => paymentInfo.partialFee),
        defaultWhenTimeout(BN_ZERO, 1000)
      )
    ),
    [transaction, address]
  )
  const balance = useBalance(address)

  useEffect(() => {
    if (status === null && (!balance || !partialFee)) {
      setStatus('loadingFees')
    }
    return () => {
      if (status === 'loadingFees') {
        setStatus(null)
      }
    }
  }, [balance, partialFee])

  return useMemo(
    () =>
      balance && partialFee
        ? {
            transactionFee: partialFee,
            canAfford: balance.transferable.gte(partialFee),
          }
        : undefined,
    [balance, partialFee]
  )
}
