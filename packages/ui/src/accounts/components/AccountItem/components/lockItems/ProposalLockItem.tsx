import React, { useMemo } from 'react'
import { generatePath } from 'react-router-dom'

import { useApi } from '@/common/hooks/useApi'
import { MILLISECONDS_PER_BLOCK } from '@/common/model/formatters'
import { asBlock } from '@/common/types'
import { ProposalsRoutes } from '@/proposals/constants/routes'
import { useGetLatestProposalByMemberIdQuery } from '@/proposals/queries'

import { LockItem } from '../LockItem'
import { LockLinkButton } from '../LockLinkButton'
import { LockDetailsProps } from '../types'

export const ProposalLockItem = ({ lock, address, isRecoverable }: LockDetailsProps) => {
  const { api } = useApi()
  const { data } = useGetLatestProposalByMemberIdQuery({ variables: { lockAccount: address } })
  const proposal = data?.proposals[0]
  const eventData = proposal?.createdInEvent
  const createdInEvent = eventData && asBlock(eventData)

  const recoveryTime = useMemo(() => {
    if (!eventData || !api || isRecoverable) {
      return null
    }
    const startTime = new Date(eventData.createdAt).getTime()
    // All proposal types has the same constants so any can be used
    const proposalParameters = api.consts.proposalsCodex.signalProposalParameters
    const duration = proposalParameters.votingPeriod.toNumber() + proposalParameters.gracePeriod.toNumber()
    const endDate = new Date(startTime + duration * MILLISECONDS_PER_BLOCK).toISOString()

    return endDate
  }, [eventData?.createdAt, api, isRecoverable])

  const proposalId = proposal?.id
  const goToProposalButton = useMemo(() => {
    if (!proposalId) {
      return null
    }
    const proposalPath = generatePath(ProposalsRoutes.preview, { id: proposalId })
    return <LockLinkButton label="Show Proposal" to={proposalPath} />
  }, [proposalId])

  return (
    <LockItem
      lock={lock}
      address={address}
      isRecoverable={isRecoverable}
      createdInEvent={createdInEvent}
      recoveryTime={recoveryTime}
      linkButtons={goToProposalButton}
    />
  )
}
