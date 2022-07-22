import React, { useMemo } from 'react'
import { generatePath } from 'react-router-dom'

import { useApi } from '@/common/hooks/useApi'
import { MILLISECONDS_PER_BLOCK } from '@/common/model/formatters'
import { asBlock } from '@/common/types'
import { CouncilRoutes } from '@/council/constants'
import { useElectionRemainingPeriod } from '@/council/hooks/useElectionRemainingPeriod'
import { useElectionStage } from '@/council/hooks/useElectionStage'
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
  const idlePeriodDuration = api?.consts.council.idlePeriodDuration.toNumber()
  const { stage } = useElectionStage()
  const remainingPeriod = useElectionRemainingPeriod(stage)

  const recoveryTime = useMemo(() => {
    if (!eventData || !idlePeriodDuration) {
      return
    }
    const startTime = Date.parse(eventData.electedAtTime)
    const idleDurationTime = idlePeriodDuration * MILLISECONDS_PER_BLOCK
    const councilEnd = startTime + idleDurationTime

    const endTime =
      councilEnd > Date.now()
        ? new Date(councilEnd).toISOString()
        : new Date(Date.now() + (remainingPeriod?.toNumber() ?? 0) * MILLISECONDS_PER_BLOCK).toISOString()

    return { time: endTime, tooltipLabel: 'Recoverable after not re-elected' }
  }, [eventData?.electedAtTime, idlePeriodDuration])

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
      lockRecovery={recoveryTime}
      linkButtons={goToCouncilButton}
    />
  )
}
