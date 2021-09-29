import React from 'react'
import styled from 'styled-components'

import { UnknownAccountInfo } from '@/accounts/components/UnknownAccountInfo'
import { ButtonGhost } from '@/common/components/buttons'
import { ArrowRightIcon } from '@/common/components/icons'
import { MarkdownPreview } from '@/common/components/MarkdownPreview'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { SidePaneLabel, SidePaneRow, SidePaneTable, SidePaneText } from '@/common/components/SidePane'
import { StatisticItem, Statistics } from '@/common/components/statistics'
import { TextMedium, TokenValue } from '@/common/components/typography'
import { Candidate } from '@/council/types'

interface Props {
  candidate: Candidate
}

export const CandidacyDetails = ({ candidate }: Props) => {
  return (
    <>
      <Details gap={16}>
        <h1>{candidate.title}</h1>
        <h4>Past elections results</h4>
        <Statistics>
          <StatisticItem title="Successful">1</StatisticItem>
          <StatisticItem title="Withdrawn">3</StatisticItem>
          <StatisticItem title="Failed">2</StatisticItem>
        </Statistics>
        <h4>Candidacy discussion thread</h4>
        <ButtonGhost size="large">
          30 messages <ArrowRightIcon />
        </ButtonGhost>
        <TextMedium light>Last message from A 1 hour ago</TextMedium>
        <h4>Candidate summary</h4>
        <MarkdownPreview markdown={candidate.note} />
      </Details>
      <SidePaneTable>
        <SidePaneRow>
          <SidePaneLabel text="Staked" />
          <SidePaneText>
            <TokenValue value={candidate.stake} />
          </SidePaneText>
        </SidePaneRow>
        <SidePaneRow>
          <SidePaneLabel text="Staking Account" />
          <UnknownAccountInfo address={candidate.stakingAccount} placeholderName="Staking account" />
        </SidePaneRow>
      </SidePaneTable>
    </>
  )
}

const Details = styled(RowGapBlock)`
  padding: 24px;
`
