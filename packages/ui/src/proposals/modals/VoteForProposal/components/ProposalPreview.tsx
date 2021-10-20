import React from 'react'

import { Loading } from '@/common/components/Loading'
import { useProposal } from '@/proposals/hooks/useProposal'
interface Props {
  proposalId: string
}

export const ProposalPreview = ({ proposalId }: Props) => {
  const { proposal, isLoading } = useProposal(proposalId)

  if (isLoading) {
    return <Loading />
  }

  return <div>{proposal?.title}</div>
}
