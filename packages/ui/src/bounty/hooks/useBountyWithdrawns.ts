import { useMemo } from 'react'

import { Bounty, Withdrawn } from '../types/Bounty'

export const useBountyWithdrawns = (bounty: Bounty): Withdrawn[] | undefined => {
  return useMemo(
    () =>
      bounty.entries
        ?.filter((entry) => entry.status === 'BountyEntryStatusWithdrawn')
        .map((entry) => ({ actor: entry.worker })),
    [bounty.entries]
  )
}
