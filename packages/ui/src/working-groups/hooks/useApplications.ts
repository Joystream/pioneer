import { useGetWorkingGroupApplicationsQuery } from '@/working-groups/queries'

import { asApplication } from '../types/WorkingGroupApplication'

export const useApplications = (openingId?: number) => {
  const { loading, data } = useGetWorkingGroupApplicationsQuery({
    variables: {
      where: {
        opening: { runtimeId_eq: openingId },
      },
    },
  })
  const applications = data?.workingGroupApplications ?? []

  return { isLoading: loading, applications: applications.map(asApplication) }
}
