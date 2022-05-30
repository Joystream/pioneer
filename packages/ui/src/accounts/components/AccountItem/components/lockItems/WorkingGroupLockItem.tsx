import faker from 'faker'
import React, { useCallback, useMemo } from 'react'
import { generatePath, useHistory } from 'react-router-dom'

import { asBlock } from '@/common/types'
import { WorkingGroupsRoutes } from '@/working-groups/constants'
import { useGetWorkingGroupApplicationsQuery } from '@/working-groups/queries'

import { LockItem } from '../LockItem'
import { LockLinkButton } from '../LockLinkButton'
import { LockItemProps } from '../types'

export const WorkingGroupLockItem = ({ lock, address, isRecoverable }: LockItemProps) => {
  const { push } = useHistory()
  const { data } = useGetWorkingGroupApplicationsQuery({
    variables: {
      where: {
        stakingAccount_eq: address,
      },
    },
  })
  const application = data?.workingGroupApplications[0]
  const eventData = application?.createdInEvent
  const createdInEvent = eventData && asBlock(eventData)

  const recoveryTime = faker.date.soon(1).toISOString()

  const openingId = application?.opening.id
  const goToOpening = useCallback(() => {
    if (!openingId) {
      return null
    }
    return push(generatePath(WorkingGroupsRoutes.openingById, { id: openingId }))
  }, [openingId])

  const linkButton = useMemo(() => <LockLinkButton label="Show Opening" onClick={goToOpening} />, [goToOpening])

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
