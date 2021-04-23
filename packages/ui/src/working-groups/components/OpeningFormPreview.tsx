import React from 'react'

import { BadgeViolet } from '../../common/components/BadgeViolet'
import { Link } from '../../common/components/Link'
import { Row } from '../../common/components/Modal'
import { RowGapBlock } from '../../common/components/page/PageContent'
import { Label, TextInlineHuge, TextMedium, TokenValue } from '../../common/components/typography'
import { Fraction } from '../../common/components/typography/Fraction'
import { relativeTime } from '../../common/model/relativeTime'
import { WorkingGroupOpening } from '../types'

export type OpeningFormPreviewProps = { opening: WorkingGroupOpening }

export const OpeningFormPreview = React.memo(({ opening }: OpeningFormPreviewProps) => {
  return (
    <RowGapBlock gap={24}>
      <Row>
        <BadgeViolet inverted size="l">
          {opening.type}
        </BadgeViolet>
      </Row>
      <Row>
        <RowGapBlock gap={8}>
          <h4>{opening.title}</h4>
          <TextMedium light>
            Content Curators will one day be essential for ensuring that the petabytes of media items uploaded to
            Joystream are formatted correctly and comprehensively monitored and moderated. Our current testnet allows
            this content monitoring to take place...
          </TextMedium>
        </RowGapBlock>
      </Row>
      <Row>
        <Link href="http://example.com/" size="l" dark>
          Show more
        </Link>
      </Row>
      <Row>
        <RowGapBlock gap={4}>
          <Label>Time left</Label>
          {relativeTime(opening.expectedEnding)}
        </RowGapBlock>
      </Row>
      <Row>
        <RowGapBlock gap={4}>
          <Label>Applicants</Label>
          <Fraction numerator={opening.hiring.total} denominator={opening.hiring.current} />
        </RowGapBlock>
      </Row>
      <Row>
        <RowGapBlock gap={4}>
          <Label>Reward</Label>
          <TextMedium lighter>
            <TextInlineHuge>
              <TokenValue value={opening.reward.value} />
            </TextInlineHuge>{' '}
            per {opening.reward.interval} blocks
          </TextMedium>
        </RowGapBlock>
      </Row>
      <Row>
        <RowGapBlock gap={4}>
          <Label>Stake required</Label>
          <TextInlineHuge>
            <TokenValue value={200_000} />
          </TextInlineHuge>
        </RowGapBlock>
      </Row>
    </RowGapBlock>
  )
})
