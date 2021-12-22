import React from 'react'

import { TransactionButton } from '@/common/components/buttons/TransactionButton'
import { useModal } from '@/common/hooks/useModal'
import { WithdrawCandidacyModalCall } from '@/council/modals/WithdrawCandidacyModal/types'
import { Member } from '@/memberships/types'

interface Props {
  member: Member
}

export const WithdrawButton = ({ member }: Props) => {
  const { showModal } = useModal()
  const onClick = (event: React.MouseEvent<Element>) => {
    event.stopPropagation()
    showModal<WithdrawCandidacyModalCall>({
      modal: 'WithdrawCandidacy',
      data: { member },
    })
  }

  return (
    <>
      <TransactionButton style="secondary" size="medium" onClick={onClick}>
        Withdraw Candidacy
      </TransactionButton>
    </>
  )
}
