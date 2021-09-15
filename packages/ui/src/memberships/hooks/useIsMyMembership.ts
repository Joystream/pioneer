import { useMemo } from 'react'

import { useMyMemberships } from './useMyMemberships'

export const useIsMyMembership = (membershipId: string) => {
  const myMemberships = useMyMemberships()
  return useMemo(() => myMemberships.members.some(({ id }) => id === membershipId), [membershipId, myMemberships])
}
