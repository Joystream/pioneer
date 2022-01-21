import { useMemo } from 'react'
import { Bounty, BountyEntryStatus, Entrant } from '../types/Bounty'


export const useBountyEntrants = (bounty: Bounty): Entrant[] | undefined => {
  const disallowedStates: BountyEntryStatus[] = ['BountyEntryStatusWithdrawn', 'BountyEntryStatusRejected']
  return useMemo(() => (
    bounty.entries?.filter(
      (entry) => !disallowedStates.includes(entry.status)
    ).map((entry) => (
      { actor: entry.worker, count: entry.works?.length ?? 0 }
    ))
  ), [bounty.entries])
}