import faker from 'faker'
import React, { useCallback, useMemo } from 'react'
import { generatePath, useHistory } from 'react-router-dom'

import { asBlock } from '@/common/types'
import { ProposalsRoutes } from '@/proposals/constants/routes'
import { useGetLatestProposalByMemberIdQuery } from '@/proposals/queries'

import { LockItem } from '../LockItem'
import { LockLinkButton } from '../LockLinkButton'
import { LockDetailsProps } from '../types'

export const ProposalLockItem = ({ lock, address, isRecoverable }: LockDetailsProps) => {
  const { push } = useHistory()

  const { data } = useGetLatestProposalByMemberIdQuery({ variables: { lockAccount: address } })
  const proposal = data?.proposals[0]
  const eventData = proposal?.createdInEvent
  const createdInEvent = eventData && asBlock(eventData)

  const recoveryTime = faker.date.soon(1).toISOString()

  const proposalId = proposal?.id
  const goToProposal = useCallback(() => {
    if (!proposalId) {
      return null
    }
    return push(generatePath(ProposalsRoutes.preview, { id: proposalId }))
  }, [proposalId])

  const linkButton = useMemo(() => <LockLinkButton label="Show Proposal" onClick={goToProposal} />, [goToProposal])

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
