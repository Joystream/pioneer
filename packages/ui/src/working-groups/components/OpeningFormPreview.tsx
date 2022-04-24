import React, { useState } from 'react'
import styled from 'styled-components'

import { BadgesRow, BadgeStatus } from '@/common/components/BadgeStatus'
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

import { useRewardPeriod } from '../hooks/useRewardPeriod'
import { WorkingGroupOpening } from '../types'

export type OpeningFormPreviewProps = { opening: WorkingGroupOpening }

export const OpeningFormPreview = React.memo(({ opening }: OpeningFormPreviewProps) => {
  const [isMarkdownCollapsed, setMarkdownCollapsed] = useState(true)
  const rewardPeriod = useRewardPeriod(opening.groupId)
  return (
    <RowGapBlock gap={24}>
      <BadgesRow space={8}>
        <BadgeStatus inverted size="l">
          {opening.groupName}
        </BadgeStatus>
        <BadgeStatus inverted size="l">
          {opening.type}
        </BadgeStatus>
      </BadgesRow>
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
          <Fraction numerator={opening.hiring.limit} denominator={opening.hiring.current} />
        </RowGapBlock>
      </Row>
      <Row>
        <RowGapBlock gap={4}>
          <Label>Reward</Label>
          <TextMedium lighter>
            <TextInlineHuge>
              <TokenValue value={rewardPeriod?.mul(opening.rewardPerBlock)} />
            </TextInlineHuge>{' '}
            per {rewardPeriod?.toString()} blocks
          </TextMedium>
        </RowGapBlock>
      </Row>
      <Row>
        <RowGapBlock gap={4}>
          <Label>Stake required</Label>
          <TextInlineHuge>
            <TokenValue value={opening.stake} />
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
