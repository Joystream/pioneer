import { Meta, Story } from '@storybook/react'
import BN from 'bn.js'
import React from 'react'
import { MemoryRouter } from 'react-router'

import { ModalContext } from '../../providers/modal/context'
import { TemplateBlock } from '../storybookParts/previewStyles'

import { Activities, ActivitiesProps } from './Activities'

export default {
  title: 'Common/Activities',
  component: Activities,
} as Meta

const Template: Story<ActivitiesProps> = (args) => (
  <MemoryRouter>
    <ModalContext.Provider
      value={{
        showModal: () => null,
        hideModal: () => null,
        modal: '',
        modalData: {},
      }}
    >
      <TemplateBlock>
        <Activities {...args} />
      </TemplateBlock>
    </ModalContext.Provider>
  </MemoryRouter>
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
    {
      id: '4',
      createdAt: '2021-05-20T10:28:04.155Z',
      eventType: 'BudgetSetEvent',
      groupName: 'Forum',
      newBudget: new BN(100000),
    },
    {
      id: '5',
      createdAt: '2021-05-23T10:28:04.155Z',
      eventType: 'LeaderSetEvent',
      membership: {
        id: '3',
        handle: 'Kyle_1994',
      },
      groupName: 'storage',
    },
    {
      id: '6',
      createdAt: '2021-05-24T10:28:04.155Z',
      eventType: 'StatusTextChangedEvent',
      groupName: 'storage',
    },
  ],
}
