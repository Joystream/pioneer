import { SubmittableExtrinsic } from '@polkadot/api/types'
import { ISubmittableResult } from '@polkadot/types/types'
import React from 'react'

interface Props {
  transaction: SubmittableExtrinsic<'rxjs', ISubmittableResult>
}

export const CreateThreadTransactionModal = ({ transaction }: Props) => {
  return <div />
}
