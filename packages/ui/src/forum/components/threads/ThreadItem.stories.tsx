import { Meta, Story } from '@storybook/react'
import React from 'react'

import { ScrollBlock } from '@/common/components/storybookParts/previewStyles'
import { asForumThread } from '@/forum/types'
import rawThreads from '@/mocks/data/raw/forumThreads.json'

import { randomFromRange } from '../../../../dev/scripts/generators/utils'

import { ThreadItem, ThreadItemProps } from './ThreadItem'
import { ThreadsLayout } from './ThreadsLayout'

export default {
  title: 'Forum/Threads/ThreadItem',
  component: ThreadItem,
} as Meta

const Template: Story<ThreadItemProps> = (args) => (
  <ScrollBlock>
    <ThreadsLayout>
      <ThreadItem {...args} />
      <ThreadItem {...args} hideButtons />
      <ThreadItem {...args} />
    </ThreadsLayout>
  </ScrollBlock>
)

export const ThreadItemComponent = Template.bind({})

const thread = rawThreads[randomFromRange(0, rawThreads.length - 1)]
ThreadItemComponent.args = {
  categoryLabel: 'Lorem > Ipsum > Del',
  categoryCount: 10,
  thread: asForumThread({ ...thread, __typename: 'ForumThread' }),
}
