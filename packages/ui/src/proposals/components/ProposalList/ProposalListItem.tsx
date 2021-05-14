import React from 'react'
import styled from 'styled-components'

import { BadgeViolet } from '@/common/components/BadgeViolet'
import { Help } from '@/common/components/Help'
import { TableListItem } from '@/common/components/List'
import { TextSmall } from '@/common/components/typography/Text'
import { MemberInfo } from '@/memberships/components'
import { ProposalColLayout } from '@/proposals/constants'
import { Proposal } from '@/proposals/types'

export const ProposalListItem = ({ id, createdAt, stage, type, proposer }: Proposal) => (
  <TableListItem key={id} colLayout={ProposalColLayout}>
    <DateField value={createdAt} />
    <StageField>
      <TextSmall bold>{stage}</TextSmall>
      <Help helperText="Lorem ipsum, dolor sit amet consectetur" />
    </StageField>
    <TypeField bold>
      <BadgeViolet>{type}</BadgeViolet>
      Lorem ipsum, dolor sit amet consectetur
    </TypeField>
    <MemberInfo member={proposer} />
  </TableListItem>
)

const DateField = ({ value }: { value: string }) => {
  const date = new Date(value)
  return <TextSmall lighter>{date.toLocaleDateString('en-GB')}</TextSmall>
}

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
