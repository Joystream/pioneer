import { PastCouncilProposalsFieldsFragment } from '@/council/queries'
import { MemberFieldsFragment } from '@/memberships/queries'
import { asMember, Member } from '@/memberships/types'

export interface PastCouncilMember {
  member: Member
  approvedProposals: number
  rejectedProposals: number
  slashedProposals: number
  abstainedProposals: number
}

export const asPastCouncilMember = (proposalVotes: PastCouncilProposalsFieldsFragment[]) => (fields: {
  member: MemberFieldsFragment
}): PastCouncilMember => ({
  member: asMember(fields.member),
  approvedProposals: proposalVotes.filter(
    (proposalVote) => proposalVote.voterId === fields.member.id && proposalVote.voteKind === 'APPROVE'
  ).length,
  rejectedProposals: proposalVotes.filter(
    (proposalVote) => proposalVote.voterId === fields.member.id && proposalVote.voteKind === 'REJECT'
  ).length,
  slashedProposals: proposalVotes.filter(
    (proposalVote) => proposalVote.voterId === fields.member.id && proposalVote.voteKind === 'SLASH'
  ).length,
  abstainedProposals: proposalVotes.filter(
    (proposalVote) => proposalVote.voterId === fields.member.id && proposalVote.voteKind === 'ABSTAIN'
  ).length,
})
