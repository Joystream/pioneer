import React from 'react'

import { DownloadButtonGhost } from '@/common/components/buttons/DownloadButtons'
import { useLocalStorage } from '@/common/hooks/useLocalStorage'
import { isDefined } from '@/common/utils'
import { VotingAttempt } from '@/council/hooks/useCommitment'

interface Props {
  cycleId?: number
}

export const BackupVotesButton = ({ cycleId }: Props) => {
  const [votingAttempts] = useLocalStorage<VotingAttempt[]>(`votes:${cycleId}`)

  if (!votingAttempts?.length || !isDefined(cycleId)) return null

  const votesJSON = JSON.stringify({ cycleId, votingAttempts })
  return (
    <DownloadButtonGhost size="medium" name={`Votes-${cycleId}.json`} parts={[votesJSON]}>
      Backup Votes
    </DownloadButtonGhost>
  )
}
