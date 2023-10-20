import React from 'react'

import { InfoIcon } from '@/common/components/icons/InfoIcon'
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
          All your accounts for current membership have locks preventing from using them for this action.
          <br />
          <br />
          In order to apply to proceed:
        </TextMedium>
        <InfoList>
          <li>Create new account using your wallet extension</li>
          <li>Move the required amount of tokens to your new account</li>
          <li>Start again and choose the newly created account</li>
        </InfoList>
        <TextMedium light>
          <InfoIcon /> It is strongly recommended to link all accounts to single membership in order to correctly
          attribute accumulated reputation on the network.
        </TextMedium>
      </>
    )
  }

  return <TextMedium light>Move funds to one of your account to make it suitable for this action.</TextMedium>
}
