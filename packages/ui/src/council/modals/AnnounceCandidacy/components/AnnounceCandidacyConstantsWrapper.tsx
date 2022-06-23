import React from 'react'

import { Row } from '@/common/components/Modal'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { Label, TextHuge, TextInlineHuge, TextMedium, TokenValue } from '@/common/components/typography'
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
          <TextHuge dark value bold>
            {formatTokenValue(constants?.size)}
          </TextHuge>
        </RowGapBlock>
      </Row>
      <Row>
        <RowGapBlock gap={4}>
          <Label>Announcing period</Label>
          <TextMedium lighter>
            <TextInlineHuge dark value bold>
              {formatTokenValue(constants?.announcingPeriod)}
            </TextInlineHuge>{' '}
            blocks
          </TextMedium>
        </RowGapBlock>
      </Row>
      <Row>
        <RowGapBlock gap={4}>
          <Label>Voting period</Label>
          <TextMedium lighter>
            <TokenValue value={constants?.election.minCandidacyStake} />
            blocks
          </TextMedium>
        </RowGapBlock>
      </Row>
      <Row>
        <RowGapBlock gap={4}>
          <Label>Revealing period</Label>
          <TextMedium lighter>
            <TextInlineHuge dark value bold>
              {formatTokenValue(constants?.election.revealingPeriod)}
            </TextInlineHuge>{' '}
            blocks
          </TextMedium>
        </RowGapBlock>
      </Row>
      <Row>
        <RowGapBlock gap={4}>
          <Label>Min. Candidate Stake</Label>
          <TextMedium lighter>
            <TextInlineHuge dark value bold>
              <TokenValue value={constants?.election.minCandidacyStake} />
            </TextInlineHuge>{' '}
          </TextMedium>
        </RowGapBlock>
      </Row>
    </RowGapBlock>
  )
}
