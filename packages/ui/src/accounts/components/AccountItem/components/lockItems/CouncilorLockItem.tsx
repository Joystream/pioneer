import React, { useMemo } from 'react'
import { generatePath } from 'react-router-dom'

import { MILLISECONDS_PER_BLOCK } from '@/common/model/formatters'
import { asBlock } from '@/common/types'
import { CouncilRoutes } from '@/council/constants'
import { useCouncilRemainingPeriod } from '@/council/hooks/useCouncilRemainingPeriod'
import { useGetCouncilorElectionEventQuery } from '@/council/queries'
import { useMember } from '@/memberships/hooks/useMembership'
import { useMyMemberships } from '@/memberships/hooks/useMyMemberships'

import { LockItem } from '../LockItem'
import { LockLinkButton } from '../LockLinkButton'
import { LockDetailsProps } from '../types'

export const CouncilorLockItem = ({ lock, address, isRecoverable }: LockDetailsProps) => {
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

  const remainingPeriod = useCouncilRemainingPeriod('electionEnd')
  const recoveryTime = useMemo(() => {
    if (remainingPeriod)
      return {
        time: new Date(Date.now() + remainingPeriod * MILLISECONDS_PER_BLOCK).toISOString(),
        tooltipLabel: 'Recoverable after not re-elected',
      }
  }, [remainingPeriod])

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
