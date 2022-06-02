import BN from 'bn.js'
import React from 'react'
import styled from 'styled-components'

import { BlockTime } from '@/common/components/BlockTime'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { TextMedium, TokenValue } from '@/common/components/typography'
import { Colors } from '@/common/constants'
import { Block } from '@/common/types'
import { MemberInfo } from '@/memberships/components'
import { Member } from '@/memberships/types'

export interface BountySlashedListItemProps {
  entrant: Member
  inBlock?: Block
  stake: BN
}

export const BountySlashedListItem = ({ entrant, inBlock, stake }: BountySlashedListItemProps) => {
  return (
    <Wrapper>
      <Header>
        <MemberInfo size="s" member={entrant} />
        <HeaderInfo>
          <RowGapBlock gap={4}>
            <TextMedium bold>Slashed</TextMedium>
            <TokenValue value={stake} />
          </RowGapBlock>
          {inBlock && <BlockTime block={inBlock} layout="column" />}
        </HeaderInfo>
      </Header>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid ${Colors.Black[200]};
  max-height: 250px;
  row-gap: 24px;
  margin: 12px 0;
  padding: 6px 0 34px 0;
`

const Header = styled.div`
  display: flex;
  height: min-content;
  justify-content: space-between;
`

const HeaderInfo = styled.div`
  display: flex;
  column-gap: 15px;

  > *:first-child {
    color: ${Colors.Negative[500]};
  }
`
