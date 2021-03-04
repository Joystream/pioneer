import { ISubmittableResult } from '@polkadot/types/types'
import React, { useState } from 'react'
import { Observable, Subscription } from 'rxjs'
import { Member } from '../../common/types'
import { useApi } from '../../hooks/useApi'
import { useObservable } from '../../hooks/useObservable'
import { WaitModal } from '../WaitModal'
import { AddMembershipFailureModal } from './AddMembershipFailureModal'
import { AddMembershipSuccessModal } from './AddMembershipSuccessModal'
import { MembershipFormModal } from './MembershipFormModal'
import { SignCreateMemberModal } from './SignCreateMemberModal'

interface MembershipModalProps {
  onClose: () => void
}

type ModalState = 'Create' | 'Authorize' | 'SENDING' | 'SUCCESS' | 'EXTENSION_SIGN'

export const AddMembershipModal = ({ onClose }: MembershipModalProps) => {
  const { api } = useApi()
  const membershipPrice = useObservable(api?.query.members.membershipPrice(), [])
  const [state, setState] = useState<ModalState>('Create')
  const [transactionParams, setParams] = useState<Member>()
  const [, setSubscription] = useState<Subscription | undefined>(undefined)

  const onSubmit = (params: Member) => {
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
      <SignCreateMemberModal
        onClose={onClose}
        membershipPrice={membershipPrice}
        transactionParams={transactionParams}
        onSign={onSign}
      />
    )
  }

  const loremDescription = 'Lorem'

  if (state === 'EXTENSION_SIGN') {
    return <WaitModal title="Waiting for the extension" description={loremDescription} onClose={onClose} />
  }

  if (state === 'SENDING') {
    return <WaitModal title="Wait for the transaction" description={loremDescription} onClose={onClose} />
  }

  if (state === 'SUCCESS') {
    return <AddMembershipSuccessModal onClose={onClose} member={transactionParams} />
  }

  return <AddMembershipFailureModal onClose={onClose} params={transactionParams} />
}
