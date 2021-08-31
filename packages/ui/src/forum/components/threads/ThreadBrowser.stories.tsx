import { Meta, Story } from '@storybook/react'
import React from 'react'

import { ScrollBlock } from '@/common/components/storybookParts/previewStyles'
import { MockApolloProvider } from '@/mocks/components/storybook/MockApolloProvider'

import { ThreadBrowser, ThreadBrowserProps } from './ThreadBrowser'
import { ThreadsLayout } from './ThreadsLayout'

export default {
  title: 'Forum/Threads/ThreadBrowser',
  component: ThreadBrowser,
} as Meta

const Template: Story<ThreadBrowserProps> = (args) => (
  <MockApolloProvider members workingGroups workers forum>
    <ScrollBlock>
      <ThreadsLayout>
        <ThreadBrowser {...args} />
        <ThreadBrowser {...args} />
        <ThreadBrowser {...args} />
      </ThreadsLayout>
    </ScrollBlock>
  </MockApolloProvider>
)

export const ThreadBrowserComponent = Template.bind({})

ThreadBrowserComponent.args = {
  label: 'CategoryLabel',
}

export const EmptyThreadBrowser = Template.bind({})

EmptyThreadBrowser.args = {
  label: 'CategoryLabel',
}
