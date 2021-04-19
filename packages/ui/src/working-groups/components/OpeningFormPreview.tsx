import React from 'react'

import { BadgeViolet } from '../../common/components/BadgeViolet'
import { Row } from '../../common/components/Modal'
import { TextMedium, TokenValue } from '../../common/components/typography'
import { percentTimeLeft } from '../../common/model/percentTimeLeft'
import { relativeTime } from '../../common/model/relativeTime'
import { WorkingGroupOpening } from '../types'

export type OpeningFormPreviewProps = { opening: WorkingGroupOpening }

export const OpeningFormPreview = ({ opening }: OpeningFormPreviewProps) => {
  const openingStart = '2021-02-09T10:28:04.155Z'

  return (
    <>
      <Row>
        <BadgeViolet>{opening.type}</BadgeViolet>
      </Row>
      <h3>{opening.title}</h3>
      <p>
        Content Curators will one day be essential for ensuring that the petabytes of media items uploaded to Joystream
        are format...
      </p>
      <span>Show more</span>
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
    </>
  )
}
