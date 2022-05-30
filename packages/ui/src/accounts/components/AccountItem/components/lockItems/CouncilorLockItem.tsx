import faker from 'faker'
import React, { useCallback, useMemo } from 'react'
import { generatePath, useHistory } from 'react-router-dom'

import { asBlock } from '@/common/types'
import { CouncilRoutes } from '@/council/constants'
import { useGetCouncilorElectionEventQuery } from '@/council/queries'
import { useMember } from '@/memberships/hooks/useMembership'
import { useMyMemberships } from '@/memberships/hooks/useMyMemberships'

import { LockItem } from '../LockItem'
import { LockLinkButton } from '../LockLinkButton'
import { LockItemProps } from '../types'

export const CouncilorLockItem = ({ lock, address, isRecoverable }: LockItemProps) => {
  const { push } = useHistory()
  const {
    helpers: { getMemberIdByBoundAccountAddress },
  } = useMyMemberships()

  const memberId = useMemo(() => getMemberIdByBoundAccountAddress(address), [address])
  const { member } = useMember(memberId)
  const { data } = useGetCouncilorElectionEventQuery({ variables: { lockAccount: address } })
  const eventData = data?.memberships[0]?.councilMembers[0]?.electedInCouncil
  const createdInEvent =
    eventData &&
    asBlock({
      inBlock: eventData.electedAtBlock,
      createdAt: eventData.electedAtTime,
      network: eventData.electedAtNetwork,
    })

  const recoveryTime = faker.date.soon(1).toISOString()

  const councilId = eventData?.id
  const goToCouncil = useCallback(() => {
    if (member?.isCouncilMember) {
      return push(CouncilRoutes.council)
    }
    return push(generatePath(CouncilRoutes.pastCouncils, { id: councilId }))
  }, [councilId, member?.isCouncilMember])

  const linkButton = useMemo(() => <LockLinkButton label="Show Council" onClick={goToCouncil} />, [goToCouncil])

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
