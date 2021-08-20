import { Meta, Story } from '@storybook/react'
import React, { useState } from 'react'
import { MemoryRouter } from 'react-router'

import { Loading } from '@/common/components/Loading'
import { GetForumCategoriesDocument, GetForumCategoriesQuery, GetForumCategoriesQueryVariables } from '@/forum/queries'
import { asForumCategory, ForumCategory } from '@/forum/types'
import { MockApolloProvider, Query } from '@/mocks/components/storybook/MockApolloProvider'

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
            variables: {},
          })
          setCategories(data.forumCategories.slice(0, 3).map(asForumCategory))
        }}
      />
      <MemoryRouter>
        {!categories.length ? <Loading /> : <ForumCategoryList categories={categories} isArchive={isArchive} />}
      </MemoryRouter>
    </MockApolloProvider>
  )
}

export const Default = Template.bind({})
Default.args = {
  isArchive: false,
}
