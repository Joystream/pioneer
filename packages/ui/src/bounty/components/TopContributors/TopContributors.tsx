import faker from 'faker'
import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

import { useBountyContributions } from '@/bounty/hooks/useBountyContributions'
import { HorizontalScroller } from '@/common/components/HorizontalScroller/HorizontalScroller'
import { CommunityTile } from '@/common/components/icons/CommunityTile'
import { Loading } from '@/common/components/Loading'
import { StatisticItem } from '@/common/components/statistics'
import { TextBig, TextExtraHuge, TextSmall, TokenValue } from '@/common/components/typography'
import { BorderRad, Colors } from '@/common/constants'
import { MemberInfo } from '@/memberships/components'

const WEEK_AGO = faker.date.recent(7)

export const TopContributors = () => {
  const { contributions, isLoading } = useBountyContributions({
    order: { orderKey: 'amount', isDescending: true },
    filters: { createdAfter: WEEK_AGO },
  })
  const { t } = useTranslation('bounty')

  const tiles = useMemo(() => {
    if (contributions.length) {
      return contributions.map((contribution, index) => (
        <StyledTile>
          {contribution.contributor && <MemberInfo member={contribution.contributor} size="s" hideGroup onlyTop />}
          <ValueWrapper>
            <TextSmall>Contributed</TextSmall>
            <TokenValue size="l" value={contribution.amount} />
          </ValueWrapper>
          <TileNumber>{index + 1}</TileNumber>
        </StyledTile>
      ))
    }

    if (isLoading) {
      return <Loading />
    }

    return (
      <EmptyStateWrapper>
        <CommunityTile />
        <div>
          <TextExtraHuge bold>{t('topContributors.notFound')}</TextExtraHuge>
          <TextBig>{t('topContributors.notFoundText')}</TextBig>
        </div>
      </EmptyStateWrapper>
    )
  }, [contributions])

  return <HorizontalScroller items={tiles} title={t('topContributors.title')} />
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
  min-width: 280px;
  max-width: 280px;
  position: relative;
`

const ValueWrapper = styled.div`
  display: flex;
  column-gap: 5px;
  align-items: center;
  justify-content: space-between;
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
