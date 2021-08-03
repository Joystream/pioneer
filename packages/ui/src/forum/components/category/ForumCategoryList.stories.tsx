import { Meta, Story } from '@storybook/react'
import React, { useEffect, useState } from 'react'
import { MemoryRouter } from 'react-router'

import { repeat } from '@/common/utils'
import { asForumCategory, ForumCategory } from '@/forum/types'
import { MockApolloProvider } from '@/mocks/components/storybook/MockApolloProvider'

import { ForumCategoryList } from './ForumCategoryList'
import { asStorybookModerator } from './storybook-helpers'

export default {
  title: 'Forum/Categories/ForumCategoryList',
  component: ForumCategoryList,
} as Meta

const defaultModerators = repeat(asStorybookModerator(false), 14)

const Template: Story = () => {
  const [categories, setCategories] = useState<ForumCategory[]>([])

  useEffect(() => {
    import('@/mocks/data/raw/forumCategories.json').then((rawCategories) => {
      const categories = rawCategories.default.slice(0, 10).map((rawCategory) => {
        const category = asForumCategory({ ...rawCategory, moderators: [] })
        const subcategories = 'Lorem ipsum, Dolor, Name, Name'
          .split(', ')
          .map((title, index) => ({ id: String(index), title }))

        return { ...category, threadCount: 25, moderators: defaultModerators, subcategories }
      })
      setCategories(categories)
    })
  }, [])

  useEffect(() => {
    if (categories.length) {
      const timeout = setTimeout(() => {
        const moderators = [...repeat(asStorybookModerator(true), 4), ...defaultModerators.slice(4)]
        setCategories(categories.map((category) => ({ ...category, moderators })))
      }, 2000)
      return () => {
        clearTimeout(timeout)
      }
    }
  }, [categories.length])

  return (
    <MockApolloProvider members forum>
      <MemoryRouter>
        <ForumCategoryList categories={categories} />
      </MemoryRouter>
    </MockApolloProvider>
  )
}

export const Default = Template.bind({})
Default.args = {}
