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

type ModalState = 'PREPARE' | 'AUTHORIZE' | 'SENDING' | 'EXTENSION_SIGN' | 'SUCCESS' | 'ERROR'

export const AddMembershipModal = ({ onClose }: MembershipModalProps) => {
  const { api } = useApi()
  const membershipPrice = useObservable(api?.query.members.membershipPrice(), [])
  const [state, setStep] = useState<ModalState>('PREPARE')
  const [transactionParams, setParams] = useState<Member>()
  const [, setSubscription] = useState<Subscription | undefined>(undefined)

  const onSubmit = (params: Member) => {
    setStep('AUTHORIZE')
    setParams(params)
  }

  const onSign = (transaction: Observable<ISubmittableResult>) => {
    const statusCallback = (result: ISubmittableResult) => {
      const { status, events } = result

      console.log(`Current transaction status: ${status.type}`)

      if (status.isReady) {
        setStep('SENDING')
      }

      if (status.isInBlock) {
        console.log('Included at block hash', status.asInBlock.toHex())
        console.log('Events:')

        events.forEach(({ event: { data, method, section }, phase }) => {
          console.log('\t', phase.toString(), `: ${section}.${method}`, data.toString())
        })
      }

      if (!status.isFinalized) {
        return
      }

      const isSuccess = events.find(({ event }) => {
        const { method } = event
        return method === 'ExtrinsicSuccess'
      })

      const isError = events.find(({ event }) => {
        const { method } = event
        return method === 'ExtrinsicFailed'
      })

      console.log(
        `Finalized. Block hash: ${status.asFinalized.toString()}\n\t- success: ${isSuccess}\n\t- error: ${isError}`
      )
      setStep('SUCCESS')
    }

    setSubscription(transaction.subscribe(statusCallback))
  }

  if (state === 'PREPARE' || !transactionParams) {
    return <MembershipFormModal onClose={onClose} onSubmit={onSubmit} membershipPrice={membershipPrice} />
  }

  if (state === 'AUTHORIZE') {
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
    return <WaitModal title="Waiting for the extension" description={loremDescription} />
  }

  if (state === 'SENDING') {
    return <WaitModal title="Wait for the transaction" description={loremDescription} />
  }

  if (state === 'SUCCESS') {
    return <AddMembershipSuccessModal onClose={onClose} member={transactionParams} />
  }

  return <AddMembershipFailureModal onClose={onClose} params={transactionParams} />
}
