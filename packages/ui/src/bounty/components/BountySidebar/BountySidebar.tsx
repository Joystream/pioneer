import { BountyActorItem, BountyPeriod, EntrantResult } from '@/bounty/types/Bounty'
import React from 'react'
import BN from 'bn.js'
import { Periods } from './Periods'
import { BountyActorsList } from '../BountyActorsList/BountyActorsList'

interface PeriodsLengthsType {
  fundingPeriodLength?: BN
  workPeriodLength: BN
  judgingPeriodLength: BN
}

export interface BountySidebarProps {
  contributors: BountyActorItem[]
  entrants: BountyActorItem[]
  withdrawns: BountyActorItem[]
  entrantResult?: EntrantResult
  stage: BountyPeriod
  periodsLengths: PeriodsLengthsType
}

export const BountySidebar = ({
  contributors,
  entrants,
  withdrawns,
  entrantResult,
  stage,
  periodsLengths
}: BountySidebarProps) => {
  return (
    <>
    {entrants && <BountyActorsList title="ENTRANTS" elements={entrants} entrantResult={entrantResult} />}
    {withdrawns && <BountyActorsList title="WITHDRAWN" elements={withdrawns} />}
    {contributors && <BountyActorsList title="CONTRIBUTORS" elements={contributors} open={stage === 'funding'} />}
    <Periods stage={stage} {...periodsLengths} />
    </>
  )
}