import { Meta } from '@storybook/react'
import React, { useState } from 'react'

import { Loading } from '@/common/components/Loading'
import { CategoryCard } from '@/forum/components/CategoryCard/CategoryCard'
import {
  ForumCategoryFieldsFragment,
  GetForumCategoriesDocument,
  GetForumCategoriesQuery,
  GetForumCategoriesQueryVariables,
} from '@/forum/queries'
import { asForumCategory, ForumCategory } from '@/forum/types'
import { MockApolloProvider, Query } from '@/mocks/components/storybook/MockApolloProvider'
import { randomBlock } from '@/mocks/helpers/randomBlock'

export default {
  title: 'Forum/Facelift/CategoryCard',
  component: CategoryCard,
} as Meta

export const Default = () => {
  const [categories, setCategories] = useState<ForumCategory[]>([])

  return (
    <MockApolloProvider members workers forum>
      <Query
        call={async (client) => {
          const { data } = await client.query<GetForumCategoriesQuery, GetForumCategoriesQueryVariables>({
            query: GetForumCategoriesDocument,
            variables: { where: { id_in: ['0'] } },
          })
          setCategories(data.forumCategories.map(asCategory))
        }}
      />

      {!categories.length ? <Loading /> : <CategoryCard category={categories[0]} />}
    </MockApolloProvider>
  )
}

const asCategory = (category: ForumCategoryFieldsFragment): ForumCategory => ({
  ...asForumCategory(category),
  status: {
    __typename: 'CategoryStatusArchived',
    categoryArchivalStatusUpdatedEvent: randomBlock(),
  },
})
