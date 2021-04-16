import BN from 'bn.js'

import { useMyMemberships } from '../../memberships/hooks/useMyMemberships'
import { WorkingGroupOpening } from '../types'
import { WorkingGroupApplication } from '../types/WorkingGroupApplication'

export function useApplications(): WorkingGroupApplication[] {
  const { members } = useMyMemberships()
  const basicOpening: WorkingGroupOpening = {
    id: '0',
    expectedEnding: '',
    title: '',
    type: 'REGULAR',
    reward: {
      value: new BN(10),
      interval: 10,
    },
    applicants: {
      current: 1,
      total: 1,
    },
    hiring: {
      current: 2,
      total: 2,
    },
  }

  return [
    { id: '0', applicant: members[0], opening: { ...basicOpening, title: 'Group Member' } },
    { id: '1', applicant: members[0], opening: { ...basicOpening, title: 'Group Leader', type: 'LEADER' } },
  ]
}
