import React from 'react'

import { ButtonSecondary } from '@/common/components/buttons'
import { useModal } from '@/common/hooks/useModal'
import { WithdrawCandidacyModalCall } from '@/council/modals/WithdrawCandidacyModal/types'
import { Member } from '@/memberships/types'

interface Props {
  member: Member
}

export const WithdrawButton = ({ member }: Props) => {
  const { showModal } = useModal()
  const onClick = () => {
    showModal<WithdrawCandidacyModalCall>({
      modal: 'WithdrawCandidacy',
      data: { member },
    })
  }

  return (
    <>
      <ButtonSecondary size="medium" onClick={onClick}>
        Withdraw Candidacy
      </ButtonSecondary>
    </>
  )
}
