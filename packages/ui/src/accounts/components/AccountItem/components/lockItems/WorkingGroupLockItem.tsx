import React, { useMemo } from 'react'
import { generatePath } from 'react-router-dom'

import { asBlock } from '@/common/types'
import { WorkingGroupsRoutes } from '@/working-groups/constants'
import { useGetWorkingGroupApplicationsQuery } from '@/working-groups/queries'

import { LockItem } from '../LockItem'
import { LockLinkButton } from '../LockLinkButton'
import { LockDetailsProps } from '../types'

export const WorkingGroupLockItem = ({ lock, address, isRecoverable }: LockDetailsProps) => {
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

  const recoveryTime = application?.opening.metadata.expectedEnding

  const openingId = application?.opening.id
  const goToOpeningButton = useMemo(() => {
    if (!openingId) {
      return null
    }
    const openingPath = generatePath(WorkingGroupsRoutes.openingById, { id: openingId })
    return <LockLinkButton label="Show Opening" to={openingPath} />
  }, [openingId])

  return (
    <LockItem
      lock={lock}
      address={address}
      isRecoverable={isRecoverable}
      createdInEvent={createdInEvent}
      recoveryTime={recoveryTime}
      linkButtons={goToOpeningButton}
    />
  )
}
