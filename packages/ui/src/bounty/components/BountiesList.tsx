import React, { memo } from 'react'
import styled from 'styled-components'

import { CountBadge } from '@/common/components/CountBadge'
import { TextBig } from '@/common/components/typography'
import { NotFoundText } from '@/common/components/typography/NotFoundText'


import { BountyListItem } from './BountyListItem/BountyListItem'
import { Bounty } from '../types/Bounty'


interface Props {
  bounties: Bounty[]
}

export const BountiesList = memo(({ bounties }: Props) => {

  if (!bounties.length) {
    return <NotFoundText>No bounties matching search criteria</NotFoundText>
  }

  return (
    <div>
      <Title bold value>
        Bounties
        <Counter count={bounties.length} />
      </Title>
      {bounties.map((bounty) => {
        return <BountyListItem {...bounty} />
      })}
    </div>
  )
})

const Title = styled(TextBig)`
  margin-bottom: 24px;
  display: flex;
  align-items: center;
  width: fit-content;
`

const Counter = styled(CountBadge)`
  margin-left: 12px;
`
