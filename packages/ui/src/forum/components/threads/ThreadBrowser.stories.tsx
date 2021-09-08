import { Meta, Story } from '@storybook/react'
import React from 'react'
import { MemoryRouter } from 'react-router-dom'

import { ScrollBlock } from '@/common/components/storybookParts/previewStyles'
import { MockApolloProvider } from '@/mocks/components/storybook/MockApolloProvider'

import { RandomThreadsBrowser, RandomThreadsBrowserProps } from './RandomThreadsBrowser'
import { ThreadBrowser } from './ThreadBrowser'
import { ThreadsLayout } from './ThreadsLayout'

export default {
  title: 'Forum/Threads/ThreadBrowser',
  component: ThreadBrowser,
} as Meta

const Template: Story<RandomThreadsBrowserProps> = (args) => (
  <MockApolloProvider members workingGroups workers forum>
    <MemoryRouter>
      <ScrollBlock>
        <ThreadsLayout>
          <RandomThreadsBrowser {...args} />
          <RandomThreadsBrowser {...args} />
          <RandomThreadsBrowser {...args} />
        </ThreadsLayout>
      </ScrollBlock>
    </MemoryRouter>
  </MockApolloProvider>
)

export const ThreadBrowserComponent = Template.bind({})

ThreadBrowserComponent.args = {
  label: 'CategoryLabel',
}

export const EmptyThreadBrowser = Template.bind({})

EmptyThreadBrowser.args = {
  label: 'CategoryLabel',
  maxThreads: 0,
}
