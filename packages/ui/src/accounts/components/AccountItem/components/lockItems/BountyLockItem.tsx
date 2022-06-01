import faker from 'faker'
import React, { useMemo } from 'react'
import { generatePath } from 'react-router-dom'

import { BountyRoutes } from '@/bounty/constants'
import { useGetLatestBountyEntryQuery } from '@/bounty/queries'
import { MILLISECONDS_PER_BLOCK } from '@/common/model/formatters'
import { asBlock } from '@/common/types'

import { LockItem } from '../LockItem'
import { LockLinkButton } from '../LockLinkButton'
import { LockDetailsProps } from '../types'

export const BountyLockItem = ({ lock, address, isRecoverable }: LockDetailsProps) => {
  const { data } = useGetLatestBountyEntryQuery({ variables: { lockAccount: address } })
  const entry = data?.bountyEntries[0]
  const eventData = entry?.announcedInEvent
  const createdInEvent = eventData && asBlock(eventData)

  const bounty = entry?.bounty
  const fundingPeriodEnd = bounty?.maxFundingReachedEvent?.createdAt
  const workPeriod = bounty?.workPeriod
  const judgingPeriod = bounty?.judgingPeriod

  const recoveryTime = useMemo(() => {
    if (!workPeriod || !judgingPeriod) {
      return null
    }
    const fundindPeriodEndTime = new Date(fundingPeriodEnd).getTime()
    const durationTime = (workPeriod + judgingPeriod) * MILLISECONDS_PER_BLOCK
    const endDate = new Date(fundindPeriodEndTime + durationTime).toISOString()

    return endDate
  }, [fundingPeriodEnd, workPeriod, judgingPeriod])

  const bountyId = entry?.bountyId

  const goToBountyButton = useMemo(() => {
    if (!bountyId) {
      return null
    }
    const bountyPath = generatePath(BountyRoutes.bounty, { id: bountyId })
    return <LockLinkButton label="Show Bounty" to={bountyPath} />
  }, [bountyId])

  return (
    <LockItem
      lock={lock}
      address={address}
      isRecoverable={isRecoverable}
      createdInEvent={createdInEvent}
      recoveryTime={recoveryTime}
      linkButtons={goToBountyButton}
    />
  )
}
