import { useMemo } from 'react'

import { useGetWorkingGroupApplicationQuery } from '../queries'
import { asApplication } from '../types/WorkingGroupApplication'

export const useApplication = (applicationId: string) => {
  const { loading, data } = useGetWorkingGroupApplicationQuery({
    variables: { where: { id: applicationId } },
  })

  const application = useMemo(() => {
    if (!data?.workingGroupApplicationByUniqueInput) {
      return null
    }

    return asApplication(data.workingGroupApplicationByUniqueInput)
  }, [JSON.stringify(data?.workingGroupApplicationByUniqueInput)])

  return { isLoading: loading, application }
}
