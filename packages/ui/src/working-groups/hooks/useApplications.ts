import { useGetWorkingGroupApplicationsQuery } from '@/working-groups/queries'

import { asApplication } from '../types/WorkingGroupApplication'

export const useApplications = (openingId?: string) => {
  const { loading, data } = useGetWorkingGroupApplicationsQuery({
    variables: {
      where: {
        opening: { id_eq: openingId },
      },
    },
  })
  const applications = data?.workingGroupApplications ?? []

  return { isLoading: loading, applications: applications.map(asApplication) }
}
