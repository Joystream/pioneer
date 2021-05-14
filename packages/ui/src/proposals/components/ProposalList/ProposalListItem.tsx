import React from 'react'
import styled from 'styled-components'

import { BadgeViolet } from '@/common/components/BadgeViolet'
import { Help } from '@/common/components/Help'
import { TableListItem } from '@/common/components/List'
import { TextSmall } from '@/common/components/typography/Text'
import { MemberInfo } from '@/memberships/components'
import { ProposalColLayout, ProposalStages, ProposalTypes } from '@/proposals/constants'
import { Proposal } from '@/proposals/types'

export const ProposalListItem = ({ id, createdAt, stage, type, proposer }: Proposal) => {
  const stageValue = ProposalStages[stage]
  const typeValue = ProposalTypes[type]
  return (
    <TableListItem key={id} colLayout={ProposalColLayout}>
      <DateField value={createdAt} />
      <StageField>
        <TextSmall bold>{stageValue.title}</TextSmall>
        <Help helperText={stageValue.desc} />
      </StageField>
      <TypeField bold>
        <BadgeViolet>{typeValue.title}</BadgeViolet>
        {typeValue.desc}
      </TypeField>
      <MemberInfo member={proposer} />
    </TableListItem>
  )
}

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
