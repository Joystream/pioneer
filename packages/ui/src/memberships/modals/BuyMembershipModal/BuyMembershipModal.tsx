import { MemberId } from '@joystream/types/common'
import { EventRecord } from '@polkadot/types/interfaces'
import React, { useMemo, useState } from 'react'

import { FailureModal } from '@/common/components/FailureModal'
import { useApi } from '@/common/hooks/useApi'
import { useModal } from '@/common/hooks/useModal'
import { useObservable } from '@/common/hooks/useObservable'
import { getEventParam } from '@/common/model/JoystreamNode'
import { ModalState } from '@/common/types'
import { toMemberTransactionParams } from '@/memberships/modals/utils'

import { BuyMembershipFormModal, MemberFormFields } from './BuyMembershipFormModal'
import { BuyMembershipSignModal } from './BuyMembershipSignModal'
import { BuyMembershipSuccessModal } from './BuyMembershipSuccessModal'

export const BuyMembershipModal = () => {
  const { hideModal } = useModal()
  const { api } = useApi()
  const membershipPrice = useObservable(api?.query.members.membershipPrice(), [])
  const [step, setStep] = useState<ModalState>('PREPARE')
  const [formData, setParams] = useState<MemberFormFields>()
  const [id, setId] = useState<MemberId>()

  const onSubmit = (params: MemberFormFields) => {
    setStep('AUTHORIZE')
    setParams(params)
  }

  const transaction = useMemo(() => {
    if (!formData || !api) {
      return
    }

    return api.tx.members.buyMembership(toMemberTransactionParams(formData))
  }, [JSON.stringify(formData)])

  const onDone = useMemo(() => {
    if (!formData) {
      return () => null
    }

    return (result: boolean, events: EventRecord[]) => {
      const memberId = getEventParam<MemberId>(events, 'MemberRegistered')
      setId(memberId)
      setStep(result ? 'SUCCESS' : 'ERROR')
    }
  }, [JSON.stringify(formData)])

  if (step === 'PREPARE' || !formData) {
    return <BuyMembershipFormModal onClose={hideModal} onSubmit={onSubmit} membershipPrice={membershipPrice} />
  }

  if (step === 'AUTHORIZE') {
    return (
      <BuyMembershipSignModal
        onClose={hideModal}
        membershipPrice={membershipPrice}
        formData={formData}
        onDone={onDone}
        transaction={transaction}
        initialSigner={formData.controllerAccount}
      />
    )
  }

  if (step === 'SUCCESS' && id) {
    return <BuyMembershipSuccessModal onClose={hideModal} member={formData} memberId={id.toString()} />
  }

  return (
    <FailureModal onClose={hideModal}>There was a problem with creating a membership for {formData.name}.</FailureModal>
  )
}
