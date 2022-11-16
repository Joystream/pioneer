import { SubmittableExtrinsic } from '@polkadot/api/types'
import { ISubmittableResult } from '@polkadot/types/types'
import BN from 'bn.js'
import { createContext } from 'react'

import { Address } from '@/common/types'

export type Transaction = SubmittableExtrinsic<'rxjs', ISubmittableResult>

export interface UseTransaction {
  transaction?: Transaction
  feeInfo?: { transactionFee: BN; canAfford: boolean }
  setTransaction: (tx: Transaction | undefined) => void
  setSigner: (signer: Address) => void
}

export const TransactionFeesContext = createContext<UseTransaction>({
  setTransaction: () => undefined,
  setSigner: () => undefined,
})
