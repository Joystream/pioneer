import React from 'react'
import styled from 'styled-components'

import { BlockTime } from '@/common/components/BlockTime'
import { CopyButtonTemplate } from '@/common/components/buttons'
import { LinkIcon } from '@/common/components/icons'
import { TextMedium } from '@/common/components/typography'
import { Colors } from '@/common/constants'
import { Block } from '@/common/types'
import { MemberInfo } from '@/memberships/components'
import { Member } from '@/memberships/types'

export interface BountySlashedListItemProps {
  entrant: Member
  inBlock: Block
  link: string
}

export const BountySlashedListItem = ({ link, entrant, inBlock }: BountySlashedListItemProps) => {
  return (
    <Wrapper>
      <Header>
        <MemberInfo size="s" member={entrant} />
        <HeaderInfo>
          <TextMedium bold>Slashed</TextMedium>
          <BlockTime block={inBlock} layout="column" />
          <CopyButtonTemplate textToCopy={link} square size="medium" icon={<LinkIcon />} title="Copy link" />
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
  padding: 12px 0;
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
