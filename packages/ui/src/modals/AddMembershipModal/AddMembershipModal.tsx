import { EventRecord } from '@polkadot/types/interfaces'
import React, { useContext, useMemo, useState } from 'react'

import { Member, ModalState } from '../../common/types'
import { useApi } from '../../hooks/useApi'
import { useModal } from '../../hooks/useModal'
import { useObservable } from '../../hooks/useObservable'
import { ServerContext } from '../../providers/server/context'
import { AddMembershipFailureModal } from './AddMembershipFailureModal'
import { AddMembershipSuccessModal } from './AddMembershipSuccessModal'
import { MembershipFormModal } from './MembershipFormModal'
import { SignCreateMemberModal } from './SignCreateMemberModal'

export const AddMembershipModal = () => {
  const { hideModal } = useModal()
  const onClose = hideModal
  const { api } = useApi()
  const membershipPrice = useObservable(api?.query.members.membershipPrice(), [])
  const [step, setStep] = useState<ModalState>('PREPARE')
  const [transactionParams, setParams] = useState<Member>()
  const server = useContext(ServerContext)
  const [id, setId] = useState<string>()

  const onSubmit = (params: Member) => {
    setStep('AUTHORIZE')
    setParams(params)
  }

  const transaction = useMemo(
    () =>
      transactionParams
        ? api?.tx?.members?.buyMembership({
            root_account: transactionParams.rootAccount.address,
            controller_account: transactionParams.controllerAccount.address,
            handle: transactionParams.handle,
            metadata: {
              name: transactionParams.name,
              avatar_uri: transactionParams.avatarUri,
              about: transactionParams.about,
            },
            referrer_id: transactionParams.referrer?.id,
          })
        : undefined,
    [JSON.stringify(transactionParams)]
  )

  const onDone = useMemo(
    () =>
      transactionParams
        ? (result: boolean, events: EventRecord[]) => {
            const memberId = events.find((event) => event.event.method === 'MemberRegistered')?.event.data[0].toString()
            setId(memberId)
            if (server && memberId) {
              server.schema.create('Membership', {
                id: id,
                rootAccount: transactionParams.rootAccount.address,
                controllerAccount: transactionParams.controllerAccount.address,
                name: transactionParams.name,
                handle: transactionParams.handle,
                avatarUri: transactionParams.avatarUri,
                about: transactionParams.about,
                isVerified: false,
                isFoundingMember: false,
                inviteCount: '5',
                registeredAtBlockId: 'block-3',
              })
            }
            setStep(result ? 'SUCCESS' : 'ERROR')
          }
        : () => null,
    [transactionParams]
  )

  if (step === 'PREPARE' || !transactionParams) {
    return <MembershipFormModal onClose={onClose} onSubmit={onSubmit} membershipPrice={membershipPrice} />
  }

  if (step === 'AUTHORIZE') {
    return (
      <SignCreateMemberModal
        onClose={onClose}
        membershipPrice={membershipPrice}
        transactionParams={transactionParams}
        onDone={onDone}
        transaction={transaction}
        initialSigner={transactionParams.controllerAccount}
      />
    )
  }

  if (step === 'SUCCESS') {
    return <AddMembershipSuccessModal onClose={onClose} member={transactionParams} memberId={id} />
  }

  return <AddMembershipFailureModal onClose={onClose} member={transactionParams} />
}
