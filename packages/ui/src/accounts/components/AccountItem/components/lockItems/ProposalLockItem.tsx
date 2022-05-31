import faker from 'faker'
import React, { useMemo } from 'react'
import { generatePath } from 'react-router-dom'

import { asBlock } from '@/common/types'
import { ProposalsRoutes } from '@/proposals/constants/routes'
import { useGetLatestProposalByMemberIdQuery } from '@/proposals/queries'

import { LockItem } from '../LockItem'
import { LockLinkButton } from '../LockLinkButton'
import { LockDetailsProps } from '../types'

export const ProposalLockItem = ({ lock, address, isRecoverable }: LockDetailsProps) => {
  const { data } = useGetLatestProposalByMemberIdQuery({ variables: { lockAccount: address } })
  const proposal = data?.proposals[0]
  const eventData = proposal?.createdInEvent
  const createdInEvent = eventData && asBlock(eventData)

  const recoveryTime = faker.date.soon(1).toISOString()

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
