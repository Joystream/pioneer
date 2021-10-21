import React from 'react'

interface Props {
  proposalTitle: string
}

export const ProposalPreview = ({ proposalTitle }: Props) => {
  return <div>{proposalTitle}</div>
}
