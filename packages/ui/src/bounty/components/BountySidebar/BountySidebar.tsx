import BN from 'bn.js'
import React, { memo } from 'react'
import { useTranslation } from 'react-i18next'

import { BountyPeriod, Contributor, Entrant, EntrantResult, Withdrawn } from '@/bounty/types/Bounty'

import { BountyActorsList } from '../BountyActorsList/BountyActorsList'

import { Periods } from './Periods'

interface PeriodsLengthsType {
  fundingPeriodLength?: number
  workPeriodLength: number
  judgingPeriodLength: number
}

export interface BountySidebarProps {
  contributors?: Contributor[]
  entrants?: Entrant[]
  withdrawals?: Withdrawn[]
  entrantResult?: EntrantResult
  stage: BountyPeriod
  periodsLengths: PeriodsLengthsType
  hidePeriods?: boolean
}

export const BountySidebar = memo(
  ({
    contributors,
    entrants,
    withdrawals,
    entrantResult,
    stage,
    periodsLengths,
    hidePeriods = false,
  }: BountySidebarProps) => {
    const { t } = useTranslation('bounty')

    return (
      <>
        {entrants && (
          <BountyActorsList title={t('sidebar.entrants')} elements={entrants} entrantResult={entrantResult} />
        )}
        {withdrawals && <BountyActorsList title={t('sidebar.withdrawals')} elements={withdrawals} />}
        {contributors && (
          <BountyActorsList title={t('sidebar.contributors')} elements={contributors} open={stage === 'funding'} />
        )}
        {!hidePeriods && <Periods stage={stage} {...periodsLengths} />}
      </>
    )
  }
)
