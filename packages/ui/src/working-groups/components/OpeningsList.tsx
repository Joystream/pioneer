import React from 'react'
import styled from 'styled-components'

import { BadgeViolet } from '../../common/components/BadgeViolet'
import { ButtonGhost, ButtonsGroup } from '../../common/components/buttons'
import { ArrowDownIcon } from '../../common/components/icons'
import { List, ListItem } from '../../common/components/List'
import {
  StatiscticContentColumn,
  Statistics,
  StatsBlock,
  TwoColumnsStatistic,
} from '../../common/components/statistics'
import { ToggleableItem } from '../../common/components/ToggleableItem'
import { TextBig, TextInlineBig, TokenValue } from '../../common/components/typography'
import { Subscription } from '../../common/components/typography/Subscription'
import { Colors, Overflow } from '../../common/constants'
import { relativeTime } from '../../common/model/relativeTime'
import { WorkingGroupOpening } from '../types'

export interface OpeningsListProps {
  openings: WorkingGroupOpening[]
}

export const OpeningsList = ({ openings }: OpeningsListProps) => (
  <List>
    {openings.map((opening) => (
      <ListItem key={opening.id}>
        <ToggleableItem inlineOpenToggle>
          {(isOpen) => (isOpen ? <OpeningDetails opening={opening} /> : <OpeningListItem opening={opening} />)}
        </ToggleableItem>
      </ListItem>
    ))}
  </List>
)

type Props = { opening: WorkingGroupOpening }

const OpeningListItem = ({ opening }: Props) => (
  <OpeningWrap>
    <OpeningItemInfo>
      <OpeningItemInfoTop>
        <Subscription>ID: {opening.id}</Subscription>
        <Subscription>Ends {relativeTime(opening.expectedEnding)}</Subscription>
        {opening.type === 'LEADER' ? <BadgeViolet>LEAD</BadgeViolet> : null}
      </OpeningItemInfoTop>
      <OpeningItemTitle>{opening.title}</OpeningItemTitle>
    </OpeningItemInfo>
    <OpeningItemSummary>
      <OpenItemSummaryColumn>
        <TextInlineBig>
          <TokenValue value={opening.reward.value} />
        </TextInlineBig>
        <OpeningSubscriptionWide>Reward per {opening.reward.interval} blocks.</OpeningSubscriptionWide>
      </OpenItemSummaryColumn>
      <OpenItemSummaryColumn>
        <TextInlineBig lighter>
          <TextInlineBig dark bold>
            {opening.applicants.current}
          </TextInlineBig>
          /{opening.applicants.total}
        </TextInlineBig>
        <Subscription>Applications</Subscription>
      </OpenItemSummaryColumn>
      <OpenItemSummaryColumn>
        <TextInlineBig lighter>
          <TextInlineBig dark bold>
            {opening.hiring.current}
          </TextInlineBig>
          /{opening.hiring.total}
        </TextInlineBig>
        <Subscription>Hiring</Subscription>
      </OpenItemSummaryColumn>
    </OpeningItemSummary>
  </OpeningWrap>
)

const OpeningDetails = ({ opening }: Props) => {
  return (
    <OpenedWrapper>
      <OpenedTop>
        <Subscription>Ends {relativeTime(opening.expectedEnding)}</Subscription>
        <OpenedItemTitle>{opening.title}</OpenedItemTitle>
      </OpenedTop>
      <TextBig light>
        Content Curators will one day be essential for ensuring that the petabytes of media items uploaded to Joystream
        are format...
      </TextBig>
      <Statistics withMargin>
        <StatsBlock size="m" centered spacing="s">
          <TextBig>
            <TokenValue value={opening.reward.value} />
          </TextBig>
          <Subscription>Reward per {opening.reward.interval} blocks</Subscription>
        </StatsBlock>
        <StatsBlock size="m" centered spacing="s">
          <TwoColumnsStatistic>
            <StatiscticContentColumn>
              <TextBig value bold>
                {opening.applicants.total}
              </TextBig>
              <Subscription>Applicant limit</Subscription>
            </StatiscticContentColumn>
            <StatiscticContentColumn>
              <TextBig value bold>
                {opening.hiring.total}
              </TextBig>
              <Subscription>Target no of Hires</Subscription>
            </StatiscticContentColumn>
          </TwoColumnsStatistic>
        </StatsBlock>
        <StatsBlock size="m" centered spacing="s">
          <TextBig>
            <TokenValue value={opening.reward.value} />
          </TextBig>
          <Subscription>Minimum Stake Required</Subscription>
        </StatsBlock>
      </Statistics>
      <ButtonsGroup align="right">
        <ButtonGhost size="medium">
          <ArrowDownIcon />
          Learn more
        </ButtonGhost>
      </ButtonsGroup>
    </OpenedWrapper>
  )
}

const OpeningWrap = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  grid-column-gap: 24px;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  min-height: 94px;
  padding: 16px 20px 16px 16px;
  background-color: ${Colors.White};
`

const OpenedWrapper = styled.div`
  display: grid;
  grid-row-gap: 16px;
  width: 100%;
  padding: 16px 20px 16px 16px;
  background-color: ${Colors.Black[50]};
`

const OpeningItemInfo = styled.div`
  display: grid;
  grid-template-rows: 26px 24px;
  grid-row-gap: 4px;
  width: 100%;
  max-width: 342px;
  align-items: center;
`

const OpeningItemInfoTop = styled.div`
  display: grid;
  grid-auto-flow: column;
  align-items: center;
  grid-column-gap: 16px;
  width: fit-content;
  max-width: 100%;
`

const OpeningItemSummary = styled.div`
  display: grid;
  grid-auto-flow: column;
  width: 100%;
  grid-column-gap: 40px;
`

const OpeningItemTitle = styled.h5`
  ${Overflow.Dots}
`

const OpenedItemTitle = styled.h4`
  ${Overflow.Dots}
`

const OpenItemSummaryColumn = styled.div`
  display: grid;
  grid-template-rows: 26px 24px;
  grid-row-gap: 4px;
  align-items: center;
`

const OpeningSubscriptionWide = styled(Subscription)`
  min-width: 136px;
`

const OpenedTop = styled.div`
  display: grid;
  grid-template-rows: 26px 28px;
  grid-row-gap: 8px;
  align-items: center;
`
