import { Meta, Story } from '@storybook/react'
import BN from 'bn.js'
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
      createdAt: '2021-03-09T10:28:04.155Z',
      eventType: 'AppliedOnOpeningEvent',
      membership: {
        handle: 'xXproGamerDarknessXx',
        id: '1',
      },
      opening: {
        title: 'Forum Worker',
        id: '2',
      },
    },
    {
      id: '2',
      createdAt: '2021-05-09T10:28:04.155Z',
      eventType: 'ApplicationWithdrawnEvent',
      membership: {
        handle: 'andy00',
        id: '1',
      },
      opening: {
        title: 'Forum Worker',
        id: '2',
      },
    },
    {
      id: '3',
      createdAt: '2021-05-19T10:28:04.155Z',
      eventType: 'BudgetSpendingEvent',
      amount: new BN('10000'),
      groupName: 'Forum',
    },
  ],
}
