import React from 'react'

import { TextMedium } from '@/common/components/typography'

import { InfoList } from './styles'

interface MoveFundsModalItemProps {
  insufficientBalances: boolean
  noFreeAccounts: boolean
}

export const MoveFundsModalInfo = ({ insufficientBalances, noFreeAccounts }: MoveFundsModalItemProps) => {
  if (insufficientBalances) {
    return <TextMedium light>Earn tokens by completing bounties or contributing to working groups</TextMedium>
  }

  if (noFreeAccounts) {
    return (
      <>
        <TextMedium light>
          All your accounts have locks. It is strongly recommended to link all accounts to single membership in order to
          correctly attribute accumulated reputation on the network.
          <br />
          <br />
          In order to apply to this role:
        </TextMedium>
        <InfoList>
          <li>Create new account using Polkadot extension</li>
          <li>Move funds to your new account making it suitable</li>
        </InfoList>
      </>
    )
  }

  return <TextMedium light>Move funds to one of your account to make it suitable for this action.</TextMedium>
}
