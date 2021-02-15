import { ISubmittableResult } from '@polkadot/types/types'
import React, { useState } from 'react'
import { Observable, Subscription } from 'rxjs'
import { useApi } from '../../hooks/useApi'
import { useObservable } from '../../hooks/useObservable'
import { MembershipFormModal, Params } from './MembershipFormModal'
import { SignTransactionModal } from './SignTransactionModal'

interface MembershipModalProps {
  onClose: () => void
}

type ModalState = 'Create' | 'Authorize' | 'SENDING' | 'SUCCESS'

export const AddMembershipModal = ({ onClose }: MembershipModalProps) => {
  const { api } = useApi()
  const membershipPrice = useObservable(api?.query.members.membershipPrice(), [])
  const [state, setState] = useState<ModalState>('Create')
  const [transactionParams, setParams] = useState<Params>()
  const [, setSubscription] = useState<Subscription | undefined>(undefined)

  const onSubmit = (params: Params) => {
    setState('Authorize')
    setParams(params)
  }

  const onSign = (transaction: Observable<ISubmittableResult>) => {
    const statusCallback = (result: ISubmittableResult) => {
      const { status } = result

      console.log(`Current transaction status: ${status.type}`)

      if (status.isReady) {
        setState('SENDING')
      }

      if (!status.isInBlock) {
        return
      }

      console.log(`In Block. Block hash: ${status.asInBlock.toString()}`)

      setState('SUCCESS')
    }

    setSubscription(transaction.subscribe(statusCallback))
  }

  if (state === 'Create' || !transactionParams) {
    return <MembershipFormModal onClose={onClose} onSubmit={onSubmit} membershipPrice={membershipPrice} />
  }

  if (state === 'Authorize') {
    return (
      <SignTransactionModal
        onClose={onClose}
        membershipPrice={membershipPrice}
        transactionParams={transactionParams}
        onSign={onSign}
      />
    )
  }

  return null
}
