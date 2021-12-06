import { BaseActivity, MemberDisplayFields } from '@/common/types'

export type ForumActivity =
  | PostAddedActivity
  | PostEditedActivity
  | PostModeratedActivity
  | PostDeletedActivity
  | ThreadCreatedActivity
  | ThreadDeletedActivity
  | ThreadModeratedActivity
  | CategoryCreatedActivity
  | CategoryDeletedActivity

interface PostActivity extends BaseActivity {
  postId: string
  threadId: string
  author: MemberDisplayFields
}

export interface PostAddedActivity extends PostActivity {
  eventType: 'PostAddedEvent'
}

export interface PostEditedActivity extends PostActivity {
  eventType: 'PostTextUpdatedEvent'
}

export interface PostModeratedActivity extends BaseActivity {
  eventType: 'PostModeratedEvent'
  postId: string
  threadId: string
  actor: MemberDisplayFields
}

export interface PostDeletedActivity extends BaseActivity {
  eventType: 'PostDeletedEvent'
  actor: MemberDisplayFields
  threadId: string
  threadTitle: string
  numberOfPosts: number
}

export interface ThreadCreatedActivity extends BaseActivity {
  eventType: 'ThreadCreatedEvent'
  thread: {
    id: string
    title: string
  }
  category: {
    id: string
    title: string
  }
  author: MemberDisplayFields
}

export interface ThreadDeletedActivity extends BaseActivity {
  eventType: 'ThreadDeletedEvent'
  thread: {
    id: string
    title: string
  }
}

export interface ThreadModeratedActivity extends BaseActivity {
  eventType: 'ThreadModeratedEvent'
  thread: {
    id: string
    title: string
  }
  actor: MemberDisplayFields
}

export interface CategoryCreatedActivity extends BaseActivity {
  eventType: 'CategoryCreatedEvent'
  category: {
    id: string
    title: string
  }
  parentCategory?: {
    id: string
    title: string
  }
}

export interface CategoryDeletedActivity extends BaseActivity {
  eventType: 'CategoryDeletedEvent'
  category: {
    id: string
    title: string
  }
  parentCategory?: {
    id: string
    title: string
  }
}
