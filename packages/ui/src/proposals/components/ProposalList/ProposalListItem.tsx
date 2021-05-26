import React from 'react'
import styled from 'styled-components'

import { BadgeViolet } from '@/common/components/BadgeViolet'
import { TableListItem } from '@/common/components/List'
import { Tooltip, TooltipDefault } from '@/common/components/Tooltip'
import { TextSmall } from '@/common/components/typography/Text'
import { MemberInfo } from '@/memberships/components'
import { ProposalColLayout } from '@/proposals/constants'
import { Proposal } from '@/proposals/types'

interface ProposalListItemProps extends Pick<Proposal, 'id' | 'title' | 'stage' | 'type' | 'proposer'> {
  date: string
}

export const ProposalListItem = ({ title, date, stage, type, proposer }: ProposalListItemProps) => (
  <ProposalItem colLayout={ProposalColLayout}>
    <DateField value={date} />
    <StageField>
      <TextSmall bold>{stage}</TextSmall>
      <Tooltip tooltipText="Lorem ipsum, dolor sit amet consectetur">
        <TooltipDefault />
      </Tooltip>
    </StageField>
    <TypeField bold>
      <BadgeViolet>{type}</BadgeViolet>
      {title}
    </TypeField>
    <MemberInfo member={proposer} />
  </ProposalItem>
)

const DateField = ({ value }: { value: string }) => {
  const date = new Date(value)
  return <TextSmall lighter>{date.toLocaleDateString('en-GB')}</TextSmall>
}

const ProposalItem = styled(TableListItem)`
  background-color: var(--items-background-color);
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
