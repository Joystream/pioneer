import { Meta, Story } from '@storybook/react'
import React from 'react'
import { MemoryRouter } from 'react-router'

import { ForumCategoryFieldsFragment } from '@/forum/queries'
import { asForumCategory } from '@/forum/types'
import { MockApolloProvider } from '@/mocks/components/storybook/MockApolloProvider'
import { RawForumCategoryMock } from '@/mocks/data/seedForum'
import { randomRawBlock } from '@/mocks/helpers/randomBlock'

import { CategoryListItem } from './CategoryListItem'

export default {
  title: 'Forum/Categories/CategoryListItem',
  component: CategoryListItem,
} as Meta

interface Props {
  isArchive: boolean
  category: RawForumCategoryMock
}
const Template: Story<Props> = ({ category: rawCategory, isArchive }) => {
  const category = {
    ...asForumCategory(rawCategory as unknown as ForumCategoryFieldsFragment),
  }
  return (
    <MockApolloProvider members>
      <MemoryRouter>
        <CategoryListItem category={category} isArchive={isArchive} />
      </MemoryRouter>
    </MockApolloProvider>
  )
}

export const Default = Template.bind({})
Default.args = {
  isArchive: false,
  category: {
    id: 'CategoryListItem-story',
    title: 'General',
    description:
      'Morbi sed consectetur turpis. Nulla viverra id eros ut lorem fringilla. Lorem Vestibulum congue fermentu.',
    moderatorIds: [],
    status: { __typename: 'CategoryStatusArchived', categoryArchivalStatusUpdatedEvent: randomRawBlock() },
  },
}
