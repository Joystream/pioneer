import { useMemo } from 'react'

import { Bounty, Entrant } from '../types/Bounty'

export const useBountyEntrants = (bounty: Bounty): Entrant[] | undefined => {
  return useMemo(
    () => bounty.entries?.map((entry) => ({ actor: entry.worker, count: entry.works?.length ?? 0 })) ?? [],
    [bounty.entries]
  )
}
