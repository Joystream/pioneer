import React, { useMemo } from 'react'
import { generatePath } from 'react-router-dom'

import { LinkSymbol } from '@/common/components/icons/symbols'
import { TooltipExternalLink } from '@/common/components/Tooltip'
import { TextMedium } from '@/common/components/typography'
import { asBlock } from '@/common/types'
import { WorkingGroupsRoutes } from '@/working-groups/constants'
import { useOpening } from '@/working-groups/hooks/useOpening'
import { useGetWorkingGroupApplicationsQuery } from '@/working-groups/queries'

import { LockItem } from '../LockItem'
import { LockLinkButton } from '../LockLinkButton'
import { LockDetailsProps } from '../types'

export const WorkingGroupLockItem = ({ lock, address }: LockDetailsProps) => {
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
      return { unrecoverableLabel: 'Recoverable after withdrawing from application' }
    } else {
      if (application?.status.__typename === 'ApplicationStatusAccepted') {
        return { unrecoverableLabel: 'Recoverable after released from role' }
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
      isRecoverable={false}
      createdInEvent={createdInEvent}
      lockRecovery={{
        ...recoveryTime,
        tooltipLabel: (
          <>
            Stake for WG role application and active role participation as worker or lead will be recovered at the time
            of:
            <br /> For application - at the time of withdrawal.
            <br />
            For active role - after leaving the role and elapsed leaving unstaking period.
            <br />
            <TooltipExternalLink
              href="https://joystream.gitbook.io/testnet-workspace/system/working-groups#concepts"
              target="_blank"
            >
              <TextMedium>More details</TextMedium> <LinkSymbol />
            </TooltipExternalLink>
          </>
        ),
      }}
      linkButtons={goToOpeningButton}
    />
  )
}
