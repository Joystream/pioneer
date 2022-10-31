import React from 'react'
import styled from 'styled-components'

import { UnknownAccountInfo } from '@/accounts/components/UnknownAccountInfo'
import { MarkdownPreview } from '@/common/components/MarkdownPreview'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { SidePaneLabel, SidePaneRow, SidePaneText } from '@/common/components/SidePane'
import { TokenValue } from '@/common/components/typography'
import { UserImage } from '@/common/components/UserImage/UserImage'
import { CandidateStatistics } from '@/council/components/candidate/CandidateStatistics'
import { ElectionCandidateWithDetails } from '@/council/types'

interface Props {
  candidate: ElectionCandidateWithDetails
}

export const CandidacyDetails = ({ candidate }: Props) => {
  return (
    <Details gap={24}>
      <RowGapBlock gap={4}>
        <Title>{candidate.info.title}</Title>
        {candidate.info.bannerUri && <HeaderImage src={candidate.info.bannerUri} />}
      </RowGapBlock>
      <RowGapBlock gap={4}>
        <h6>Past elections results</h6>
        <CandidateStatistics memberId={candidate.member.id} />
      </RowGapBlock>
      <RowGapBlock gap={4}>
        <h6>Candidate summary</h6>
        <MarkdownPreview markdown={candidate.info.summary} />
      </RowGapBlock>
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
    </Details>
  )
}

const Details = styled(RowGapBlock)`
  padding: 24px;
`

const HeaderImage = styled(UserImage)`
  width: 100%;
`

const Title = styled.h4`
  word-break: break-word;
`
