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

interface LinkButtonProps {
  to: string
  label: string
  onClick: () => void
  hide?: boolean
}

const LinkButton = ({ to, label, onClick, hide = false }: LinkButtonProps) => {
  if (hide) return <></>

  return (
    <div onClick={onClick}>
      <LinkButtonPrimary size="medium" to={to}>
        {label}
      </LinkButtonPrimary>
    </div>
  )
}

export const MoveFundsModalButtons = ({ insufficientBalances, noFreeAccounts }: MoveFundsModalItemProps) => {
  const { showModal, hideModal } = useModal()

  if (insufficientBalances) {
    return (
      <>
        <LinkButton to={BountyRoutes.currentBounties} label="Bounties" onClick={hideModal} hide />
        <LinkButton to={WorkingGroupsRoutes.groups} label="Working groups" onClick={hideModal} />
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
