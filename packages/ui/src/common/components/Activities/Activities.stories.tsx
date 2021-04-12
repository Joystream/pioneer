import { Meta, Story } from '@storybook/react'
import React from 'react'

import { TemplateBlock } from '../storybookParts/previewStyles'

import { Activities, ActivitiesProps } from './Activities'

export default {
  title: 'Common/Activities',
  component: Activities,
} as Meta

const Template: Story<ActivitiesProps> = (args) => (
  <TemplateBlock>
    <Activities {...args} />
  </TemplateBlock>
)

export const Default = Template.bind({})
Default.args = {
  activities: [
    {
      id: '1',
      time: '3 hours ago',
      text: 'Opening "Became a Forum Moderator has been closed by the Working Group Leader',
    },
    {
      id: '2',
      time: '3 hours ago',
      text: 'Jennifer_123 has been hired as a Storage Working Group Leader',
    },
  ],
}
