import React from 'react'
import styled from 'styled-components'

import { BadgeStatus } from '@/common/components/BadgeStatus'
import { TableListItem } from '@/common/components/List'
import { Tooltip, TooltipDefault } from '@/common/components/Tooltip'
import { TextSmall } from '@/common/components/typography/Text'
import { Colors } from '@/common/constants'
import { camelCaseToText } from '@/common/helpers'
import { MemberInfo } from '@/memberships/components'
import { ProposalColLayout } from '@/proposals/constants'
import { isProposalActive } from '@/proposals/model/proposalStatus'
import { Proposal } from '@/proposals/types'

interface ProposalListItemProps {
  proposal: Proposal
}

export const ProposalListItem = ({ proposal }: ProposalListItemProps) => {
  const date = new Date(!isProposalActive(proposal.status) ? (proposal.endedAt as string) : proposal.createdAt)
  return (
    <ProposalItem colLayout={ProposalColLayout} isPast={!isProposalActive(proposal.status)}>
      <TextSmall lighter>{date.toLocaleDateString('en-GB')}</TextSmall>
      <StageField>
        <TextSmall bold>{camelCaseToText(proposal.status)}</TextSmall>
        <Tooltip tooltipText="Lorem ipsum, dolor sit amet consectetur">
          <TooltipDefault />
        </Tooltip>
      </StageField>
      <TypeField bold>
        <BadgeStatus>{camelCaseToText(proposal.details)}</BadgeStatus>
        {proposal.title}
      </TypeField>
      <MemberInfo member={proposal.proposer} />
    </ProposalItem>
  )
}

const ProposalItem = styled(TableListItem)`
  background-color: ${({ isPast }: { isPast?: boolean }) => (isPast ? Colors.Black[50] : Colors.White)};
`

const StageField = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5em;

  & > :first-child {
    flex: 0 1;
  }
`

const TypeField = styled(TextSmall)`
  & > :first-child {
    margin-bottom: 0.5em;
  }
`
