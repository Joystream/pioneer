import React from 'react'
import styled, { css } from 'styled-components'

import { AccountInfo } from '@/accounts/components/AccountInfo'
import { AccountLocks } from '@/accounts/components/AccountLocks'
import { useBalance } from '@/accounts/hooks/useBalance'
import { AccountOption } from '@/accounts/types'
import { BalanceInfoNarrow, InfoTitle, InfoValue } from '@/common/components/Modal'
import { TokenValue } from '@/common/components/typography'
import { BreakPoints, Colors } from '@/common/constants'

interface Props {
  option: AccountOption
  isForStaking?: boolean
  variant?: 's' | 'm' | 'l'
  isSelected?: boolean
}

export const OptionAccount = ({ option, isForStaking, variant, isSelected }: Props) => {
  const balances = useBalance(option.address)
  const balance = isForStaking ? balances?.total : balances?.transferable
  const balanceType = isForStaking ? 'Total' : 'Transferable'
  const locks = option.optionLocks
  const isLocked = !!locks?.length

  return (
    <>
      <AccountInfo account={option} locked={isLocked} variant={variant} />
      <BalanceContainer isSelected={isSelected}>
        <InfoTitle>{balanceType} balance</InfoTitle>
        <InfoValue>
          <Value value={balance} locked={isLocked} />
          <AccountLocks locks={balances?.locks} />
        </InfoValue>
      </BalanceContainer>
    </>
  )
}

const BalanceContainer = styled(BalanceInfoNarrow)<Pick<Props, 'isSelected'>>`
  gap: 12px;

  @media (max-width: ${BreakPoints.sm - 1}px) {
    ${({ isSelected }) =>
      isSelected
        ? css`
            display: none;
          `
        : css`
            ${InfoValue} {
              display: contents;
            }
          `};
  }
`

const Value = styled(TokenValue)<{ locked?: boolean }>`
  color: ${({ locked }) => (locked ? Colors.Black[500] : 'default')};
`
