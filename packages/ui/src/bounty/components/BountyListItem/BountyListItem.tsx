import React, { memo } from 'react'
import { generatePath, useHistory } from 'react-router-dom'
import styled from 'styled-components'

import BrokenImg from '@/app/assets/images/BrokenImg.png'
import DefaultImg from '@/app/assets/images/DefaultImg.png'
import { BountyDetails } from '@/bounty/components/BountyListItem/BountyDetails'
import { BountyInformation } from '@/bounty/components/BountyListItem/BountyInformation'
import { BountyRoutes } from '@/bounty/constants'
import { BountyPeriodColorMapper } from '@/bounty/helpers'
import { Bounty } from '@/bounty/types/Bounty'
import { asPeriod } from '@/bounty/types/casts'
import { BadgeStatus } from '@/common/components/BadgeStatus'
import { Arrow } from '@/common/components/icons'
import { BorderRad, Colors } from '@/common/constants'

export const BountyListItem = memo(
  ({
    id,
    title,
    cherry,
    entrantStake,
    creator,
    oracle,
    fundingType,
    periodTimeLeft,
    stage,
    totalFunding,
    entries,
    isTerminated,
    imageUri,
  }: Bounty) => {
    const history = useHistory()

    const period = asPeriod(stage)

    const periodStatus = period === 'failed' || period === 'successful' || period === 'terminated'
    return (
      <Wrapper isTerminated={isTerminated} onClick={() => history.push(generatePath(BountyRoutes.bounty, { id }))}>
        <BountyImage
          src={imageUri || DefaultImg}
          onError={(e) => (
            ((e.target as HTMLImageElement).src = BrokenImg), ((e.target as HTMLImageElement).onerror = () => undefined)
          )}
        />
        <Info>
          <BountyInformation timeToEnd={periodTimeLeft} creator={creator} title={title} />
          <BountyDetails
            type={period}
            oracle={oracle}
            cherry={cherry}
            fundingType={fundingType}
            totalFunding={totalFunding}
            entrantStake={entrantStake}
            entries={entries}
          />
        </Info>
        <ArrowWrapper>
          <Arrow direction="right" />
        </ArrowWrapper>
        <TypeBadge color={BountyPeriodColorMapper[period]}>
          {period.toUpperCase()}
          {!periodStatus ? ' PERIOD' : null}
        </TypeBadge>
      </Wrapper>
    )
  }
)

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

const Wrapper = styled.div<{ isTerminated?: boolean }>`
  width: 100%;
  height: 180px;
  border: 1px solid ${Colors.Black[100]};
  border-radius: ${BorderRad.s};
  display: flex;
  flex-wrap: nowrap;
  position: relative;
  cursor: pointer;
  background-color: ${(props) => (props.isTerminated ? Colors.Black[50] : null)};
`

const BountyImage = styled.img`
  object-fit: cover;
  height: 100%;
  width: 260px;
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
