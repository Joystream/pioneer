import React, { memo } from 'react'
import styled from 'styled-components'

import { Loading } from '@/common/components/Loading'
import { ScrollableModalColumn } from '@/common/components/Modal'
import { TokenValueStat } from '@/common/components/statistics'
import { TextMedium } from '@/common/components/typography'
import { BulletPoint, Colors, Overflow } from '@/common/constants'
import { CandidateStatistics } from '@/council/components/candidate/CandidateStatistics'
import { ElectionCandidateWithDetails } from '@/council/types'
import { MemberInfo } from '@/memberships/components'

import { VoteForCouncilFormModalProps } from '../VoteForCouncilFormModal'

interface CandidacyReviewProps extends Omit<VoteForCouncilFormModalProps, 'send'> {
  candidate?: ElectionCandidateWithDetails
}

export const CandidacyReview = memo(({ candidate, minStake }: CandidacyReviewProps) => {
  if (!candidate) {
    return (
      <CandidatePreviewColumn>
        <Loading />
      </CandidatePreviewColumn>
    )
  }

  return (
    <CandidatePreviewColumn>
      <h6>Candidate</h6>
      <MemberInfo member={candidate.member} memberSize="l" size="l" skipModal />

      <h4>{candidate.info.title}</h4>

      <CandidacyPointList>
        {candidate.info.bulletPoints.map((bulletPoint, index) => (
          <CandidacyPoint key={`${candidate.id}-bullet-${index}`}>{bulletPoint}</CandidacyPoint>
        ))}
      </CandidacyPointList>

      <div>
        <StatsHeading bold>Past elections outcomes</StatsHeading>
        <CandidateStatistics memberId={candidate.member.id} />
      </div>

      <MinStakeStat value={minStake} title="Min Stake Required" tooltipTitle="Lorem ipsum" size="s" />
    </CandidatePreviewColumn>
  )
})

const CandidatePreviewColumn = styled(ScrollableModalColumn)`
  background-color: ${Colors.Black[100]};
  display: flex;
  flex: 0 0 336px;
  flex-direction: column;
  gap: 24px;
`

const CandidacyPointList = styled.ul`
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  -moz-box-orient: vertical;
  list-style-type: disc;
  list-style-position: inside;
`
const CandidacyPoint = styled.li`
  color: ${Colors.Black[500]};
  font-size: 16px;
  line-height: 20px;
  ${Overflow.DotsTwoLine};
  ${BulletPoint};

  & + & {
    margin-top: 8px;
  }
`

const StatsHeading = styled(TextMedium)`
  margin-bottom: 4px;
`

const MinStakeStat = styled(TokenValueStat)`
  background-color: transparent;
  flex: 0 0 auto;
  margin-top: 64px;
  padding: 0;
`
