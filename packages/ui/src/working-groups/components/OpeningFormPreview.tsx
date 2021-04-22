import React from 'react'

import { BadgeViolet } from '../../common/components/BadgeViolet'
import { Link } from '../../common/components/Link'
import { Row } from '../../common/components/Modal'
import { RowGapBlock } from '../../common/components/page/PageContent'
import { TextMedium, TokenValue } from '../../common/components/typography'
import { percentTimeLeft } from '../../common/model/percentTimeLeft'
import { relativeTime } from '../../common/model/relativeTime'
import { WorkingGroupOpening } from '../types'

export type OpeningFormPreviewProps = { opening: WorkingGroupOpening }

export const OpeningFormPreview = React.memo(({ opening }: OpeningFormPreviewProps) => {
  const openingStart = '2021-02-09T10:28:04.155Z'

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
        <label>Time left</label>
        {relativeTime(opening.expectedEnding)}
        <TextMedium>{percentTimeLeft(opening.expectedEnding, openingStart)}%</TextMedium>
      </Row>
      <Row>
        <label>Applicants</label>
        <TextMedium>
          {opening.hiring.total} / {opening.hiring.current}
        </TextMedium>
      </Row>
      <Row>
        <label>Reward</label>
        <TextMedium>
          <TokenValue value={opening.reward.value} /> per {opening.reward.interval} blocks
        </TextMedium>
      </Row>
      <Row>
        <label>Stake required</label>
        <TokenValue value={200_000} />
      </Row>
    </RowGapBlock>
  )
})
