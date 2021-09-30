import React from 'react'

import { Row } from '@/common/components/Modal'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { Label, TextInlineMedium, TextMedium } from '@/common/components/typography'
import { formatTokenValue } from '@/common/model/formatters'
import { CouncilConstants } from '@/council/types/CouncilConstants'

export const AnnounceCandidacyConstantsWrapper = ({ constants }: { constants: CouncilConstants | null }) => {
  return (
    <RowGapBlock gap={24}>
      <Row>
        <RowGapBlock gap={8}>
          <h4>Constants</h4>
        </RowGapBlock>
      </Row>
      <Row>
        <RowGapBlock gap={4}>
          <Label>Number of council seats</Label>
          <TextMedium lighter>
            <TextInlineMedium dark>{formatTokenValue(constants?.size)}</TextInlineMedium>
          </TextMedium>
        </RowGapBlock>
      </Row>
      <Row>
        <RowGapBlock gap={4}>
          <Label>Announcing period</Label>
          <TextMedium lighter>
            <TextInlineMedium dark>{formatTokenValue(constants?.announcingPeriod)}</TextInlineMedium> blocks
          </TextMedium>
        </RowGapBlock>
      </Row>
      <Row>
        <RowGapBlock gap={4}>
          <Label>Voting period</Label>
          <TextMedium lighter>
            <TextInlineMedium dark>{formatTokenValue(constants?.election.votingPeriod)}</TextInlineMedium> blocks
          </TextMedium>
        </RowGapBlock>
      </Row>
      <Row>
        <RowGapBlock gap={4}>
          <Label>Revealing period</Label>
          <TextMedium lighter>
            <TextInlineMedium dark>{formatTokenValue(constants?.election.revealingPeriod)}</TextInlineMedium> blocks
          </TextMedium>
        </RowGapBlock>
      </Row>
      <Row>
        <RowGapBlock gap={4}>
          <Label>Min. Candidate Stake</Label>
          <TextMedium lighter>
            <TextInlineMedium dark>{formatTokenValue(constants?.election.minStake)}</TextInlineMedium> JOY
          </TextMedium>
        </RowGapBlock>
      </Row>
    </RowGapBlock>
  )
}
