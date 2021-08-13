import { Meta, Story } from '@storybook/react'
import React from 'react'
import { MemoryRouter } from 'react-router'

import { asArray, repeat } from '@/common/utils'
import { asStorybookModerator, asStorybookPost, asStorybookThread } from '@/forum/helpers/storybook'
import { MockApolloProvider } from '@/mocks/components/storybook/MockApolloProvider'
import { RawForumCategoryMock } from '@/mocks/data/seedForum'

import { CategoryListItem } from './CategoryListItem'

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
  subcategoriesTitles: string[]
  category: RawForumCategoryMock
}
const Template: Story<Props> = ({ category, latestPostText, topThreadTitle, moderatorsCount, subcategoriesTitles }) => {
  const thread = asStorybookThread(topThreadTitle, category.id)
  const post = asStorybookPost(latestPostText, thread?.id)
  const moderators = repeat(asStorybookModerator(), moderatorsCount)
  const subcategories = subcategoriesTitles.map((title, index) => ({ id: `${index}`, title }))

  return (
    <MockApolloProvider members forum={{ categories: [category], threads: asArray(thread), posts: asArray(post) }}>
      <MemoryRouter>
        <CategoryListItem category={{ ...category, moderators, subcategories }} />
      </MemoryRouter>
    </MockApolloProvider>
  )
}

export const Default = Template.bind({})
Default.args = {
  latestPostText: 'Re: 🔥Can anyone tell me more',
  topThreadTitle: '🔥Can anyone tell me more',
  moderatorsCount: 14,
  subcategoriesTitles: ['Lorem ipsum', 'Dolor', 'Name', 'Name'],
  category: {
    id: 'CategoryListItem-story',
    title: 'General',
    description:
      'Morbi sed consectetur turpis. Nulla viverra id eros ut lorem fringilla. Lorem Vestibulum congue fermentu.',
    moderatorIds: [],
  },
}
