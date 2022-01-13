import React, { useMemo } from 'react'
import styled from 'styled-components'

import { HorizontalScroller } from '@/common/components/HorizontalScroller/HorizontalScroller'
import { CommunityTile } from '@/common/components/icons/CommunityTile'
import { StatisticItem } from '@/common/components/statistics'
import { TextBig, TextExtraHuge, TextSmall, TokenValue } from '@/common/components/typography'
import { BorderRad, Colors } from '@/common/constants'
import { MemberInfo } from '@/memberships/components'
import { BountyContribution } from '@/bounty/types/Bounty'

interface TopContributorsProps {
  contributions: BountyContribution[]
}

export const TopContributors = ({ contributions }: TopContributorsProps) => {
  const tiles = useMemo(() => {
    if (contributions.length) {
      return contributions.map((el, index) => (
        <StyledTile>
          {el.contributor && <MemberInfo member={el.contributor} size="s" hideGroup onlyTop />}
          <ValueWrapper>
            <TextSmall>Contributed</TextSmall>
            <TokenValue size="l" value={el.amount} />
          </ValueWrapper>
          <TileNumber>{index + 1}</TileNumber>
        </StyledTile>
      ))
    } else {
      return (
        <EmptyStateWrapper>
          <CommunityTile />
          <div>
            <TextExtraHuge bold>No contributors</TextExtraHuge>
            <TextBig>Lorem ipsum dolor sit amet enim</TextBig>
          </div>
        </EmptyStateWrapper>
      )
    }
  }, [contributions])

  return <HorizontalScroller items={tiles} title="Top contributors past week" />
}

const EmptyStateWrapper = styled.div`
  display: flex;
  column-gap: 24px;
  margin: 0 auto;

  > div {
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    ${TextBig} {
      color: ${Colors.Black[500]};
    }
  }
`

const StyledTile = styled(StatisticItem)`
  min-width: 200px;
  max-width: 200px;
  position: relative;
`

const ValueWrapper = styled.div`
  display: flex;
  column-gap: 5px;
  align-items: center;
  margin-top: 10px;

  ${TextSmall} {
    color: ${Colors.Black[500]};
  }
`

const TileNumber = styled.div`
  position: absolute;
  top: 2px;
  left: 2px;
  padding: 2px 6px;
  height: min-content;
  width: min-content;
  display: grid;
  place-items: center;
  color: ${Colors.White};
  font-weight: 700;
  font-size: 10px;
  background-color: ${Colors.Black[300]};
  border-radius: ${BorderRad.full};
`
