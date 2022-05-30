import faker from 'faker'
import React, { useCallback, useMemo } from 'react'
import { generatePath, useHistory } from 'react-router-dom'

import { BountyRoutes } from '@/bounty/constants'
import { useGetLatestBountyEntryQuery } from '@/bounty/queries'
import { asBlock } from '@/common/types'

import { LockItem } from '../LockItem'
import { LockLinkButton } from '../LockLinkButton'
import { LockItemProps } from '../types'

export const BountyLockItem = ({ lock, address, isRecoverable }: LockItemProps) => {
  const { push } = useHistory()

  const { data } = useGetLatestBountyEntryQuery({ variables: { lockAccount: address } })
  const entry = data?.bountyEntries[0]
  const eventData = entry?.announcedInEvent
  const createdInEvent = eventData && asBlock(eventData)

  const recoveryTime = faker.date.soon(1).toISOString()

  const bountyId = entry?.bountyId
  const goToBounty = useCallback(() => {
    if (!bountyId) {
      return null
    }
    return push(generatePath(BountyRoutes.bounty, { id: bountyId }))
  }, [bountyId])

  const linkButton = useMemo(() => <LockLinkButton label="Show Bounty" onClick={goToBounty} />, [goToBounty])

  return (
    <LockItem
      lock={lock}
      address={address}
      isRecoverable={isRecoverable}
      createdInEvent={createdInEvent}
      recoveryTime={recoveryTime}
      linkButtons={linkButton}
    />
  )
}
