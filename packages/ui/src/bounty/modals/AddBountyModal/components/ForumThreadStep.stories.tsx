import { Meta, Story } from '@storybook/react'
import React, { useState } from 'react'

import { ForumThreadStep } from '@/bounty/modals/AddBountyModal/components/ForumThreadStep'
import { MockApolloProvider } from '@/mocks/components/storybook/MockApolloProvider'

export default {
  title: 'bounty/AddBountyModal/ForumThreadStep',
  component: ForumThreadStep,
} as Meta

const ForumThreadStepTemplate: Story = () => {
  const [forumThreadTopic, setForumThreadTopic] = useState('')
  const [forumThreadDescription, setForumThreadDescription] = useState('')

  return (
    <MockApolloProvider>
      <ForumThreadStep
        setForumThreadTopic={setForumThreadTopic}
        setForumThreadDescription={setForumThreadDescription}
        forumThreadTopic={forumThreadTopic}
        forumThreadDescription={forumThreadDescription}
      />
    </MockApolloProvider>
  )
}

export const Default = ForumThreadStepTemplate.bind({})
