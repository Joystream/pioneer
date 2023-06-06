import React, { useState } from 'react'
import styled from 'styled-components'

import { AccountInfo } from '@/accounts/components/AccountInfo'
import { Account } from '@/accounts/types'
import { DropDownButton, DropDownToggle } from '@/common/components/buttons/DropDownToggle'
import { TableListItemAsLinkHover } from '@/common/components/List'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { Skeleton } from '@/common/components/Skeleton'
import { TextBig, TextSmall, TokenValue } from '@/common/components/typography'
import { BorderRad, Colors, Sizes, Transitions } from '@/common/constants'
import { isDefined, sumBN } from '@/common/utils'
import { TransactionButtonWrapper } from '@/common/components/buttons/TransactionButton'
import { ValidatorOverViewClaimButton } from '../styles'
import { useBalance } from '@/accounts/hooks/useBalance'
import { BlockIcon, TransferIcon } from '@/common/components/icons'
import { LinkSymbol } from '@/common/components/icons/symbols'

interface AccountItemDataProps {
    account: Account
}


export const RewardHistoryItem = ({ account }: AccountItemDataProps) => {
    const address = account.address
    const balance = useBalance(address)


    const onClick = () => {
        console.log("clock")
    }
    const [isDropped, setDropped] = useState(false)

    return (
        <RewardHistoryItemWrappers>
            <AccountItemWrap key={address} onClick={() => setDropped(!isDropped)}>
                <TokenValue value={balance?.total} isLoading={!isDefined(balance?.total)} />
                <TextBig>5493</TextBig>
                {/* {block ? <BlockTime block={block} layout="reverse-start" lessInfo /> : ""} */}
                <TextSmall>
                    <div>01/07/2020, 10:00am CET</div>
                    <div><BlockIcon />389,829 on Babylon network</div>
                </TextSmall>

                <TransactionButtonWrapper>
                    <LinkSymbol />
                </TransactionButtonWrapper>
            </AccountItemWrap>

        </RewardHistoryItemWrappers>
    )
}

const RewardHistoryItemWrappers = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  border: 1px solid ${Colors.Black[500]};
  border-radius: ${BorderRad.s};
  cursor: pointer;
  transition: ${Transitions.all};
  background-color: #E8EDF6;

  ${TableListItemAsLinkHover}
`

export const AccountItemWrap = styled.div`
  display: grid;
  grid-template-columns: 276px repeat(2,247px) 32px;
  grid-template-rows: 1fr;
  justify-content: space-between;
  justify-items: start;
  align-items: center;
  width: 100%;
  height: ${Sizes.validatorHeight};
  padding: 16px 8px 16px 16px;
  margin-left: -1px;

  ${Skeleton} {
    min-width: 100%;
    height: 1.2rem;
  }
`
