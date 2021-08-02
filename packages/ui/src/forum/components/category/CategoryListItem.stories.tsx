import { Meta, Story } from '@storybook/react'
import { sub } from 'date-fns'
import React from 'react'
import { MemoryRouter } from 'react-router'

import { repeat } from '@/common/utils'
import { ForumCategory, ForumPost, ForumThread } from '@/forum/types'
import { randomBlock } from '@/mocks/helpers/randomBlock'

import { getMember } from '../../../../test/_mocks/members'

import { CategoryListItem } from './CategoryListItem'

export default {
  title: 'Forum/Categories/CategoryListItem',
  component: CategoryListItem,
  argTypes: { moderatorsCount: { control: { type: 'range', min: -1, max: 20 } } },
  parameters: { controls: { exclude: ['latestPost', 'topThread', 'moderators'] } },
} as Meta

const alice = getMember('alice')

interface Props {
  latestPostText: string
  topThreadTitle: string
  moderatorsCount: number
  category: ForumCategory & { threadCount: number }
}
const Template: Story<Props> = ({ category, latestPostText, topThreadTitle, moderatorsCount }) => (
  <MemoryRouter>
    <CategoryListItem
      category={category}
      latestPost={asPost(latestPostText)}
      topThread={asThread(topThreadTitle)}
      moderators={moderatorsCount >= 0 ? repeat((id) => ({ ...alice, id: String(id) }), moderatorsCount) : undefined}
    />
  </MemoryRouter>
)

const asPost = (text: string): ForumPost | undefined => {
  if (text)
    return {
      id: '0',
      createdAt: sub(Date.now(), { minutes: 25 }).toISOString(),
      createdAtBlock: randomBlock(),
      author: alice,
      text,
    }
}

const asThread = (title: string): (ForumThread & { postCount: number }) | undefined => {
  if (title)
    return {
      id: '0',
      title,
      isSticky: false,
      categoryId: '0',
      postCount: 1201,
    }
}

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
  },
}
