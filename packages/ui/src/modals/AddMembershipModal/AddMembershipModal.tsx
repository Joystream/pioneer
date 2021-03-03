import { EventRecord } from '@polkadot/types/interfaces/system'
import { ISubmittableResult } from '@polkadot/types/types'
import React, { useEffect, useState } from 'react'
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

type ModalState = 'PREPARE' | 'AUTHORIZE' | 'EXTENSION_SIGN' | 'SENDING' | 'SUCCESS' | 'ERROR'
const isError = (events: EventRecord[]) => events.find(({ event: { method } }) => method === 'ExtrinsicFailed')

export const AddMembershipModal = ({ onClose }: MembershipModalProps) => {
  const { api } = useApi()
  const membershipPrice = useObservable(api?.query.members.membershipPrice(), [])
  const [step, setStep] = useState<ModalState>('PREPARE')
  const [transactionParams, setParams] = useState<Member>()
  const [subscription, setSubscription] = useState<Subscription | undefined>(undefined)

  useEffect(() => {
    if (subscription) {
      return () => subscription.unsubscribe()
    }
  }, [subscription])

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
        console.log('Included at block hash', JSON.stringify(status.asInBlock))
        console.log('Events:')

        events.forEach(({ event: { data, method, section }, phase }) => {
          console.log('\t', JSON.stringify(phase), `: ${section}.${method}`, JSON.stringify(data))
        })
        console.log(JSON.stringify(events))
      }

      if (!status.isFinalized) {
        return
      }

      setStep(isError(events) ? 'ERROR' : 'SUCCESS')
    }

    setSubscription(transaction.subscribe(statusCallback))
  }

  if (step === 'PREPARE' || !transactionParams) {
    return <MembershipFormModal onClose={onClose} onSubmit={onSubmit} membershipPrice={membershipPrice} />
  }

  if (step === 'AUTHORIZE') {
    return (
      <SignCreateMemberModal
        onClose={onClose}
        membershipPrice={membershipPrice}
        transactionParams={transactionParams}
        onSign={onSign}
      />
    )
  }

  if (step === 'EXTENSION_SIGN') {
    return (
      <WaitModal
        title="Waiting for the extension"
        description={'Please, sign the transaction using external signer app.'}
      />
    )
  }

  if (step === 'SENDING') {
    return (
      <WaitModal
        title="Pending transaction"
        description={
          'We are waiting for your transaction to be mined. It can takes Lorem ipsum deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim.'
        }
      />
    )
  }

  if (step === 'SUCCESS') {
    return <AddMembershipSuccessModal onClose={onClose} member={transactionParams} />
  }

  return <AddMembershipFailureModal onClose={onClose} member={transactionParams} />
}
