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
  const { showModal, hideModal } = useModal()

  const BountiesButton = (
    <div onClick={() => hideModal()}>
      <LinkButtonPrimary size="medium" to={BountyRoutes.currentBounties}>
        Bounties
      </LinkButtonPrimary>
    </div>
  )

  if (insufficientBalances) {
    return (
      <>
        {false && <BountiesButton />}
        <div onClick={() => hideModal()}>
          <LinkButtonPrimary size="medium" to={WorkingGroupsRoutes.groups}>
            Working groups
          </LinkButtonPrimary>
        </div>
      </>
    )
  }

  if (noFreeAccounts) {
    return null
  }

  return (
    <ButtonPrimary size="medium" onClick={() => showModal<TransferModalCall>({ modal: 'TransferTokens', data: {} })}>
      Move funds
    </ButtonPrimary>
  )
}
