import React from 'react'

import { BountyRoutes } from '@/bounty/constants'
import { ButtonPrimary } from '@/common/components/buttons'
import { LinkButtonPrimary } from '@/common/components/buttons/LinkButtons'
import { useModal } from '@/common/hooks/useModal'
import { WorkingGroupsRoutes } from '@/working-groups/constants'

import { TransferModalCall } from '../TransferModal'

interface MoveFundsModalItemProps {
  insufficientBalances: boolean
  noFreeAccounts: boolean
}

export const MoveFundsModalButtons = ({ insufficientBalances, noFreeAccounts }: MoveFundsModalItemProps) => {
  const { showModal } = useModal()

  if (insufficientBalances) {
    return (
      <>
        <LinkButtonPrimary size="medium" to={BountyRoutes.currentBounties}>
          Bounties
        </LinkButtonPrimary>
        <LinkButtonPrimary size="medium" to={WorkingGroupsRoutes.groups}>
          Working groups
        </LinkButtonPrimary>
      </>
    )
  }

  if (noFreeAccounts) {
    return (
      <>
        <ButtonPrimary size="medium" onClick={() => null}>
          Create new Account
        </ButtonPrimary>
      </>
    )
  }

  return (
    <ButtonPrimary size="medium" onClick={() => showModal<TransferModalCall>({ modal: 'TransferTokens', data: {} })}>
      Move funds
    </ButtonPrimary>
  )
}
