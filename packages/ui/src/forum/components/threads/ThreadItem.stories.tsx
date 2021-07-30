import { Meta, Story } from '@storybook/react'
import React from 'react'

import { ScrollBlock } from '@/common/components/storybookParts/previewStyles'

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
      <ThreadItem {...args} />
      <ThreadItem {...args} />
    </ThreadsLayout>
  </ScrollBlock>
)

export const ThreadItemComponent = Template.bind({})

ThreadItemComponent.args = {
  label: 'CategoryLabel',
  count: 10,
}
