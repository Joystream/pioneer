import BN from 'bn.js'

import { useGetWorkingGroupsQuery } from '../queries'
import { WorkingGroup, WorkingGroupOpening } from '../types'

interface UseWorkingGroups {
  isLoading: boolean
  groups: WorkingGroup[]
}

export const useWorkingGroups = (): UseWorkingGroups => {
  const { data, loading } = useGetWorkingGroupsQuery()
  const groups = data?.workingGroups ?? []

  console.log('HOOOOK', groups)

  return {
    isLoading: loading,
    groups,
  }
}

export const useOpenings = () => {
  const openings: WorkingGroupOpening[] = [
    {
      id: '123',
      title: 'Storage working group leader',
      duration: [123, 'days'],
      type: 'LEADER',
      reward: { value: new BN(1000), interval: 3600 },
      applicants: { current: 2, total: 10 },
      hiring: { current: 0, total: 1 },
    },
    {
      id: '221',
      title: 'Storage working group worker',
      duration: [12, 'days'],
      type: 'REGULAR',
      reward: { value: new BN(1000), interval: 3600 },
      applicants: { current: 2, total: 10 },
      hiring: { current: 0, total: 1 },
    },
    {
      id: '2',
      title: 'Membership group worker',
      duration: [1, 'minutes'],
      type: 'REGULAR',
      reward: { value: new BN(1000), interval: 3600 },
      applicants: { current: 0, total: 3 },
      hiring: { current: 0, total: 1 },
    },
  ]

  return openings
}
