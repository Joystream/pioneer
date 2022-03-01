import { ApolloQueryResult } from '@apollo/client'
import { useMemo } from 'react'

import { useMyMemberships } from '@/memberships/hooks/useMyMemberships'

import { useGetWorkingGroupApplicationsQuery } from '../queries'
import { asApplication, WorkingGroupApplication } from '../types/WorkingGroupApplication'

interface UseMyApplications {
  isLoading: boolean
  applications?: WorkingGroupApplication[]
  refetch: () => Promise<ApolloQueryResult<unknown>>
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
