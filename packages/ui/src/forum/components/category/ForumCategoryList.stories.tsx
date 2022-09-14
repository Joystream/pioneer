import { Meta, Story } from '@storybook/react'
import React, { useState } from 'react'

import { Loader } from '@/common/components/icons'
import {
  ForumCategoryFieldsFragment,
  GetForumCategoriesDocument,
  GetForumCategoriesQuery,
  GetForumCategoriesQueryVariables,
} from '@/forum/queries'
import { asForumCategory, ForumCategory } from '@/forum/types'
import { MockApolloProvider, Query } from '@/mocks/components/storybook/MockApolloProvider'
import { randomBlock } from '@/mocks/helpers/randomBlock'

import { ForumCategoryList } from './ForumCategoryList'

export default {
  title: 'Forum/Categories/ForumCategoryList',
  component: ForumCategoryList,
} as Meta

const Template: Story = ({ isArchive }) => {
  const [categories, setCategories] = useState<ForumCategory[]>([])

  return (
    <MockApolloProvider members workers forum>
      <Query
        call={async (client) => {
          const { data } = await client.query<GetForumCategoriesQuery, GetForumCategoriesQueryVariables>({
            query: GetForumCategoriesDocument,
            variables: { where: { id_in: ['0', '1', '2'] } },
          })
          setCategories(data.forumCategories.map(asCategory))
        }}
      />

      {!categories.length ? <Loader /> : <ForumCategoryList categories={categories} isArchive={isArchive} />}
    </MockApolloProvider>
  )
}

export const Default = Template.bind({})
Default.args = {
  isArchive: false,
}

const asCategory = (category: ForumCategoryFieldsFragment): ForumCategory => ({
  ...asForumCategory(category),
  status: {
    __typename: 'CategoryStatusArchived',
    categoryArchivalStatusUpdatedEvent: randomBlock(),
  },
})
