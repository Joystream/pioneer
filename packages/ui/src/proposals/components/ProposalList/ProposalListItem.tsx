import React from 'react'
import styled from 'styled-components'

import { BadgeStatus } from '@/common/components/BadgeStatus'
import { TableListItem } from '@/common/components/List'
import { Tooltip, TooltipDefault } from '@/common/components/Tooltip'
import { TextSmall } from '@/common/components/typography/Text'
import { Colors } from '@/common/constants'
import { MemberInfo } from '@/memberships/components'
import { ProposalColLayout } from '@/proposals/constants'
import { Proposal } from '@/proposals/types'

interface ProposalListItemProps extends Proposal {
  isPast?: boolean
}

export const ProposalListItem = ({ title, stage, type, proposer, isPast, ...proposal }: ProposalListItemProps) => {
  const date = new Date(isPast ? (proposal.endedAt as string) : proposal.createdAt)
  return (
    <ProposalItem colLayout={ProposalColLayout} isPast={isPast}>
      <TextSmall lighter>{date.toLocaleDateString('en-GB')}</TextSmall>
      <StageField>
        <TextSmall bold>{stage}</TextSmall>
        <Tooltip tooltipText="Lorem ipsum, dolor sit amet consectetur">
          <TooltipDefault />
        </Tooltip>
      </StageField>
      <TypeField bold>
        <BadgeStatus>{type}</BadgeStatus>
        {title}
      </TypeField>
      <MemberInfo member={proposer} />
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
