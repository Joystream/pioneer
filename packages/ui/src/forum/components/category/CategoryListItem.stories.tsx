import { Meta, Story } from '@storybook/react'
import React from 'react'
import { MemoryRouter } from 'react-router'

import { repeat } from '@/common/utils'
import { ForumCategory } from '@/forum/types'

import { CategoryListItem } from './CategoryListItem'
import { asModerator, asPost, asThread } from './storybook-helpers'

export default {
  title: 'Forum/Categories/CategoryListItem',
  component: CategoryListItem,
  argTypes: { moderatorsCount: { control: { type: 'range', min: 0, max: 20 } } },
  parameters: { controls: { exclude: ['latestPost', 'topThread', 'moderators'] } },
} as Meta

interface Props {
  latestPostText: string
  topThreadTitle: string
  moderatorsCount: number
  category: ForumCategory & { threadCount: number }
}
const Template: Story<Props> = ({ category, latestPostText, topThreadTitle, moderatorsCount }) => (
  <MemoryRouter>
    <CategoryListItem
      category={{ ...category, moderators: repeat(asModerator(true), moderatorsCount) }}
      latestPost={asPost(latestPostText)}
      topThread={asThread(topThreadTitle)}
    />
  </MemoryRouter>
)

export const Default = Template.bind({})
Default.args = {
  latestPostText: 'Re: 🔥Can anyone tell me more',
  topThreadTitle: '🔥Can anyone tell me more',
  moderatorsCount: 14,
  category: {
    id: '0',
    title: 'General',
    description:
      'Morbi sed consectetur turpis. Nulla viverra id eros ut lorem fringilla. Lorem Vestibulum congue fermentu.',
    threadCount: 23,
    subcategories: [
      { id: '1', title: 'Lorem ipsum' },
      { id: '2', title: 'Dolor' },
      { id: '3', title: 'Name' },
      { id: '4', title: 'Name' },
    ],
    moderators: [],
  },
}
