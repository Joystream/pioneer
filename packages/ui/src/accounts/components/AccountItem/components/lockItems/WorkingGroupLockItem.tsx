import React, { useMemo } from 'react'
import { generatePath } from 'react-router-dom'

import { asBlock } from '@/common/types'
import { WorkingGroupsRoutes } from '@/working-groups/constants'
import { useOpening } from '@/working-groups/hooks/useOpening'
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

  const { opening } = useOpening(application?.opening.id ?? '-1')

  const recoveryTime = useMemo(() => {
    if (opening?.status === 'OpeningStatusOpen') {
      return { unrecoverableLabel: 'Automatically recovered after withdrawing from application' }
    } else {
      if (application?.status.__typename === 'ApplicationStatusAccepted') {
        return { unrecoverableLabel: 'Automatically recovered after being released from role' }
      }
      return
    }
  }, [opening?.status, application?.status.__typename])

  const openingId = application?.opening.id
  const goToOpeningButton = useMemo(() => {
    if (!openingId) {
      return null
    }
    const openingPath = generatePath(WorkingGroupsRoutes.myApplications)
    return <LockLinkButton label="Show Openings" to={openingPath} />
  }, [openingId])

  return (
    <LockItem
      lock={lock}
      address={address}
      isRecoverable={isRecoverable}
      createdInEvent={createdInEvent}
      lockRecovery={recoveryTime}
      linkButtons={goToOpeningButton}
    />
  )
}
