import React, { useMemo } from 'react'
import { generatePath } from 'react-router-dom'

import { MILLISECONDS_PER_BLOCK } from '@/common/model/formatters'
import { ProposalsRoutes } from '@/proposals/constants/routes'
import { useBlocksToProposalExecution } from '@/proposals/hooks/useBlocksToProposalExecution'
import { useProposalConstants } from '@/proposals/hooks/useProposalConstants'
import { useGetLatestProposalByMemberIdQuery } from '@/proposals/queries'
import { asLatestProposal } from '@/proposals/types'

import { LockItem } from '../LockItem'
import { LockLinkButton } from '../LockLinkButton'
import { LockDetailsProps } from '../types'

export const ProposalLockItem = ({ lock, address, isRecoverable }: LockDetailsProps) => {
  const { data } = useGetLatestProposalByMemberIdQuery({ variables: { lockAccount: address } })
  const queriedProposal = data?.proposals[0]
  const proposal = queriedProposal && asLatestProposal(queriedProposal)

  const eventData = proposal?.createdInEvent
  const createdInEvent = eventData

  const constants = useProposalConstants(proposal?.type)
  const recoveryDuration = useBlocksToProposalExecution(proposal, constants)
  const recoveryTime =
    typeof recoveryDuration !== 'undefined'
      ? { time: new Date(Date.now() + recoveryDuration * MILLISECONDS_PER_BLOCK).toISOString() }
      : undefined

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
      lockRecovery={recoveryTime}
      linkButtons={goToProposalButton}
    />
  )
}
