import BN from 'bn.js'
import { useMemo } from 'react'

import { useMyMemberships } from '../../memberships/hooks/useMyMemberships'
import { useGetWorkingGroupApplicationsQuery, WorkingGroupApplicationFieldsFragment } from '../queries'
import { WorkingGroupApplication } from '../types/WorkingGroupApplication'

interface UseMyApplications {
  isLoading: boolean
  applications?: WorkingGroupApplication[]
}

export function useMyApplications(): UseMyApplications {
  const { members } = useMyMemberships()
  const params = { variables: { applicant_in: members.map((m) => m.id) } }
  const { loading, data } = useGetWorkingGroupApplicationsQuery(params)
  const applications = useMemo(() => data?.workingGroupApplications?.map(toApplications), [loading, data])
  return { isLoading: loading, applications }
}

function toApplications(application: WorkingGroupApplicationFieldsFragment) {
  return {
    id: application.id,
    opening: {
      type: application.opening.type,
      groupName: application.opening.group.name,
      reward: new BN(application.opening.rewardPerBlock),
    },
  }
}
