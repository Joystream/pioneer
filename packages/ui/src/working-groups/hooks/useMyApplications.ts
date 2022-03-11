import { useMemo } from 'react'

import { RefetchQuery } from '@/common/types/queries'
import { useMyMemberships } from '@/memberships/hooks/useMyMemberships'

import { useGetWorkingGroupApplicationsQuery } from '../queries'
import { asApplication, WorkingGroupApplication } from '../types/WorkingGroupApplication'

interface UseMyApplications {
  isLoading: boolean
  applications?: WorkingGroupApplication[]
  refetch: RefetchQuery
}

export function useMyApplications(): UseMyApplications {
  const { members } = useMyMemberships()
  const params = {
    variables: {
      where: {
        applicant: {
          id_in: members.map((m) => m.id),
        },
      },
    },
  }

  const { loading, data, refetch } = useGetWorkingGroupApplicationsQuery(params)
  const applications = useMemo(() => data?.workingGroupApplications?.map(asApplication), [loading, data])
  return { isLoading: loading, applications, refetch }
}
