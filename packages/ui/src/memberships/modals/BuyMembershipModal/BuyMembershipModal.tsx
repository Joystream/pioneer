import { MembershipMetadata } from '@joystream/metadata-protobuf'
import { createType } from '@joystream/types'
import { MemberId } from '@joystream/types/common'
import { EventRecord } from '@polkadot/types/interfaces'
import React, { useContext, useMemo, useState } from 'react'

import { getEventParam } from '@/common/model/JoystreamNode'

import { FailureModal } from '../../../common/components/FailureModal'
import { useApi } from '../../../common/hooks/useApi'
import { useModal } from '../../../common/hooks/useModal'
import { useObservable } from '../../../common/hooks/useObservable'
import { ServerContext } from '../../../common/providers/server/context'
import { ModalState } from '../../../common/types'

import { BuyMembershipFormModal, FormFields } from './BuyMembershipFormModal'
import { BuyMembershipSignModal } from './BuyMembershipSignModal'
import { BuyMembershipSuccessModal } from './BuyMembershipSuccessModal'

export type AnyMessage<T> = T & {
  toJSON(): Record<string, unknown>
}

export type AnyMetadataClass<T> = {
  decode(binary: Uint8Array): AnyMessage<T>
  encode(obj: T): { finish(): Uint8Array }
  toObject(obj: AnyMessage<T>): Record<string, unknown>
}

const metadataToBytes = <T extends any>(metaClass: AnyMetadataClass<T>, message: T) => {
  return createType('Bytes', '0x' + Buffer.from(metaClass.encode(message).finish()).toString('hex'))
}

export const BuyMembershipModal = () => {
  const { hideModal } = useModal()
  const onClose = hideModal
  const { api } = useApi()
  const membershipPrice = useObservable(api?.query.members.membershipPrice(), [])
  const [step, setStep] = useState<ModalState>('PREPARE')
  const [formData, setParams] = useState<FormFields>()
  const server = useContext(ServerContext)
  const [id, setId] = useState<MemberId>()

  const onSubmit = (params: FormFields) => {
    setStep('AUTHORIZE')
    setParams(params)
  }

  const transaction = useMemo(() => {
    if (!formData || !api) {
      return
    }

    return api.tx.members.buyMembership({
      root_account: formData.rootAccount?.address,
      controller_account: formData.controllerAccount?.address,
      handle: formData.handle,
      metadata: metadataToBytes(MembershipMetadata, {
        name: formData.name,
        about: formData.about,
      }),
      referrer_id: formData.referrer?.id,
    })
  }, [JSON.stringify(formData)])

  const onDone = useMemo(() => {
    if (!formData) {
      return () => null
    }

    return (result: boolean, events: EventRecord[]) => {
      const memberId = getEventParam<MemberId>(events, 'MemberRegistered')
      setId(memberId)

      if (server && memberId) {
        server.schema.create('Membership', {
          id: memberId.toString(),
          rootAccount: formData.rootAccount?.address,
          controllerAccount: formData.controllerAccount?.address,
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
  }, [JSON.stringify(formData)])

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

  if (step === 'SUCCESS' && id) {
    return <BuyMembershipSuccessModal onClose={onClose} member={formData} memberId={id.toString()} />
  }

  return (
    <FailureModal onClose={onClose}>There was a problem with creating a membership for {formData.name}.</FailureModal>
  )
}
