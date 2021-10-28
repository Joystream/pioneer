import { ModalWithDataCall } from '@/common/providers/modal/types'
import { VotingAttempt } from '@/council/hooks/useCommitment'

export type RevealVoteModalCall = ModalWithDataCall<'RevealVote', { votes: VotingAttempt[]; voteForHandle: string }>
