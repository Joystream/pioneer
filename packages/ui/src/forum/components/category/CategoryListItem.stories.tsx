import { Meta, Story } from '@storybook/react'
import React from 'react'
import { MemoryRouter } from 'react-router'

import { asArray, repeat } from '@/common/utils'
import { MockApolloProvider } from '@/mocks/components/storybook/MockApolloProvider'
import { RawForumCategoryMock } from '@/mocks/data/seedForum'

import { CategoryListItem } from './CategoryListItem'
import { asStorybookModerator, asStorybookPost, asStorybookThread } from './storybook-helpers'

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
  category: RawForumCategoryMock
}
const Template: Story<Props> = ({ category, latestPostText, topThreadTitle, moderatorsCount }) => (
  <MockApolloProvider
    members
    forum={{
      categories: [category],
      threads: asArray(asStorybookThread(topThreadTitle)),
      posts: asArray(asStorybookPost(latestPostText)),
    }}
  >
    <MemoryRouter>
      <CategoryListItem category={{ ...category, moderators: repeat(asStorybookModerator(), moderatorsCount) }} />
    </MemoryRouter>
  </MockApolloProvider>
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
    moderators: [],
  },
}
