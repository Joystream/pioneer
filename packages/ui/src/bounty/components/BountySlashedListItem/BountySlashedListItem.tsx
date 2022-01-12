import BN from 'bn.js'
import React from 'react'
import styled from 'styled-components'

import { BlockTime } from '@/common/components/BlockTime'
import { LinkButtonGhost } from '@/common/components/buttons/LinkButtons'
import { LinkIcon } from '@/common/components/icons'
import { TextMedium, TextSmall, TokenValue } from '@/common/components/typography'
import { Colors } from '@/common/constants'
import { Block } from '@/common/types'
import { MemberInfo } from '@/memberships/components'
import { Member } from '@/memberships/types'

export interface BountySlashedListItemProps {
  entrant: Member
  inBlock: Block
  rationale: string
  link: string
  slashAmount: BN
}

export const BountySlashedListItem = ({
  link,
  entrant,
  inBlock,
  rationale,
  slashAmount,
}: BountySlashedListItemProps) => {
  return (
    <Wrapper>
      <Header>
        <MemberInfo size="s" member={entrant} />
        <HeaderInfo>
          <SlashInfo>
            <TextMedium>Slashed</TextMedium>
            <TokenValue value={slashAmount} />
          </SlashInfo>
          <BlockTime block={inBlock} layout="column" />
        </HeaderInfo>
      </Header>
      <Body>
        <TextSmall inter>{rationale}</TextSmall>
        <StyledButton to={link} square size="medium">
          <LinkIcon />
        </StyledButton>
      </Body>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid ${Colors.Black[400]};
  max-height: 250px;
  row-gap: 24px;
  margin: 12px 0;
`

const Header = styled.div`
  display: flex;
  height: min-content;
  justify-content: space-between;
`

const HeaderInfo = styled.div`
  display: flex;
  column-gap: 15px;
`

const SlashInfo = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 10px;

  ${TextMedium} {
    color: ${Colors.Negative[500]};
  }
`

const Body = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 16px;
  margin-bottom: 8px;

  ${TextSmall} {
    color: ${Colors.Black[600]};
  }
`

const StyledButton = styled(LinkButtonGhost)`
  align-self: flex-end;
`
