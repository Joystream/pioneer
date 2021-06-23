import { MemberId } from '@joystream/types/common'
import { EventRecord } from '@polkadot/types/interfaces'
import { useMachine } from '@xstate/react'
import React from 'react'

import { FailureModal } from '@/common/components/FailureModal'
import { useApi } from '@/common/hooks/useApi'
import { useModal } from '@/common/hooks/useModal'
import { useObservable } from '@/common/hooks/useObservable'
import { getEventParam } from '@/common/model/JoystreamNode'
import { toMemberTransactionParams } from '@/memberships/modals/utils'

import { BuyMembershipFormModal, MemberFormFields } from './BuyMembershipFormModal'
import { BuyMembershipSignModal } from './BuyMembershipSignModal'
import { BuyMembershipSuccessModal } from './BuyMembershipSuccessModal'
import { buyMembershipMachine } from './machine'

export const BuyMembershipModal = () => {
  const { hideModal } = useModal()
  const { api } = useApi()
  const membershipPrice = useObservable(api?.query.members.membershipPrice(), [])
  const [state, send] = useMachine(buyMembershipMachine)

  if (state.matches('prepare')) {
    const onSubmit = (params: MemberFormFields) => send({ type: 'DONE', form: params })

    return <BuyMembershipFormModal onClose={hideModal} onSubmit={onSubmit} membershipPrice={membershipPrice} />
  }

  if (state.matches('transaction')) {
    const transaction = api?.tx.members.buyMembership(toMemberTransactionParams(state.context.form))
    const { form } = state.context

    const onDone = (result: boolean, events: EventRecord[]) => {
      if (result) {
        const memberId = getEventParam<MemberId>(events, 'MemberRegistered')
        send('SUCCESS', { memberId: memberId })
      } else {
        send('ERROR')
      }
    }

    return (
      <BuyMembershipSignModal
        onClose={hideModal}
        membershipPrice={membershipPrice}
        formData={form}
        onDone={onDone}
        transaction={transaction}
        initialSigner={form.controllerAccount}
      />
    )
  }

  if (state.matches('success')) {
    const { form, memberId } = state.context
    return <BuyMembershipSuccessModal onClose={hideModal} member={form} memberId={memberId.toString()} />
  }

  if (state.matches('error')) {
    return (
      <FailureModal onClose={hideModal}>
        There was a problem with creating a membership for {state.context.form.name}.
      </FailureModal>
    )
  }

  return null
}
