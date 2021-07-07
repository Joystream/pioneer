import { useMachine } from '@xstate/react'
import React, { useEffect } from 'react'

import { recoverBalanceMachine } from '@/accounts/modals/RecoverBalance/machine'
import { FailureModal } from '@/common/components/FailureModal'
import { TextMedium } from '@/common/components/typography'
import { useModal } from '@/common/hooks/useModal'
import { useMyMemberships } from '@/memberships/hooks/useMyMemberships'
import { SwitchMemberModalCall } from '@/memberships/modals/SwitchMemberModal'

import { RecoverBalanceSignModal } from './RecoverBalanceSignModal'
import { RecoverBalanceSuccessModal } from './RecoverBalanceSuccessModal'

interface Props {
  onClose: () => void
}

export const RecoverBalanceModal = ({ onClose }: Props) => {
  const [state, send] = useMachine(recoverBalanceMachine)
  const { active } = useMyMemberships()
  const { showModal } = useModal()

  useEffect(() => {
    if (!state.matches('requirementsVerification')) {
      return
    }

    if (active) {
      send('PASS')
      return
    }

    if (!active) {
      send('FAIL')
      onClose()
      showModal<SwitchMemberModalCall>({ modal: 'SwitchMember' })
    }
  }, [state.value, active?.id])

  if (state.matches('transaction')) {
    const transactionService = state.children.transaction

    return <RecoverBalanceSignModal onClose={onClose} service={transactionService} />
  }

  if (state.matches('success')) {
    return <RecoverBalanceSuccessModal onClose={onClose} />
  }

  if (state.matches('error')) {
    return (
      <FailureModal onClose={onClose}>
        <TextMedium>There was a problem with recovering balances.</TextMedium>
      </FailureModal>
    )
  }

  return null
}
