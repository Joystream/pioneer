import React from 'react'
import styled from 'styled-components'

import { BadgeViolet } from '../../common/components/BadgeViolet'
import { List, ListItem } from '../../common/components/List'
import { TokenValue } from '../../common/components/typography'
import { relativeTime } from '../../common/model/relativeTime'
import { WorkingGroupOpening } from '../types'

export interface OpeningsListProps {
  openings: WorkingGroupOpening[]
}

export const OpeningsList = ({ openings }: OpeningsListProps) => (
  <List>
    {openings.map((opening) => (
      <ListItem key={opening.id}>
        <Opening opening={opening} />
      </ListItem>
    ))}
  </List>
)

const Opening = ({ opening }: { opening: WorkingGroupOpening }) => {
  return (
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
}

const OpeningWrap = styled.div`
  grid-template-columns: 1fr 1fr 16px;
  grid-column-gap: 24px;
  padding: 16px;
`
