import React from 'react'

import { Row } from '@/common/components/Modal'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { Label, TextInlineMedium, TextMedium } from '@/common/components/typography'
import { displayConstantValue } from '@/common/helpers'
import { AnnounceCandidateConstants } from '@/council/types/AnnounceCandidateConstants'

export const AnnounceCandidateConstantsWrapper = ({ constants }: { constants: AnnounceCandidateConstants | null }) => {
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
            <TextInlineMedium dark>{displayConstantValue(constants?.councilSeats)}</TextInlineMedium>
          </TextMedium>
        </RowGapBlock>
      </Row>
      <Row>
        <RowGapBlock gap={4}>
          <Label>Announcing period</Label>
          <TextMedium lighter>
            <TextInlineMedium dark>{displayConstantValue(constants?.announcingPeriod)}</TextInlineMedium> blocks
          </TextMedium>
        </RowGapBlock>
      </Row>
      <Row>
        <RowGapBlock gap={4}>
          <Label>Voting period</Label>
          <TextMedium lighter>
            <TextInlineMedium dark>{displayConstantValue(constants?.votingPeriod)}</TextInlineMedium> blocks
          </TextMedium>
        </RowGapBlock>
      </Row>
      <Row>
        <RowGapBlock gap={4}>
          <Label>Revealing period</Label>
          <TextMedium lighter>
            <TextInlineMedium dark>{displayConstantValue(constants?.revealingPeriod)}</TextInlineMedium> blocks
          </TextMedium>
        </RowGapBlock>
      </Row>
      <Row>
        <RowGapBlock gap={4}>
          <Label>Min. Candidate Stake</Label>
          <TextMedium lighter>
            <TextInlineMedium dark>{displayConstantValue(constants?.candidateStake)}</TextInlineMedium> JOY
          </TextMedium>
        </RowGapBlock>
      </Row>
    </RowGapBlock>
  )
}
