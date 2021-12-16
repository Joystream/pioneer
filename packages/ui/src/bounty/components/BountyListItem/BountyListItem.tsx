import React from 'react'
import styled from 'styled-components'

import { BountyDetails } from '@/bounty/components/BountyListItem/BountyDetails'
import { BountyInformations } from '@/bounty/components/BountyListItem/BountyInformations'
import { BountyPeriodColorMapper } from '@/bounty/helpers'
import { BountyPeriod } from '@/bounty/types/Bounty'
import { BadgeStatus } from '@/common/components/BadgeStatus'
import { Arrow } from '@/common/components/icons'
import { BorderRad, Colors } from '@/common/constants'

interface Props {
  period: BountyPeriod
  title: string
  creator: string
  date?: Date
  imageUrl: string
}

export const BountyListItem = ({ period, date, creator, title, imageUrl }: Props) => {
  return (
    <Wrapper>
      <BountyImage src={imageUrl} />
      <Info>
        <BountyInformations period={period} date={date} creator={creator} title={title} />
        <BountyDetails type={period} />
      </Info>
      <ArrowWrapper>
        <Arrow direction="right" />
      </ArrowWrapper>

      <TypeBadge color={BountyPeriodColorMapper[period]}>{period} PERIOD</TypeBadge>
    </Wrapper>
  )
}

const Info = styled.div`
  flex: 1;
  height: 100%;
  display: flex;
  flex-direction: column;
  margin-right: 20px;
`

const TypeBadge = styled(BadgeStatus)`
  position: absolute;
  top: 16px;
  left: 16px;
`

const Wrapper = styled.div`
  width: 100%;
  height: 180px;
  border: 1px solid ${Colors.Black[100]};
  border-radius: ${BorderRad.s};
  display: flex;
  flex-wrap: nowrap;
  position: relative;
`

const BountyImage = styled.img`
  object-fit: contain;
  height: 100%;
  margin-right: 25px;
  border-radius: ${BorderRad.s};
`

const ArrowWrapper = styled.div`
  cursor: pointer;
  height: 100%;
  display: flex;
  align-items: center;
  padding: 0 20px 0 10px;
`
