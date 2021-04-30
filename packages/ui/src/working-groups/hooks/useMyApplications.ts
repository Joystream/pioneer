import { useMemo } from 'react'

import { useMyMemberships } from '../../memberships/hooks/useMyMemberships'
import { useGetWorkingGroupApplicationsQuery } from '../queries'
import { asApplication, WorkingGroupApplication } from '../types/WorkingGroupApplication'

interface UseMyApplications {
  isLoading: boolean
  applications?: WorkingGroupApplication[]
}

export function useMyApplications(): UseMyApplications {
  const { members } = useMyMemberships()
  const params = { variables: { applicantId_in: members.map((m) => m.id) } }
  const { loading, data } = useGetWorkingGroupApplicationsQuery(params)
  const applications = useMemo(() => data?.workingGroupApplications?.map(asApplication), [loading, data])
  return { isLoading: loading, applications }
}
