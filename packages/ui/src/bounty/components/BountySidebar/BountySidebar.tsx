import BN from 'bn.js'
import React, { memo } from 'react'
import { useTranslation } from 'react-i18next'

import { BountyPeriod, Contributor, Entrant, EntrantResult, Withdrawn } from '@/bounty/types/Bounty'

import { BountyActorsList } from '../BountyActorsList/BountyActorsList'

import { Periods } from './Periods'

interface PeriodsLengthsType {
  fundingPeriodLength?: BN
  workPeriodLength: BN
  judgingPeriodLength: BN
}

export interface BountySidebarProps {
  contributors?: Contributor[]
  entrants?: Entrant[]
  withdrawns?: Withdrawn[]
  entrantResult?: EntrantResult
  stage: BountyPeriod
  periodsLengths: PeriodsLengthsType
}

export const BountySidebar = memo(
  ({ contributors, entrants, withdrawns, entrantResult, stage, periodsLengths }: BountySidebarProps) => {
    const { t } = useTranslation('bounty')

    return (
      <>
        {entrants && (
          <BountyActorsList title={t('sidebar.entrants')} elements={entrants} entrantResult={entrantResult} />
        )}
        {withdrawns && <BountyActorsList title={t('sidebar.withdrawals')} elements={withdrawns} />}
        {contributors && (
          <BountyActorsList title={t('sidebar.contributors')} elements={contributors} open={stage === 'funding'} />
        )}
        <Periods stage={stage} {...periodsLengths} />
      </>
    )
  }
)
