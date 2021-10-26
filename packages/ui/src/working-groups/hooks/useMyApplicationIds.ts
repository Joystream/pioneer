import { useMemo } from 'react'

import { useMyMemberships } from '@/memberships/hooks/useMyMemberships'
import { useGetWorkingGroupApplicationIdsQuery } from '@/working-groups/queries'

export const useMyApplicationIds = () => {
  const { active } = useMyMemberships()
  const { data, loading } = useGetWorkingGroupApplicationIdsQuery({
    variables: { where: { applicant: { id_eq: active?.id } } },
  })
  const applicationIds = useMemo(
    () => data?.workingGroupApplications.map((application) => application.id) ?? [],
    [data, loading]
  )
  return {
    applicationIds,
    isLoading: loading,
  }
}
