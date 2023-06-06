import React, { useState } from 'react'
import styled, { css } from 'styled-components'

import { AccountInfo } from '@/accounts/components/AccountInfo'
import { Account } from '@/accounts/types'
import { DropDownButton, DropDownToggle } from '@/common/components/buttons/DropDownToggle'
import { TableListItemAsLinkHover } from '@/common/components/List'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { Skeleton } from '@/common/components/Skeleton'
import { TextMedium, TextSmall, TokenValue } from '@/common/components/typography'
import { BorderRad, Colors, Sizes, Transitions } from '@/common/constants'
import { isDefined, sumBN } from '@/common/utils'
import { TransactionButtonWrapper } from '@/common/components/buttons/TransactionButton'
import { ValidatorOverViewClaimButton } from '../styles'
import { useBalance } from '@/accounts/hooks/useBalance'
import { BlockIcon, BlockIconStyles } from '@/common/components/icons'
import { BlockInfoContainer, BlockNetworkInfo } from '@/common/components/BlockTime/BlockInfo'

import { Block } from '@polkadot/types/interfaces'

interface AccountItemDataProps extends BlockTimeLayoutProps {
  account: Account
  block?: Block
  dateLabel?: string
  lessInfo?: boolean
}

interface BlockTimeLayoutProps {
  layout?: 'row' | 'column' | 'reverse' | 'reverse-start'
  position?: 'start' | 'end'
}

export const NominatorAccountItem = ({ account, block, dateLabel, lessInfo }: AccountItemDataProps) => {


  const address = account.address
  const balance = useBalance(address)


  const onClick = () => {
    console.log("clock")
  }
  const [isDropped, setDropped] = useState(false)

  return (
    <NominatorItemWarpper>
      <NominatorItemWarp key={address} onClick={() => setDropped(!isDropped)}>
        <AccountInfo account={account} />
        {/* {block ? <BlockTime block={block} layout="reverse-start" lessInfo /> : ""} */}
        <TextSmall>
          <div>01/07/2020, 10:00am CET</div>
          <div><BlockIcon />389,829 on Babylon network</div>
        </TextSmall>
        <TokenValue
          value={sumBN(balance?.recoverable, balance?.vestedClaimable)}
          isLoading={!isDefined(balance?.recoverable)}
        />
      </NominatorItemWarp>
    </NominatorItemWarpper>
  )
}

const NominatorItemWarpper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  border: 1px solid ${Colors.Black[500]};
  border-radius: ${BorderRad.s};
  background-color: #E8EDF6;
  cursor: pointer;
  height:  ${Sizes.validatorHeight};;
  transition: ${Transitions.all};

  ${TableListItemAsLinkHover}
`

export const NominatorItemWarp = styled.div`
  display: grid;
  grid-template-columns:276px repeat(2,213px) 133px;
  grid-template-rows: 1fr;
  justify-content: space-between;
  justify-items: center;
  align-items: center;
  width: 100%;
  height: ${Sizes.accountHeight};
  padding: 16px 8px 16px 16px;
  margin-left: -1px;
  background-color: #E8EDF6;

  ${Skeleton} {
    min-width: 100%;
    height: 1.2rem;
  }
`
const Separator = styled.span`
  font-size: inherit;
  line-height: inherit;
`

const AboutText = styled(TextMedium)`
  color: ${Colors.Black[600]};
  width: max-content;
`
export const BlockTimeWrapper = styled.div<BlockTimeLayoutProps>`
  display: grid;
  width: fit-content;
  height: fit-content;
  justify-items: ${({ position }) => position ?? 'start'};

  ${({ layout }) => {
    switch (layout) {
      case 'row':
        return css`
          grid-auto-flow: column;
          grid-column-gap: 8px;
          align-items: center;

          ${AboutText} {
            font-size: 12px;
            line-height: 18px;
            color: ${Colors.Black[400]};
            white-space: nowrap;
          }

          ${BlockIconStyles} {
            color: ${Colors.Black[500]};
          }

          ${Separator} {
            color: ${Colors.Black[400]};
          }
        `
      case 'column':
        return css`
          grid-row-gap: 4px;

          ${BlockIconStyles} {
            color: ${Colors.Black[900]};
          }
        `
      case 'reverse-start':
        return css`
          justify-content: start;
          grid-row-gap: 8px;

          ${AboutText} {
            font-size: 12px;
            line-height: 18px;
            color: ${Colors.Black[500]};
            order: 1;
          }

          ${BlockIconStyles} {
            color: ${Colors.Black[900]};
          }

          ${BlockInfoContainer} {
            color: ${Colors.Black[900]};
            margin-left: 0;
          }

          ${BlockNetworkInfo} {
            color: ${Colors.Black[900]};
          }
        `
      case 'reverse':
      default:
        return css`
          justify-content: end;
          text-align: right;
          grid-row-gap: 8px;

          ${AboutText} {
            font-size: 12px;
            line-height: 18px;
            color: ${Colors.Black[500]};
            order: 1;
          }

          ${BlockIconStyles} {
            color: ${Colors.Black[900]};
          }

          ${BlockInfoContainer} {
            color: ${Colors.Black[900]};
          }

          ${BlockNetworkInfo} {
            color: ${Colors.Black[900]};
          }
        `
    }
  }}
`
