import { useMemo } from 'react'

import { asMember } from '@/memberships/types'
import { WorkerStatus, WorkerStatusTypename, WorkerWithMemberAndApplication } from '@/working-groups/types'

import { useGetWorkersQuery } from '../queries'

interface UseWorkersProps {
  groupId?: string
  statusIn?: WorkerStatus[]
}

export const useWorkers = ({ groupId, statusIn }: UseWorkersProps) => {
  const options = {
    variables: {
      where: {
        group_eq: groupId,
        status_json: statusIn ? { isTypeOf_in: statusIn.map((status) => WorkerStatusTypename[status]) } : undefined,
      },
    },
  }
  const { data, loading } = useGetWorkersQuery(options)
  const workers: WorkerWithMemberAndApplication[] | undefined = useMemo(
    () =>
      data &&
      data.workers.map(({ membership, applicationId }) => ({
        member: asMember(membership),
        applicationId,
      })),
    [data, loading]
  )

  return { workers, isLoading: loading }
}
