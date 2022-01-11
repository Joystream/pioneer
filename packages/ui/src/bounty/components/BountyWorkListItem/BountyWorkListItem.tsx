import React from 'react'
import styled, { css } from 'styled-components'

import { BlockTime } from '@/common/components/BlockTime'
import { LinkButtonGhost } from '@/common/components/buttons/LinkButtons'
import { LinkIcon } from '@/common/components/icons'
import { TextBig, TextSmall } from '@/common/components/typography'
import { Colors } from '@/common/constants'
import { Block } from '@/common/types'
import { MemberInfo } from '@/memberships/components'
import { Member } from '@/memberships/types'

export interface BountyWorkListItemProps {
  entrant: Member
  inBlock: Block
  title: string
  description: string
  link: string
  withdrawn?: boolean
}

export const BountyWorkListItem = ({
  link,
  entrant,
  inBlock,
  title,
  description,
  withdrawn = false,
}: BountyWorkListItemProps) => {
  return (
    <Wrapper withdrawn={withdrawn}>
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
          <StyledButton to={link} square size="medium">
            <LinkIcon />
          </StyledButton>
        </Body>
      )}
    </Wrapper>
  )
}

const Wrapper = styled.div<{ withdrawn: boolean }>`
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid ${Colors.Black[400]};
  max-height: 250px;
  row-gap: 24px;
  margin: 12px 0;

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
  margin-bottom: 8px;

  ${TextSmall} {
    color: ${Colors.Black[600]};
  }
`

const DescriptionContainer = styled.div`
  overflow-y: auto;
  max-height: 82px;
`

const StyledButton = styled(LinkButtonGhost)`
  align-self: flex-end;
`
