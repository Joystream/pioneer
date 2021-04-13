import { EventRecord } from '@polkadot/types/interfaces'
import React, { useContext, useMemo, useState } from 'react'

import { FailureModal } from '../../../common/components/FailureModal'
import { useApi } from '../../../common/hooks/useApi'
import { useModal } from '../../../common/hooks/useModal'
import { useObservable } from '../../../common/hooks/useObservable'
import { ServerContext } from '../../../common/providers/server/context'
import { ModalState } from '../../../common/types'

import { BuyMembershipFormModal, FormFields } from './BuyMembershipFormModal'
import { BuyMembershipSignModal } from './BuyMembershipSignModal'
import { BuyMembershipSuccessModal } from './BuyMembershipSuccessModal'

export const BuyMembershipModal = () => {
  const { hideModal } = useModal()
  const onClose = hideModal
  const { api } = useApi()
  const membershipPrice = useObservable(api?.query.members.membershipPrice(), [])
  const [step, setStep] = useState<ModalState>('PREPARE')
  const [formData, setParams] = useState<FormFields>()
  const server = useContext(ServerContext)
  const [id, setId] = useState<string>()

  const onSubmit = (params: FormFields) => {
    setStep('AUTHORIZE')
    setParams(params)
  }

  const transaction = useMemo(
    () =>
      formData
        ? api?.tx?.members?.buyMembership({
            root_account: formData.rootAccount,
            controller_account: formData.controllerAccount,
            handle: formData.handle,
            metadata: {
              name: formData.name,
              avatar_uri: formData.avatarUri,
              about: formData.about,
            },
            referrer_id: formData.referrer?.id,
          })
        : undefined,
    [JSON.stringify(formData)]
  )

  const onDone = useMemo(
    () =>
      formData
        ? (result: boolean, events: EventRecord[]) => {
            const memberId = events.find((event) => event.event.method === 'MemberRegistered')?.event.data[0].toString()
            setId(memberId)
            if (server && memberId) {
              server.schema.create('Membership', {
                id: id,
                rootAccount: formData.rootAccount,
                controllerAccount: formData.controllerAccount,
                name: formData.name,
                handle: formData.handle,
                avatarUri: formData.avatarUri,
                about: formData.about,
                isVerified: false,
                isFoundingMember: false,
                inviteCount: '5',
                registeredAtBlockId: 'block-3',
              })
            }
            setStep(result ? 'SUCCESS' : 'ERROR')
          }
        : () => null,
    [formData]
  )

  if (step === 'PREPARE' || !formData) {
    return <BuyMembershipFormModal onClose={onClose} onSubmit={onSubmit} membershipPrice={membershipPrice} />
  }

  if (step === 'AUTHORIZE') {
    return (
      <BuyMembershipSignModal
        onClose={onClose}
        membershipPrice={membershipPrice}
        formData={formData}
        onDone={onDone}
        transaction={transaction}
        initialSigner={formData.controllerAccount}
      />
    )
  }

  if (step === 'SUCCESS') {
    return <BuyMembershipSuccessModal onClose={onClose} member={formData} memberId={id} />
  }

  return (
    <FailureModal onClose={onClose}>There was a problem with creating a membership for {formData.name}.</FailureModal>
  )
}
