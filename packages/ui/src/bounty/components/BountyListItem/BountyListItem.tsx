import React, { useMemo, memo } from 'react'
import { generatePath, useHistory } from 'react-router-dom'
import styled from 'styled-components'

import { BountyDetails } from '@/bounty/components/BountyListItem/BountyDetails'
import { BountyInformations } from '@/bounty/components/BountyListItem/BountyInformations'
import { BountyRoutes } from '@/bounty/constants'
import { BountyPeriodColorMapper } from '@/bounty/helpers'
import { Bounty, isFundingLimited } from '@/bounty/types/Bounty'
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
    workPeriod,
    judgingPeriod,
    stage,
    totalFunding,
    entries,
  }: Bounty) => {
    const history = useHistory()

    const period = asPeriod(stage)

    const timeToPeriodEnd = useMemo(() => {
      if (period === 'funding' && isFundingLimited(fundingType)) {
        return fundingType.maxPeriod
      }
      if (period === 'working') {
        return workPeriod
      }
      if (period === 'judgement') {
        return judgingPeriod
      }
    }, [period, fundingType])

    return (
      <Wrapper>
        {/* TODO: add image url to schema */}
        <BountyImage src="https://picsum.photos/500/300" />
        <Info>
          <BountyInformations timeToEnd={timeToPeriodEnd} creator={creator} title={title} />
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
        <ArrowWrapper onClick={() => history.push(generatePath(BountyRoutes.bounty, { id }))}>
          <Arrow direction="right" />
        </ArrowWrapper>

        <TypeBadge color={BountyPeriodColorMapper[period]}>{`${period.toUpperCase()} PERIOD`}</TypeBadge>
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
