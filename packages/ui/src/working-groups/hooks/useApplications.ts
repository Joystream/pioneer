import { WorkingGroupApplicationStatus } from '@/common/api/queries'
import { useGetWorkingGroupApplicationsQuery } from '@/working-groups/queries'

import { asApplication } from '../types/WorkingGroupApplication'

export interface Props {
  applicationsStatus?: ApplicationStatus
  openingId?: number
}

export type ApplicationStatus = 'accepted' | 'rejected' | 'cancelled' | 'pending' | 'withdrawn'
export type ApplicationStatusTypename = WorkingGroupApplicationStatus['__typename']
export const ApplicationStatusToTypename: Record<ApplicationStatus, ApplicationStatusTypename> = {
  accepted: 'ApplicationStatusAccepted',
  rejected: 'ApplicationStatusRejected',
  cancelled: 'ApplicationStatusCancelled',
  pending: 'ApplicationStatusPending',
  withdrawn: 'ApplicationStatusWithdrawn',
}

export const useApplications = ({ applicationsStatus, openingId }: Props) => {
  const { loading, data } = useGetWorkingGroupApplicationsQuery({
    variables: {
      where: {
        opening: { runtimeId_eq: openingId },
        status_json: { isTypeOf_eq: applicationsStatus ? ApplicationStatusToTypename[applicationsStatus] : undefined },
      },
    },
  })
  const applications = data?.workingGroupApplications ?? []
  return { isLoading: loading, applications: applications.map(asApplication) }
}
