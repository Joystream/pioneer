import { Meta, Story } from '@storybook/react'
import React from 'react'

import { ScrollBlock, TemplateBlock } from '@/common/components/storybookParts/previewStyles'
import { MockApolloProvider } from '@/mocks/components/storybook/MockApolloProvider'
import { DeadlineList, DeadlineListProps } from '@/overview/components/DeadlineList/DeadlineList'

export default {
  title: 'Overview/DeadlineList',
  component: DeadlineList,
} as Meta

const Template: Story<DeadlineListProps> = (args) => {
  return (
    <MockApolloProvider members council proposals workers workingGroups>
      <ScrollBlock>
        <TemplateBlock>
          <DeadlineList {...args} />
        </TemplateBlock>
      </ScrollBlock>
    </MockApolloProvider>
  )
}
export const Default = Template.bind({})
Default.args = {}
