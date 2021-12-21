import BN from 'bn.js'
import React, { memo } from 'react'

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
    return (
      <>
        {entrants && <BountyActorsList title="ENTRANTS" elements={entrants} entrantResult={entrantResult} />}
        {withdrawns && <BountyActorsList title="WITHDRAWN" elements={withdrawns} />}
        {contributors && <BountyActorsList title="CONTRIBUTORS" elements={contributors} open={stage === 'funding'} />}
        <Periods stage={stage} {...periodsLengths} />
      </>
    )
  }
)
