import React from 'react'
import styled from 'styled-components'

import { BadgeViolet } from '../../common/components/BadgeViolet'
import { ButtonGhost } from '../../common/components/buttons'
import { List, ListItem } from '../../common/components/List'
import { StatisticItem, Statistics } from '../../common/components/statistics'
import { ToggleableItem } from '../../common/components/ToggleableItem'
import { TextBig, TextInlineBig, TextSmall, TokenValue } from '../../common/components/typography'
import { Subscription } from '../../common/components/typography/Subscription'
import { Overflow } from '../../common/constants'
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
        <TokenValue value={opening.reward.value} />
        <OpeningSubscriptionWide>Reward per {opening.reward.interval} blocks.</OpeningSubscriptionWide>
      </OpenItemSummaryColumn>
      <OpenItemSummaryColumn>
        <TextInlineBig light>
          <TextInlineBig dark bold>
            {opening.applicants.current}
          </TextInlineBig>
          /{opening.applicants.total}
        </TextInlineBig>
        <Subscription>Applications</Subscription>
      </OpenItemSummaryColumn>
      <OpenItemSummaryColumn>
        <TextInlineBig light>
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
    <div>
      <div>Ends in {relativeTime(opening.expectedEnding)}</div>
      <h4>{opening.title}</h4>
      <div>"Lorem ipsum... "</div>
      <Statistics>
        <StatisticItem>
          <TokenValue value={opening.reward.value} />
          <TextSmall>Reward per {opening.reward.interval} blocks</TextSmall>
        </StatisticItem>
        <StatisticItem>
          <TextBig>{opening.applicants.total}</TextBig>
          <TextSmall>Applicant limit</TextSmall>
          <TextBig>{opening.hiring.total}</TextBig>
          <TextSmall>Target no of Hires</TextSmall>
        </StatisticItem>
        <StatisticItem>
          <TokenValue value={opening.reward.value} />
          <TextSmall>Minimum Stake Required</TextSmall>
        </StatisticItem>
      </Statistics>
      <ButtonGhost>Learn more</ButtonGhost>
      {/* No Notify me when... button for now */}
    </div>
  )
}

const OpeningWrap = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  grid-column-gap: 24px;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 94px;
  padding: 16px 20px 16px 16px;
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

const OpenItemSummaryColumn = styled.div`
  display: grid;
  grid-template-rows: 26px 24px;
  grid-row-gap: 4px;
  align-items: center;
`

const OpeningSubscriptionWide = styled(Subscription)`
  min-width: 136px;
`
