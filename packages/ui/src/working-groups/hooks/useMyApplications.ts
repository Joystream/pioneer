import { useMemo } from 'react'

import { whenDefined } from '@/common/utils'
import { useMyMemberships } from '@/memberships/hooks/useMyMemberships'

import { useGetWorkingGroupApplicationsQuery } from '../queries'
import { asApplication, WorkingGroupApplication } from '../types/WorkingGroupApplication'

interface UseMyApplications {
  isLoading: boolean
  applications?: WorkingGroupApplication[]
}

export function useMyApplications(): UseMyApplications {
  const { members, active } = useMyMemberships()
  const params = {
    variables: {
      where: {
        applicant: {
          id_in: whenDefined(active?.id, (id) => [id]) ?? members.map((members) => members.id),
        },
      },
    },
  }

  const { loading, data } = useGetWorkingGroupApplicationsQuery(params)
  const applications = useMemo(() => data?.workingGroupApplications?.map(asApplication), [loading, data])
  return { isLoading: loading, applications }
}
