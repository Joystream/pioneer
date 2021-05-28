import React, { useState } from 'react'
import styled from 'styled-components'

import { BadgeViolet } from '@/common/components/BadgeViolet'
import { ButtonLink } from '@/common/components/buttons'
import { PercentageChart } from '@/common/components/charts/PercentageChart'
import { MarkdownPreview } from '@/common/components/MarkdownPreview/MarkdownPreview'
import { MarkdownCollapsibleContainer } from '@/common/components/MarkdownPreview/MarkdownPreviewStyles'
import { Row } from '@/common/components/Modal'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { Label, TextInlineHuge, TextMedium, TextSmall, TokenValue } from '@/common/components/typography'
import { Fraction } from '@/common/components/typography/Fraction'
import { formatDateString } from '@/common/model/formatters'
import { percentTimeLeft } from '@/common/model/percentTimeLeft'
import { relativeTime } from '@/common/model/relativeTime'

import { WorkingGroupOpening } from '../types'

export type OpeningFormPreviewProps = { opening: WorkingGroupOpening }

export const OpeningFormPreview = React.memo(({ opening }: OpeningFormPreviewProps) => {
  const [isMarkdownCollapsed, setMarkdownCollapsed] = useState(true)
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
          <MarkdownCollapsibleContainer isCollapsed={isMarkdownCollapsed}>
            <MarkdownPreview markdown={opening.description} />
          </MarkdownCollapsibleContainer>
        </RowGapBlock>
      </Row>
      <Row>
        <ButtonLink onClick={() => setMarkdownCollapsed(!isMarkdownCollapsed)} size="small">
          Show {isMarkdownCollapsed ? 'more' : 'less'}
        </ButtonLink>
      </Row>
      <Row>
        <RowGapBlock gap={4}>
          <TimeLeftWrap>
            <Row>
              <Label>Time left</Label>
              {relativeTime(opening.expectedEnding)}
            </Row>
            <PercentageChart percentage={percentTimeLeft(opening.expectedEnding, opening.createdAtBlock.timestamp)} />
          </TimeLeftWrap>
          <TextSmall>Created: {formatDateString(opening.createdAtBlock.timestamp)}</TextSmall>
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
