import BN from 'bn.js'
import React from 'react'
import styled from 'styled-components'

import { BadgeViolet } from '../../common/components/BadgeViolet'
import { TokenValue } from '../../common/components/typography'
import { BorderRad, Colors, Transitions } from '../../common/constants'

export interface WorkingGroupOpening {
  id: string
  duration: [number, string]
  title: string
  type: 'LEADER' | 'REGULAR'
  reward: {
    value: BN
    interval: number
  }
  applicants: {
    current: number
    total: number
  }
  hiring: {
    current: number
    total: number
  }
}

interface OpeningsListProps {
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

export const Opening = ({ opening }: { opening: WorkingGroupOpening }) => {
  return (
    <>
      <div>id: {opening.id}</div>
      <div>
        Duration: {opening.duration[0]} - {opening.duration[1]}
      </div>
      {opening.type === 'LEADER' ? <BadgeViolet>LEAD</BadgeViolet> : null}
      <div>id: {opening.title}</div>
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
    </>
  )
}

export const List = styled.ul`
  display: flex;
  flex-direction: column;
  width: 100%;
`
export const ListItem = styled.li`
  display: grid;
  grid-template-columns: 1fr 1fr 16px;
  grid-column-gap: 24px;
  padding: 16px;
  border: 1px solid ${Colors.Black[100]};
  border-radius: ${BorderRad.s};
  background-color: ${Colors.White};
  transition: ${Transitions.all};

  & + & {
    margin-top: -1px;
  }
`
