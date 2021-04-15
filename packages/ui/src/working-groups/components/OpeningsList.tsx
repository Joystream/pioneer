import React from 'react'
import styled from 'styled-components'

import { BadgeViolet } from '../../common/components/BadgeViolet'
import { ButtonGhost } from '../../common/components/buttons'
import { List, ListItem } from '../../common/components/List'
import { StatisticItem, Statistics } from '../../common/components/statistics'
import { ToggleableItem } from '../../common/components/ToggleableItem'
import { TextBig, TextSmall, TokenValue } from '../../common/components/typography'
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
    <div>id: {opening.id}</div>
    <div>Ends in {relativeTime(opening.expectedEnding)}</div>
    {opening.type === 'LEADER' ? <BadgeViolet>LEAD</BadgeViolet> : null}
    <h4>{opening.title}</h4>
    <div>
      <TokenValue value={opening.reward.value} />
      <br />
      Reward per {opening.reward.interval} blocks.
    </div>
    <div>
      {opening.applicants.current} / {opening.applicants.total} Applications
    </div>
    <div>
      {opening.hiring.current} / {opening.hiring.total} Hiring
    </div>
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
  grid-template-columns: 1fr 1fr 16px;
  grid-column-gap: 24px;
  padding: 16px;
`
