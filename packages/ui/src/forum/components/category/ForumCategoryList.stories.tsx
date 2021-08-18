import { Meta, Story } from '@storybook/react'
import React, { useEffect, useState } from 'react'
import { MemoryRouter } from 'react-router'

import { Loading } from '@/common/components/Loading'
import { repeat } from '@/common/utils'
import { asStorybookModerator } from '@/forum/helpers/storybook'
import { asForumCategory, ForumCategory } from '@/forum/types'
import { MockApolloProvider } from '@/mocks/components/storybook/MockApolloProvider'

import { ForumCategoryList } from './ForumCategoryList'

export default {
  title: 'Forum/Categories/ForumCategoryList',
  component: ForumCategoryList,
} as Meta

const defaultModerators = repeat(asStorybookModerator(false), 14)

const Template: Story = ({ isArchive }) => {
  const [categories, setCategories] = useState<ForumCategory[]>([])

  useEffect(() => {
    import('@/mocks/data/raw/forumCategories.json').then((rawCategories) => {
      const categories = rawCategories.default.slice(0, 5).map((rawCategory) => {
        const category = asForumCategory({ ...rawCategory, moderators: [] })
        const subcategories = 'Lorem ipsum, Dolor, Name, Name'
          .split(', ')
          .map((title, index) => ({ id: String(index), title }))

        return { ...category, threadCount: 25, moderators: defaultModerators, subcategories }
      })
      setCategories(categories)
    })
  }, [])

  return (
    <MockApolloProvider members workers forum>
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
