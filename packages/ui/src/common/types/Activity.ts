import { CouncilActivity } from '@/council/types/CouncilActivities'
import { ForumActivity } from '@/forum/types/ForumActivity'
import { Member } from '@/memberships/types'
import { ProposalActivity } from '@/proposals/types/ProposalsActivities'
import { WorkingGroupActivity } from '@/working-groups/types'

export type ActivityCategory = Activity['eventType']

export type Activity = WorkingGroupActivity | ForumActivity | ProposalActivity | CouncilActivity

export interface BaseActivity {
  id: string
  createdAt: string
  unread?: boolean
}

export type MemberDisplayFields = Pick<Member, 'id' | 'handle'>

export function asBaseActivity(activity: BaseActivity): BaseActivity {
  return {
    id: activity.id,
    createdAt: activity.createdAt,
  }
}

export function asMemberDisplayFields(member: MemberDisplayFields): MemberDisplayFields {
  return {
    id: member.id,
    handle: member.handle,
  }
}
