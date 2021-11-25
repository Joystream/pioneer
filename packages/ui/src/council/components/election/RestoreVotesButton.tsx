import React from 'react'

import { ButtonGhost } from '@/common/components/buttons'
import { useModal } from '@/common/hooks/useModal'
import { isDefined } from '@/common/utils'
import { RestoreVotesModalCall } from '@/council/modals/RestoreVotes/types'

interface Props {
  cycleId?: number
}

export const RestoreVotesButton = ({ cycleId }: Props) => {
  const { showModal } = useModal<RestoreVotesModalCall>()

  if (!isDefined(cycleId)) return null

  return (
    <ButtonGhost size="medium" onClick={() => showModal({ modal: 'RestoreVotes', data: { cycleId } })}>
      Restore Votes
    </ButtonGhost>
  )
}
