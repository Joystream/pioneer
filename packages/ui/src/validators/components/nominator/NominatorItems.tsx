import React, { useMemo } from 'react'
import styled from 'styled-components'

import { BorderRad, Colors, Sizes, Transitions } from '@/common/constants'
import { TableListItemAsLinkHover } from '@/common/components/List'
import { Skeleton } from '@/common/components/Skeleton'
import { DropDownToggle } from '@/common/components/buttons/DropDownToggle'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { AccountInfo } from '@/accounts/components/AccountInfo'
import { TextBig, TextMedium, TextSmall, TokenValue } from '@/common/components/typography'
import { BadgeStatus } from '@/common/components/BadgeStatus'
import { ButtonGhost, ButtonPrimary } from '@/common/components/buttons'
import { Validator } from '@/validators/types/Validator'
import { PercentageChart } from '@/common/components/charts/PercentageChart'
import { EditSymbol } from '@/common/components/icons/symbols'
import { TransactionButtonWrapper } from '@/common/components/buttons/TransactionButton'
import { ButtonsComponent } from '@/common/components/buttons/Buttons.stories'
import { DeleteSymbol } from '@/common/components/icons/symbols/DeleteSymbol'

interface ValidatorItemProps {
  validator: Validator
}
export const NorminatorDashboardItem = ({ validator }: ValidatorItemProps) => {
  const { address, verification, state, totalRewards, APR } = validator
  const validatorAccount = useMemo(
    () => ({
      name: 'unknown',
      address: address,
      source: '',
    }),
    [validator]
  )

  const daysApr: number = -0.3;

  return (
    <ValidatorItemWrapper>
      <ValidatorItemWrap key={address} onClick={() => alert('here comes the handler which shows validator card')}>
        <AccountInfo account={validatorAccount} />
        <TokenValue value={totalRewards} />

        <PercentageChart percentage={10} />
        <TextBig>{-12}%</TextBig>
        <TextBig>{daysApr > 0 ? <span style={{ color: "red" }}>{daysApr}</span> : <span color='green'>{daysApr}</span>}%</TextBig>
        <TextBig>{3}</TextBig>

        <TokenValue value={totalRewards} />
        <TokenValue value={totalRewards} />
        <ButtonPrimary size="small" onClick={() => alert(`You select validator:${address} to nominate`)}>
          {' '}
          Nominate{' '}
        </ButtonPrimary>
        <TransactionButtonWrapper>
          <ButtonForTransfer
            size="small"
            square
            onClick={(event) => {
              console.log(event)
            }}
          >
            <EditSymbol />
          </ButtonForTransfer>
        </TransactionButtonWrapper>
        <TransactionButtonWrapper>
          <ButtonForTransfer
            size="small"
            square
            onClick={(event) => {
              console.log(event)
            }}
          >
            < DeleteSymbol />
          </ButtonForTransfer>
        </TransactionButtonWrapper>
      </ValidatorItemWrap>
    </ValidatorItemWrapper>
  )
}
const ButtonForTransfer = styled(ButtonGhost)`
  z-index: 1;
  svg {
    color: ${Colors.Black[900]};
  }
`

const ButtonForTransferStyled = styled(ButtonPrimary)`
  width: 32px;
  height: 32px;
  grid-area: balancetransfer;
  justify-self: end;
  z-index: 1;
`

const ValidatorItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  border: 1px solid ${Colors.Black[100]};
  border-radius: ${BorderRad.s};
  cursor: pointer;
  transition: ${Transitions.all};
  ${TableListItemAsLinkHover}
`

export const ValidatorItemWrap = styled.div`
  display: grid;
  grid-template-columns: 224px 120px 57px 40px 50px 34px 120px 120px 90px 30px 30px;
  grid-template-rows: 1fr;
  justify-content: space-between;
  justify-items: start;
  align-items: center;
  width: 100%;
  height: ${Sizes.accountHeight};
  padding: 16px 8px 16px 16px;
  margin-left: -1px;
  ${Skeleton} {
    min-width: 80%;
    height: 1.2rem;
  }
`

const AccountControls = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 32px);
  grid-template-rows: 32px;
  grid-column-gap: 4px;
`
const StyledDropDown = styled(DropDownToggle)`
  row-gap: 16px;
  padding: 16px;
  background-color: ${Colors.Black[50]};
`

const ValueAndLocks = styled(RowGapBlock)`
  position: relative;
`