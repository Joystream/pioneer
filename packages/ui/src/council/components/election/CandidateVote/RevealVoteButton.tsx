import React, { useCallback } from 'react'

import { ButtonPrimary } from '@/common/components/buttons'
import { useModal } from '@/common/hooks/useModal'
import { MyCastVote } from '@/council/hooks/useCommitment'
import { RevealVoteModalCall } from '@/council/modals/RevealVote'

interface Props {
  myVotes: MyCastVote[]
  voteForHandle: string
}

export const RevealVoteButton = ({ myVotes, voteForHandle }: Props) => {
  const { showModal } = useModal()
  const unrevealedVotes = myVotes.filter((vote) => vote.isRevealed)
  const onClick = useCallback(() => {
    showModal<RevealVoteModalCall>({
      modal: 'RevealVote',
      data: { votes: unrevealedVotes, voteForHandle },
    })
  }, [unrevealedVotes.length])
  return (
    <ButtonPrimary size="medium" onClick={onClick}>
      Reveal
    </ButtonPrimary>
  )
}
