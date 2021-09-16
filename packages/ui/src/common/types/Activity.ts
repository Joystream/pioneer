import { ForumActivity } from '@/forum/types/ForumActivity'
import { Member } from '@/memberships/types'
import { WorkingGroupActivity } from '@/working-groups/types'

export type ActivityCategory = Activity['eventType']

export type Activity = WorkingGroupActivity | ForumActivity

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
