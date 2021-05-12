import { useMemo } from 'react'

import { useGetWorkersQuery, WorkerFieldsFragment } from '../queries'
import { useMyMemberships } from '@/memberships/hooks/useMyMemberships'
import { Member } from '@/memberships/types'
import { WorkingGroup } from '@/working-groups/types'

export interface WorkerWithDetails {
  membership: Pick<Member, 'id'>
  group: Pick<WorkingGroup, 'id' | 'name'>
  isLeader: boolean
  rewardPerBlock: number
  earnedTotal: number
  stake: number
  status: string
}

const asWorkerWithDetails = (fields: WorkerFieldsFragment): WorkerWithDetails => ({
  group: {
    id: fields.group.id,
    name: fields.group.name,
  },
  membership: {
    id: fields.membership.id,
  },
  rewardPerBlock: fields.rewardPerBlock,
  earnedTotal: 1000,
  stake: fields.stake,
  isLeader: fields.isLead,
  status: fields.status.__typename,
})

export const useMyWorkers = () => {
  const { members } = useMyMemberships()
  const params = { variables: { where: { membershipId_in: members.map((m) => m.id) } } }

  const { data, loading } = useGetWorkersQuery(params)
  const workers = useMemo(() => data && data.workers.map(asWorkerWithDetails), [data, loading])

  return { workers, isLoading: loading }
}
