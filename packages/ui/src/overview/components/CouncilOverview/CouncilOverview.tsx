import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { formatDuration } from '@/common/components/statistics/BlockDurationStatistics'
import { DurationValue } from '@/common/components/typography/DurationValue'
import { CouncilRoutes } from '@/council/constants'
import { useCouncilConstants } from '@/council/hooks/useCouncilConstants'
import { useCurrentElection } from '@/council/hooks/useCurrentElection'
import { useElectionStage } from '@/council/hooks/useElectionStage'
import { OverviewInfoElement } from '@/overview/components/OverviewInfoElement'
import { OverviewWrapper } from '@/overview/components/OverviewWrapper'

import { CouncilAnnouncingTiles, CouncilNormalTiles, CouncilRevealingTiles } from './CouncilTilesList'

export const CouncilOverview = () => {
  const { t } = useTranslation('overview')
  const constants = useCouncilConstants()
  const { stage } = useElectionStage()
  const { election, isLoading: electionLoading } = useCurrentElection()

  const councilSize = constants?.size ?? 0
  const periodLength = constants?.idlePeriod
  const round = election?.cycleId

  const nextElectionIn = useMemo(() => <DurationValue value={formatDuration(periodLength ?? 0)} />, [periodLength])

  const stageLabel = useMemo(() => {
    switch (stage) {
      case 'inactive':
      default:
        return t('council.stage.normal')
      case 'announcing':
      case 'voting':
        return t('council.stage.announcing')
      case 'revealing':
        return t('council.stage.revealing')
    }
  }, [stage])

  const infoElements = useMemo(
    () => (
      <>
        <OverviewInfoElement value={councilSize} label="Council members" />
        <OverviewInfoElement value={stageLabel} label={t('council.stage.label')} />
        {typeof round !== 'undefined' && <OverviewInfoElement value={`#${round}`} label={t('council.round')} />}
        <OverviewInfoElement value={nextElectionIn} label={t('council.nextElectionIn')} isLoading={electionLoading} />
      </>
    ),
    [councilSize, stageLabel, round, nextElectionIn, electionLoading]
  )

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
  }, [stage, election])

  return (
    <OverviewWrapper
      title={t('council.title')}
      linkPath={CouncilRoutes.council}
      infoElements={infoElements}
      scroller={scroller}
    />
  )
}
