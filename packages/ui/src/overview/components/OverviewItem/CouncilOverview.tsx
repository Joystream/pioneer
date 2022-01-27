import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'

import { ArrowRightLinkIcon } from '@/common/components/icons'
import { formatDuration } from '@/common/components/statistics/BlockDurationStatistics'
import { TextMedium } from '@/common/components/typography'
import { DurationValue } from '@/common/components/typography/DurationValue'
import { BorderRad, Colors } from '@/common/constants'
import { CouncilRoutes } from '@/council/constants'
import { useCouncilConstants } from '@/council/hooks/useCouncilConstants'
import { useCurrentElection } from '@/council/hooks/useCurrentElection'
import { useElectionStage } from '@/council/hooks/useElectionStage'

import { CouncilAnnouncingTiles, CouncilNormalTiles, CouncilRevealingTiles } from './CouncilTilesList'
import { OverviewInfoElement } from './OverviewInfoElement'

export const CouncilOverview = () => {
  const { t } = useTranslation('overview')
  const history = useHistory()
  const constants = useCouncilConstants()
  const { stage } = useElectionStage()
  const { election } = useCurrentElection()

  const councilSize = constants?.size ?? 0
  const periodLength = constants?.idlePeriod
  const round = election?.cycleId

  const nextElectionIn = useMemo(() => <DurationValue value={formatDuration(periodLength ?? 0)} />, [periodLength])

  const scroller = useMemo(() => {
    switch (stage) {
      case 'inactive':
      default:
        return <CouncilNormalTiles />
      case 'announcing':
      case 'voting':
        return election ? <CouncilAnnouncingTiles election={election} /> : null
      case 'revealing':
        return election ? <CouncilRevealingTiles election={election} /> : null
    }
  }, [stage])

  return (
    <Wrapper>
      <Upper>
        <Title black bold>
          {t('council.title')}
        </Title>
        <ArrowRight onClick={() => history.push(CouncilRoutes.council)} />
        <InfoElementsWrapper>
          <OverviewInfoElement value={councilSize} label="Council members" />
          <OverviewInfoElement value={stage} label="Stage" />
          {round && <OverviewInfoElement value={`#${round}`} label="Round" />}
          <OverviewInfoElement value={nextElectionIn} label="Next stage in" />
        </InfoElementsWrapper>
      </Upper>
      {scroller}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  border: 1px solid ${Colors.Black[200]};
  border-radius: ${BorderRad.s};
`

const Upper = styled.div`
  padding: 18px 18px 0;
`

const Title = styled(TextMedium)`
  margin-bottom: 25px;
`

const ArrowRight = styled(ArrowRightLinkIcon)`
  position: absolute;
  top: 24px;
  right: 18px;
  cursor: pointer;
`

const InfoElementsWrapper = styled.div`
  display: flex;
  column-gap: 50px;
`
