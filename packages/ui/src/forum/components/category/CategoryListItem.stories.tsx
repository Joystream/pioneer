import { Meta, Story } from '@storybook/react'
import React from 'react'

import { asArray, repeat } from '@/common/utils'
import { asStorybookModerator, asStorybookPost, asStorybookThread } from '@/forum/helpers/storybook'
import { ForumCategoryFieldsFragment } from '@/forum/queries'
import { asForumCategory } from '@/forum/types'
import { MockApolloProvider } from '@/mocks/components/storybook/MockApolloProvider'
import { RawForumCategoryMock } from '@/mocks/data/seedForum'
import { randomRawBlock } from '@/mocks/helpers/randomBlock'

import { CategoryListItem } from './CategoryListItem'

export default {
  title: 'Forum/Categories/CategoryListItem',
  component: CategoryListItem,
  argTypes: { moderatorsCount: { control: { type: 'range', min: 0, max: 20 } } },
  parameters: { controls: { exclude: ['latestPost', 'topThread', 'moderators'] } },
} as Meta

interface Props {
  isArchive: boolean
  latestPostText: string
  topThreadTitle: string
  moderatorsCount: number
  subcategoriesTitles: string[]
  category: RawForumCategoryMock
}
const Template: Story<Props> = ({
  category: rawCategory,
  isArchive,
  latestPostText,
  topThreadTitle,
  moderatorsCount,
  subcategoriesTitles,
}) => {
  const thread = asStorybookThread(topThreadTitle, rawCategory.id)
  const post = asStorybookPost(latestPostText, thread?.id)
  const category = {
    ...asForumCategory(rawCategory as unknown as ForumCategoryFieldsFragment),
    moderators: repeat(asStorybookModerator(), moderatorsCount),
    subcategories: subcategoriesTitles.map((title, index) => ({
      id: `${index}`,
      title,
      status: isArchive ? ('CategoryStatusArchived' as const) : ('CategoryStatusActive' as const),
    })),
  }
  return (
    <MockApolloProvider members forum={{ categories: [rawCategory], threads: asArray(thread), posts: asArray(post) }}>
      <CategoryListItem category={category} isArchive={isArchive} />
    </MockApolloProvider>
  )
}

export const Default = Template.bind({})
Default.args = {
  isArchive: false,
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
    status: { __typename: 'CategoryStatusArchived', categoryArchivalStatusUpdatedEvent: randomRawBlock() },
  },
}
