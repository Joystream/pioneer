import { EventRecord } from '@polkadot/types/interfaces'
import React, { useContext, useMemo, useState } from 'react'
import { Member, ModalState } from '../../common/types'
import { useApi } from '../../hooks/useApi'
import { useObservable } from '../../hooks/useObservable'
import { ServerContext } from '../../providers/server/context'
import { AddMembershipFailureModal } from './AddMembershipFailureModal'
import { AddMembershipSuccessModal } from './AddMembershipSuccessModal'
import { MembershipFormModal } from './MembershipFormModal'
import { SignCreateMemberModal } from './SignCreateMemberModal'

interface MembershipModalProps {
  onClose: () => void
}

export const AddMembershipModal = ({ onClose }: MembershipModalProps) => {
  const { api } = useApi()
  const membershipPrice = useObservable(api?.query.members.membershipPrice(), [])
  const [step, setStep] = useState<ModalState>('PREPARE')
  const [transactionParams, setParams] = useState<Member>()
  const server = useContext(ServerContext)

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
            metadata: {
              name: transactionParams.name,
              handle: transactionParams.handle,
              avatar_uri: transactionParams.avatarURI,
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
            if (server && memberId) {
              server.schema.create('Member', {
                id: memberId,
                rootAccount: transactionParams.rootAccount.address,
                controllerAccount: transactionParams.controllerAccount.address,
                name: transactionParams.name,
                handle: transactionParams.handle,
                avatarURI: transactionParams.avatarURI,
                about: transactionParams.about,
                isVerified: false,
                isFoundingMember: false,
                inviteCount: '5',
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
    return <AddMembershipSuccessModal onClose={onClose} member={transactionParams} />
  }

  return <AddMembershipFailureModal onClose={onClose} member={transactionParams} />
}
