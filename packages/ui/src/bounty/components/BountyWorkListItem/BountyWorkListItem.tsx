import React from 'react'
import styled, { css } from 'styled-components'

import { BlockTime } from '@/common/components/BlockTime'
import { CopyButtonTemplate } from '@/common/components/buttons'
import { LinkIcon } from '@/common/components/icons'
import { TextBig, TextSmall } from '@/common/components/typography'
import { Colors } from '@/common/constants'
import { Glow } from '@/common/constants/animations'
import { Block } from '@/common/types'
import { MemberInfo } from '@/memberships/components'
import { Member } from '@/memberships/types'

export interface BountyWorkListItemProps {
  id: string
  entrant: Member
  inBlock: Block
  title: string
  description: string
  link: string
  withdrawn?: boolean
  searched?: boolean
}

export const BountyWorkListItem = ({
  link,
  entrant,
  inBlock,
  title,
  description,
  id,
  searched = false,
  withdrawn = false,
}: BountyWorkListItemProps) => {
  return (
    <Wrapper withdrawn={withdrawn} id={id} searched={searched}>
      <Header>
        <MemberInfo size="s" member={entrant} />
        <BlockTime block={inBlock} layout="column" />
      </Header>
      {!withdrawn && (
        <Body>
          <TextBig bold inter>
            {title}
          </TextBig>
          <DescriptionContainer>
            <TextSmall inter>{description}</TextSmall>
          </DescriptionContainer>
          <CopyButtonTemplate textToCopy={link} square size="medium" icon={<LinkIcon />} title="Copy link" />
        </Body>
      )}
    </Wrapper>
  )
}

const Wrapper = styled.div<{ withdrawn: boolean; searched?: boolean }>`
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid ${Colors.Black[200]};
  max-height: min-content;
  row-gap: 24px;
  margin: 12px 0;
  padding: 10px;

  ${({ searched }) => {
    if (searched) {
      return css`
        animation: ${Glow} 1s ease-in-out 0.5s;
      `
    }
  }}

  ${({ withdrawn }) => {
    if (withdrawn) {
      return css`
        opacity: 0.5;
        pointer-events: none;
        padding-bottom: 40px;
      `
    }
  }}
`

const Header = styled.div`
  display: flex;
  height: min-content;
  justify-content: space-between;
`

const Body = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 16px;

  ${TextSmall} {
    color: ${Colors.Black[600]};
  }

  > button {
    align-self: end;
  }
`

const DescriptionContainer = styled.div`
  overflow-y: auto;
  max-height: 82px;
`
