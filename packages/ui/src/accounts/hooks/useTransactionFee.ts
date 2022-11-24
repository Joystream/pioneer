import { SubmittableExtrinsic } from '@polkadot/api/types'
import { ISubmittableResult } from '@polkadot/types/types'
import BN from 'bn.js'
import { useEffect, useMemo } from 'react'

import { BN_ZERO } from '@/common/constants'
import { useDefaultAfterTimeout } from '@/common/hooks/useDefaultAfterTimeout'
import { useObservable } from '@/common/hooks/useObservable'
import { useTransactionStatus } from '@/common/hooks/useTransactionStatus'
import { Address } from '@/common/types'
import { whenDefined } from '@/common/utils'

import { useBalance } from './useBalance'

export function useTransactionFee(address?: Address, transaction?: SubmittableExtrinsic<'rxjs', ISubmittableResult>) {
  const { status, setStatus } = useTransactionStatus()
  const paymentInfo = useObservable(
    whenDefined(address, (address) => transaction?.paymentInfo(address)),
    [address, transaction]
  )
  const partialFee = useDefaultAfterTimeout<BN>(paymentInfo?.partialFee, 3000, BN_ZERO)
  const balance = useBalance(address)

  useEffect(() => {
    if (!balance || !partialFee) {
      if (status === null) {
        setStatus('loadingFees')
      }
    } else if (status === 'loadingFees') {
      setStatus(null)
    }
  }, [status, !balance, !partialFee])

  return useMemo(
    () =>
      balance && partialFee
        ? {
            transactionFee: partialFee,
            canAfford: balance.transferable.gte(partialFee),
          }
        : undefined,
    [JSON.stringify(balance), partialFee?.toString()]
  )
}
