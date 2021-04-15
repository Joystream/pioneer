import { useGetWorkingGroupOpeningsQuery } from '../queries'
import { asWorkingGroupOpening } from '../types'

interface UseOpeningsParams {
  groupId?: string
}

export const useOpenings = ({ groupId }: UseOpeningsParams = {}) => {
  const { loading, data } = useGetWorkingGroupOpeningsQuery({ variables: { groupId: groupId } })

  const groups = data?.workingGroupOpenings ?? []

  return {
    isLoading: loading,
    openings: groups.map(asWorkingGroupOpening),
  }
}
