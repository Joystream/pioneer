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
      time: '2021-03-09T10:28:04.155Z',
      text: 'Opening "Became a Forum Moderator has been closed by the Working Group Leader',
      category: 'applied',
    },
    {
      id: '2',
      time: '2021-03-09T10:28:04.155Z',
      text: 'Jennifer_123 has been hired as a Storage Working Group Leader',
      category: 'closed',
    },
    {
      id: '3',
      time: '2021-03-09T10:28:04.155Z',
      text: 'Jennifer_123 has been hired as a Storage Working Group Leader',
      category: 'applied',
      type: 'error',
    },
    {
      id: '4',
      time: '2021-03-09T10:28:04.155Z',
      text: 'Jennifer_123 has been hired as a Storage Working Group Leader',
      category: 'closed',
      type: 'ok',
    },
  ],
}
