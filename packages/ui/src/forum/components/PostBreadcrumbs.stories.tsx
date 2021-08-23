import { Meta, Story } from '@storybook/react'
import React from 'react'
import { MemoryRouter } from 'react-router-dom'

import { PostBreadcrumbs, PostBreadcrumbsProps } from './PostBreadcrumbs'

export default {
  title: 'Forum/PostBreadcrumbs',
  component: PostBreadcrumbs,
} as Meta

const Template: Story<PostBreadcrumbsProps> = ({ forumBreadcrumbs, currentBreadcrumb }) => (
  <MemoryRouter>
    <PostBreadcrumbs forumBreadcrumbs={forumBreadcrumbs} currentBreadcrumb={currentBreadcrumb} />
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
