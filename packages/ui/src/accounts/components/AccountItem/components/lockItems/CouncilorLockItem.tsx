import React, { useMemo } from 'react'
import { generatePath } from 'react-router-dom'

import { useApi } from '@/common/hooks/useApi'
import { MILLISECONDS_PER_BLOCK } from '@/common/model/formatters'
import { asBlock } from '@/common/types'
import { CouncilRoutes } from '@/council/constants'
import { useGetCouncilorElectionEventQuery } from '@/council/queries'
import { useMember } from '@/memberships/hooks/useMembership'
import { useMyMemberships } from '@/memberships/hooks/useMyMemberships'

import { LockItem } from '../LockItem'
import { LockLinkButton } from '../LockLinkButton'
import { LockDetailsProps } from '../types'

export const CouncilorLockItem = ({ lock, address, isRecoverable }: LockDetailsProps) => {
  const { api } = useApi()
  const {
    helpers: { getMemberIdByBoundAccountAddress },
  } = useMyMemberships()

  const memberId = useMemo(() => getMemberIdByBoundAccountAddress(address), [address])
  const { member } = useMember(memberId)
  const { data } = useGetCouncilorElectionEventQuery({ variables: { lockAccount: address } })
  const eventData = data?.councilMembers[0]?.electedInCouncil
  const createdInEvent =
    eventData &&
    asBlock({
      inBlock: eventData.electedAtBlock,
      createdAt: eventData.electedAtTime,
      network: eventData.electedAtNetwork,
    })

  const recoveryTime = useMemo(() => {
    if (!eventData || !api) {
      return null
    }
    const startTime = new Date(eventData.electedAtTime).getTime()
    const idleDuration = api.consts.council.idlePeriodDuration
    const electionDuration = api.consts.referendum.voteStageDuration?.add(api.consts.referendum.revealStageDuration)
    const duration = idleDuration.add(electionDuration).toNumber() * MILLISECONDS_PER_BLOCK
    const endDate = new Date(startTime + duration).toISOString()

    return endDate
  }, [eventData?.electedAtBlock, api])

  const councilId = eventData?.id
  const councilPath = useMemo(() => {
    if (member?.isCouncilMember) {
      return CouncilRoutes.council
    }
    if (councilId) {
      return generatePath(CouncilRoutes.pastCouncils, { id: councilId })
    }
  }, [councilId, member?.isCouncilMember])

  const goToCouncilButton = useMemo(() => {
    if (!councilPath) {
      return null
    }
    return <LockLinkButton label="Show Council" to={councilPath} />
  }, [councilId, member?.isCouncilMember])

  return (
    <LockItem
      lock={lock}
      address={address}
      isRecoverable={isRecoverable}
      createdInEvent={createdInEvent}
      recoveryTime={recoveryTime}
      linkButtons={goToCouncilButton}
    />
  )
}
