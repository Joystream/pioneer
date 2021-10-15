import React from 'react'
import styled from 'styled-components'

import { UnknownAccountInfo } from '@/accounts/components/UnknownAccountInfo'
import { ButtonGhost, ButtonInnerWrapper } from '@/common/components/buttons'
import { ArrowRightIcon } from '@/common/components/icons'
import { MarkdownPreview } from '@/common/components/MarkdownPreview'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { SidePaneLabel, SidePaneRow, SidePaneTable, SidePaneText } from '@/common/components/SidePane'
import { TextMedium, TokenValue } from '@/common/components/typography'
import { Fonts } from '@/common/constants'
import { CandidateStatistics } from '@/council/components/candidate/CandidateStatistics'
import { ElectionCandidateWithDetails } from '@/council/types'

interface Props {
  candidate: ElectionCandidateWithDetails
}

export const CandidacyDetails = ({ candidate }: Props) => {
  return (
    <>
      <Details gap={24}>
        <RowGapBlock gap={4}>
          <h4>{candidate.info.title}</h4>
          {candidate.info.bannerUri && <HeaderImage src={candidate.info.bannerUri} />}
        </RowGapBlock>
        <RowGapBlock gap={4}>
          <h6>Past elections results</h6>
          <CandidateStatistics memberId={candidate.member.id} />
        </RowGapBlock>
        <RowGapBlock gap={4}>
          <h6>Candidacy discussion thread</h6>
          <MessagesButton size="large">
            30 messages <ArrowRightIcon />
          </MessagesButton>
          <TextMedium light>Last message from A 1 hour ago</TextMedium>
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
    </>
  )
}

const Details = styled(RowGapBlock)`
  padding: 24px;
`

const HeaderImage = styled.img`
  width: 100%;
`

const MessagesButton = styled(ButtonGhost)`
  justify-content: space-between;
  width: 100%;
  font-family: ${Fonts.Inter};
  font-weight: 400;
  text-transform: none;

  ${ButtonInnerWrapper} {
    justify-content: space-between;
    width: 100%;
  }
`