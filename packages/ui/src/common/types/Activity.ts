import { WorkingGroupActivity } from '@/working-groups/types'

export type ActivityCategory = Activity['eventType']

export type Activity = WorkingGroupActivity

export interface BaseActivity {
  id: string
  createdAt: string
  unread?: boolean
}
