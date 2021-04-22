import React from 'react'
import styled from 'styled-components'

import { BadgeViolet } from '../../common/components/BadgeViolet'
import { Link } from '../../common/components/Link'
import { Row } from '../../common/components/Modal'
import { TextMedium, TokenValue } from '../../common/components/typography'
import { percentTimeLeft } from '../../common/model/percentTimeLeft'
import { relativeTime } from '../../common/model/relativeTime'
import { WorkingGroupOpening } from '../types'

export type OpeningFormPreviewProps = { opening: WorkingGroupOpening }

export const OpeningFormPreview = React.memo(({ opening }: OpeningFormPreviewProps) => {
  const openingStart = '2021-02-09T10:28:04.155Z'

  return (
    <>
      <Row>
        <BadgeViolet inverted size="l">
          {opening.type}
        </BadgeViolet>
      </Row>
      <Row>
        <OpeningModalTitle>{opening.title}</OpeningModalTitle>
        <TextMedium light>
          Content Curators will one day be essential for ensuring that the petabytes of media items uploaded to
          Joystream are formatted correctly and comprehensively monitored and moderated. Our current testnet allows this
          content monitoring to take place...
        </TextMedium>
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
    </>
  )
})

const OpeningModalTitle = styled.h4`
  margin-bottom: 8px;
`
