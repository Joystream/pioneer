import React from 'react'
import styled from 'styled-components'

import { BadgeStatus } from '@/common/components/BadgeStatus'
import { TableListItem } from '@/common/components/List'
import { GhostRouterLink } from '@/common/components/RouterLink'
import { Tooltip, TooltipDefault } from '@/common/components/Tooltip'
import { Subscription } from '@/common/components/typography/Subscription'
import { TextSmall } from '@/common/components/typography/Text'
import { Colors, Overflow } from '@/common/constants'
import { camelCaseToText } from '@/common/helpers'
import { MemberInfo } from '@/memberships/components'
import { ProposalColLayout } from '@/proposals/constants'
import { ProposalsRoutes } from '@/proposals/constants/routes'
import { isProposalActive } from '@/proposals/model/proposalStatus'
import { Proposal } from '@/proposals/types'
import {
  ToggleableItemInfo,
  ToggleableItemInfoTop,
  ToggleableItemTitle,
} from '@/working-groups/components/ToggleableItemStyledComponents'

interface ProposalListItemProps {
  proposal: Proposal
  isPast?: boolean
}

export const ProposalListItem = ({ proposal, isPast }: ProposalListItemProps) => {
  const date = new Date(!isProposalActive(proposal.status) ? (proposal.endedAt as string) : proposal.createdAt)
  return (
    <ProposalItem
      as={GhostRouterLink}
      to={`${ProposalsRoutes.preview}/${proposal.id}`}
      colLayout={ProposalColLayout}
      isPast={!isProposalActive(proposal.status)}
    >
      <ToggleableItemInfo>
        <ToggleableItemInfoTop>
          <Subscription>
            {isPast ? 'Ended:' : 'Created:'} {date.toLocaleDateString('en-GB')}
          </Subscription>
          <BadgeStatus>{camelCaseToText(proposal.details)}</BadgeStatus>
        </ToggleableItemInfoTop>
        <ToggleableItemTitle>{proposal.title}</ToggleableItemTitle>
      </ToggleableItemInfo>
      <StageField>
        <TextSmall bold>{camelCaseToText(proposal.status)}</TextSmall>
        <Tooltip tooltipText="Lorem ipsum, dolor sit amet consectetur">
          <TooltipDefault />
        </Tooltip>
      </StageField>
      <MemberInfo member={proposal.proposer} />
    </ProposalItem>
  )
}

const ProposalItem = styled(TableListItem)`
  grid-column-gap: 32px;
  padding-right: 24px;
  background-color: ${({ isPast }: { isPast?: boolean }) => (isPast ? Colors.Black[50] : Colors.White)};
`

const StageField = styled.div`
  display: inline-grid;
  grid-auto-flow: column;
  grid-column-gap: 8px;
  width: fit-content;
  max-width: 100%;

  ${TextSmall} {
    ${Overflow.FullDots};
  }
`
