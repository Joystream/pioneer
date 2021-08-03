import { Meta, Story } from '@storybook/react'
import React from 'react'
import { MemoryRouter } from 'react-router-dom'

import { ForumBreadcrumbs, ForumBreadcrumbsProps } from './ForumBreadcrumbs'

export default {
  title: 'Forum/ForumBreadcrumbs',
  component: ForumBreadcrumbs,
} as Meta

const Template: Story<ForumBreadcrumbsProps> = ({ forumBreadcrumbs, currentBreadcrumb }) => (
  <MemoryRouter>
    <ForumBreadcrumbs forumBreadcrumbs={forumBreadcrumbs} currentBreadcrumb={currentBreadcrumb} />
  </MemoryRouter>
)

export const WithCurrent = Template.bind({})
WithCurrent.args = {
  forumBreadcrumbs: [
    { id: '0', title: 'Help' },
    { id: '1', title: 'Working Groups' },
    { id: '2', title: 'Storage' },
  ],
  currentBreadcrumb: 'New Thread',
}

export const WithoutCurrent = Template.bind({})
WithoutCurrent.args = {
  forumBreadcrumbs: [
    { id: '0', title: 'Help' },
    { id: '1', title: 'Working Groups' },
    { id: '2', title: 'Storage' },
  ],
}
