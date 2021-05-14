import React from 'react'
import styled from 'styled-components'

import { BadgeViolet } from '@/common/components/BadgeViolet'
import { PercentageChart } from '@/common/components/charts/PercentageChart'
import { Link } from '@/common/components/Link'
import { MarkdownPreview } from '@/common/components/MarkdownPreview/MarkdownPreview'
import { Row } from '@/common/components/Modal'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { Label, TextInlineHuge, TextMedium, TextSmall, TokenValue } from '@/common/components/typography'
import { Fraction } from '@/common/components/typography/Fraction'
import { formatDateString } from '@/common/model/formatters'
import { relativeTime } from '@/common/model/relativeTime'
import { BadgeViolet } from '../../common/components/BadgeViolet'
import { Link } from '../../common/components/Link'
import { MarkdownPreview } from '../../common/components/MarkdownPreview/MarkdownPreview'
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
          <MarkdownPreview markdown={opening.description} />
        </RowGapBlock>
      </Row>
      <Row>
        <Link href="http://example.com/" size="l" dark>
          Show more
        </Link>
      </Row>
      <Row>
        <RowGapBlock gap={4}>
          <TimeLeftWrap>
            <Row>
              <Label>Time left</Label>
              {relativeTime(opening.expectedEnding)}
            </Row>
            <PercentageChart percentage={70} />
          </TimeLeftWrap>
          <TextSmall>Created at {formatDateString(opening.createdAtBlock.timestamp)}</TextSmall>
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

const TimeLeftWrap = styled.div`
  display: grid;
  grid-template-columns: 1fr 40px;
`
