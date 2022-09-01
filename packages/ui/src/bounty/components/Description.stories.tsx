import { Meta, Story } from '@storybook/react'
import React from 'react'

import { MockApolloProvider } from '@/mocks/components/storybook/MockApolloProvider'

import { Description, DescriptionProps } from './Descriptions'

export default {
  title: 'Bounty/Description',
  component: Description,
} as Meta

const Template: Story<DescriptionProps> = (args) => (
  <MockApolloProvider>
    <Description {...args} />
  </MockApolloProvider>
)

export const Default = Template.bind({})
Default.args = {
  imageUrl: 'https://picsum.photos/500/300',
  title: 'Description',
  description:
    'Content Curators will one day be essential for ensuring that the petabytes of media items uploaded to Joystream are formatted correctly and comprehensively monitored and moderated.',
}
