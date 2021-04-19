import React from 'react'

import { BadgeViolet } from '../../common/components/BadgeViolet'
import { Row } from '../../common/components/Modal'
import { TextMedium, TokenValue } from '../../common/components/typography'
import { relativeTime } from '../../common/model/relativeTime'
import { WorkingGroupOpening } from '../types'

type OpeningFormPreviewProps = { opening: WorkingGroupOpening }

export const OpeningFormPreview = (props: OpeningFormPreviewProps) => (
  <>
    <Row>
      <BadgeViolet>{props.opening.type}</BadgeViolet>
    </Row>
    <h3>{props.opening.title}</h3>
    <p>
      Content Curators will one day be essential for ensuring that the petabytes of media items uploaded to Joystream
      are format...
    </p>
    <span>Show more</span>
    <Row>
      <label>Time left</label>
      {relativeTime(props.opening.expectedEnding)}
    </Row>
    <Row>
      <label>Applicants</label>
      <TextMedium>
        {props.opening.hiring.total} / {props.opening.hiring.current}
      </TextMedium>
    </Row>
    <Row>
      <label>Reward</label>
      <TextMedium>
        <TokenValue value={props.opening.reward.value} /> per {props.opening.reward.interval} blocks
      </TextMedium>
    </Row>
    <Row>
      <label>Stake required</label>
      <TokenValue value={200_000} />
    </Row>
  </>
)
