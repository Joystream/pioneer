import BN from 'bn.js'
import React, { Children } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

import { AccountInfo } from '@/accounts/components/AccountInfo'
import { Account } from '@/accounts/types'
import { CherrySymbol, BountyEntrySymbol } from '@/common/components/icons/symbols'
import { BalanceInfoInRow, InfoTitle, InfoValue, LockedAccount } from '@/common/components/Modal'
import { TextSmall, TokenValue } from '@/common/components/typography'
import { Colors, Sizes } from '@/common/constants'

export interface WithdrawInfoProps {
  account: Account
  amountTitle: string
  rows: WithdrawInfoRow[]
}
export interface WithdrawInfoRow {
  stakingFromTitle: string
  amount: BN
  type?: 'cherry' | 'entry'
}

export const WithdrawInfo = React.memo(({ account, amountTitle, rows }: WithdrawInfoProps) => {
  const { t } = useTranslation()

  return (
    <Wrapper id="withdraw-info">
      <LockedAccount>
        <AccountInfo account={account} />
        <BalanceInfoInRow>
          <DataWrapper>
            <TextSmall lighter>{t('withdrawing')}</TextSmall>
          </DataWrapper>
          <DataWrapper last>
            <TextSmall lighter>{amountTitle}</TextSmall>
          </DataWrapper>
          {Children.toArray(
            rows.map(({ stakingFromTitle, amount, type = 'entry' }) => (
              <>
                <TitleWithIcon>
                  {type === 'cherry' ? <CherrySymbol /> : <BountyEntrySymbol />}
                  <InfoTitle>{stakingFromTitle}</InfoTitle>
                </TitleWithIcon>
                <InfoValue>
                  <TokenValue value={amount} />
                </InfoValue>
              </>
            ))
          )}
        </BalanceInfoInRow>
      </LockedAccount>
    </Wrapper>
  )
})

const Wrapper = styled.div`
  position: relative;
  display: flex;
  > div {
    background: ${Colors.White};
  }

  ${BalanceInfoInRow} {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
`

const DataWrapper = styled.div<{ last?: boolean }>`
  ${TextSmall} {
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
