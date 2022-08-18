import { Meta, Story } from '@storybook/react'
import React from 'react'

import { BountyDiscussion, BountyDiscussionProps } from '@/bounty/components/BountyDiscussion/BountyDiscussion'
import { MockApolloProvider } from '@/mocks/components/storybook/MockApolloProvider'

export default {
  title: 'Bounty/BountyDiscussion',
  component: BountyDiscussion,
} as Meta

const Template: Story<BountyDiscussionProps> = (args) => {
  return (
    <MockApolloProvider forum members workingGroups workers>
      <BountyDiscussion {...args} />
    </MockApolloProvider>
  )
}

export const Default = Template.bind({})
Default.args = {
  discussionThreadId: '1',
}
