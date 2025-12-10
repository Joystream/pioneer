import React, { useState } from 'react'
import styled from 'styled-components'

import { AccountInfo } from '@/accounts/components/AccountInfo'
import { Account } from '@/accounts/types'
import { TableListItemAsLinkHover } from '@/common/components/List'
import { Skeleton } from '@/common/components/Skeleton'
import { TextMedium, TokenValue } from '@/common/components/typography'
import { BorderRad, Colors, Sizes, Transitions } from '@/common/constants'
import { Block } from '@/common/types'
import { NominatorInfo, useNominatorInfo } from '@/validators/hooks/useNominatorInfo'
interface BlockTimeLayoutProps {
  layout?: 'row' | 'column' | 'reverse' | 'reverse-start'
  position?: 'start' | 'end'
}

export interface AccountItemDataProps extends BlockTimeLayoutProps {
  account: Account
  block?: Block
  dateLabel?: string
  lessInfo?: boolean
  nominatorInfo?: NominatorInfo
}

export const NominatorAccountItem = ({ account, nominatorInfo: providedInfo }: AccountItemDataProps) => {
  const address = account.address
  const fetchedNominatorInfo = useNominatorInfo(address)
  const nominatorInfo = providedInfo ?? fetchedNominatorInfo

  const [isDropped, setDropped] = useState(false)

  return (
    <NominatorItemWarpper>
      <NominatorItemWarp key={address} onClick={() => setDropped(!isDropped)}>
        <AccountInfo account={account} />
        {nominatorInfo?.isNominating ? (
          <TextMedium>
            {`${nominatorInfo.targets.length} Validator${nominatorInfo.targets.length !== 1 ? 's' : ''}`}
          </TextMedium>
        ) : (
          <TextMedium lighter>Not nominating</TextMedium>
        )}
        <TokenValue value={nominatorInfo?.totalStake} isLoading={!nominatorInfo} />
      </NominatorItemWarp>
    </NominatorItemWarpper>
  )
}

const NominatorItemWarpper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  border: 1px solid ${Colors.Black[100]};
  border-radius: ${BorderRad.s};
  cursor: pointer;
  transition: ${Transitions.all};

  ${TableListItemAsLinkHover}
`

export const NominatorItemWarp = styled.div`
  display: grid;
  grid-template-columns: 276px repeat(2, 213px);
  grid-template-rows: 1fr;
  justify-content: space-between;
  justify-items: start;
  align-items: center;
  width: 100%;
  height: ${Sizes.accountHeight};
  padding: 16px;
  margin: -1px;

  ${Skeleton} {
    min-width: 80%;
    height: 1.2rem;
  }
`
