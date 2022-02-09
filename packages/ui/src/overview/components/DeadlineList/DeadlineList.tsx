import React from 'react'

import { List } from '@/common/components/List'
import { Loading } from '@/common/components/Loading'
import { useCurrentElection } from '@/council/hooks/useCurrentElection'
import { ElectionList } from '@/overview/components/DeadlineList/ElectionList'
import { OpeningsList } from '@/overview/components/DeadlineList/OpeningsList'
import { ProposalList } from '@/overview/components/DeadlineList/ProposalList'
import { useProposals } from '@/proposals/hooks/useProposals'
import { useOpenings } from '@/working-groups/hooks/useOpenings'
import { useUpcomingOpenings } from '@/working-groups/hooks/useUpcomingOpenings'
import { WorkingGroup } from '@/working-groups/types'

export interface DeadlineListProps {
  workingGroup?: WorkingGroup
}

export const DeadlineList = ({ workingGroup }: DeadlineListProps) => {
  const { isLoading: proposalLoading, proposals } = useProposals({ status: 'active', filters: { stage: 'deciding' } })
  const { election } = useCurrentElection()
  const { isLoading: upcomingLoading, upcomingOpenings } = useUpcomingOpenings({ groupId: workingGroup?.id })
  const { isLoading: openingLoading, openings } = useOpenings({ groupId: workingGroup?.id, type: 'open' })

  if (proposalLoading || upcomingLoading || openingLoading) {
    return <Loading />
  }

  return (
    <List>
      {proposals?.map((proposal) => (
        <ProposalList key={proposal.id} proposalId={proposal.id} title={proposal.title} />
      ))}
      {election?.candidates.map((elections) => (
        <ElectionList electionId={elections.id} title={elections.info.title} key={elections.id} />
      ))}
      {openings.map((opening) => (
        <OpeningsList key={opening.id} title={opening.title} type="openings" groupName={opening.groupName} />
      ))}
      {upcomingOpenings.map((upcoming) => (
        <OpeningsList key={upcoming.id} title={upcoming.title} type="upcoming" groupName={upcoming.groupName} />
      ))}
    </List>
  )
}
