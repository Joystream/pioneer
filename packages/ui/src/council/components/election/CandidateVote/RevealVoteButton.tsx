import React, { MouseEventHandler, useCallback } from 'react'

import { TransactionButton } from '@/common/components/buttons/TransactionButton'
import { useModal } from '@/common/hooks/useModal'
import { MyCastVote } from '@/council/hooks/useMyCastVotes'
import { RevealVoteModalCall } from '@/council/modals/RevealVote'

interface Props {
  myVotes: MyCastVote[]
  voteForHandle: string
}

export const RevealVoteButton = ({ myVotes, voteForHandle }: Props) => {
  const { showModal } = useModal()
  const unrevealedVotes = myVotes.flatMap((vote) => vote.attempt ?? [])
  const onClick = useCallback<MouseEventHandler<HTMLDivElement>>(
    (event) => {
      event.stopPropagation()
      showModal<RevealVoteModalCall>({
        modal: 'RevealVote',
        data: { votes: unrevealedVotes, voteForHandle },
      })
    },
    [unrevealedVotes.length]
  )
  return (
    <TransactionButton style="primary" size="medium" onClick={onClick}>
      Reveal
    </TransactionButton>
  )
}
