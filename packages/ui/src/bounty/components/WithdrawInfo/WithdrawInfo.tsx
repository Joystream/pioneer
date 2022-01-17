import BN from 'bn.js'
import React from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

import { AccountInfo } from '@/accounts/components/AccountInfo'
import { Account } from '@/accounts/types'
import { VotingSymbol } from '@/common/components/icons/symbols'
import { BalanceInfoInRow, InfoTitle, InfoValue, LockedAccount } from '@/common/components/Modal'
import { TextSmall, TokenValue } from '@/common/components/typography'
import { Colors, Sizes } from '@/common/constants'

export interface WithdrawInfoProps {
  account: Account
  stakingFromTitle: string
  amountTitle: string
  amount: BN
}

export const WithdrawInfo = React.memo(({ account, stakingFromTitle, amountTitle, amount }: WithdrawInfoProps) => {
  const { t } = useTranslation()

  return (
    <Wrapper data-testid="withdraw-info">
      <LockedAccount>
        <AccountInfo account={account} />
        <BalanceInfoInRow>
          <DataWrapper>
            <TextSmall lighter>{t('withdrawing')}</TextSmall>
            <TitleWithIcon>
              <VotingSymbol />
              <InfoTitle>{stakingFromTitle}</InfoTitle>
            </TitleWithIcon>
          </DataWrapper>
          <InfoValue>
            <DataWrapper last>
              <TextSmall lighter>{amountTitle}</TextSmall>
              <TokenValue value={amount} />
            </DataWrapper>
          </InfoValue>
        </BalanceInfoInRow>
      </LockedAccount>
    </Wrapper>
  )
})

const Wrapper = styled.div`
  position: relative;
  display: flex;
  margin-top: 20px;
  > div {
    background: ${Colors.White};
  }
`

const DataWrapper = styled.span<{ last?: boolean }>`
  > p {
    position: absolute;
    bottom: calc((${Sizes.selectHeight} / 2) + 50% + 4px);
    right: ${({ last }) => last && '0'};
  }
`

const TitleWithIcon = styled.div`
  display: flex;
  align-items: center;
  > svg {
    margin-right: 8px;
  }
`
