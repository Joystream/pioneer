import React, { useMemo } from 'react'
import styled from 'styled-components'

import { HorizontalScroller } from '@/common/components/HorizontalScroller/HorizontalScroller'
import { StatisticItem } from '@/common/components/statistics'
import { TextSmall, TokenValue } from '@/common/components/typography'
import { BorderRad, Colors } from '@/common/constants'
import { MemberInfo } from '@/memberships/components'
import { Member } from '@/memberships/types'

interface Props {
  contributors: Member[]
}

export const TopContributors = ({ contributors }: Props) => {
  const tiles = useMemo(
    () =>
      contributors.map((member, index) => (
        <StyledTile>
          <MemberInfo member={member} size="s" hideGroup onlyTop />
          <ValueWrapper>
            <TextSmall>Contributed</TextSmall>
            <TokenValue size="l" value={10000} />
          </ValueWrapper>
          <TileNumber>{index + 1}</TileNumber>
        </StyledTile>
      )),
    [contributors]
  )

  return <HorizontalScroller items={tiles} />
}

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
