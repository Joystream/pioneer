import { MemberFieldsFragment } from '@/memberships/queries'
import { asMember, Member } from '@/memberships/types'

export interface PastCouncilMember {
  member: Member
  acceptedProposals: number
  rejectedProposals: number
  slashedProposals: number
  abstainedProposals: number
}

export const asPastCouncilMember = (fields: { member: MemberFieldsFragment }): PastCouncilMember => ({
  member: asMember(fields.member),
  acceptedProposals: 0,
  rejectedProposals: 0,
  slashedProposals: 0,
  abstainedProposals: 0,
})
