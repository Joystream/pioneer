import { Meta, Story } from '@storybook/react'
import React, { useEffect, useState } from 'react'
import { MemoryRouter } from 'react-router'

import { repeat } from '@/common/utils'
import { asForumCategory } from '@/forum/types'

import { CategoryListItemProps } from './CategoryListItem'
import { ForumCategoryList } from './ForumCategoryList'
import { asStorybookModerator, asStorybookPost, asStorybookThread } from './storybook-helpers'

export default {
  title: 'Forum/Categories/ForumCategoryList',
  component: ForumCategoryList,
} as Meta

const defaultModerators = repeat(asStorybookModerator(false), 14)

const Template: Story = () => {
  const [categories, setCategories] = useState<CategoryListItemProps[]>([])

  useEffect(() => {
    import('@/mocks/data/raw/forumCategories.json').then((rawCategories) => {
      const categories = rawCategories.default.slice(0, 10).map((rawCategory) => {
        const category = asForumCategory(rawCategory)
        const subcategories = 'Lorem ipsum, Dolor, Name, Name'
          .split(', ')
          .map((title, index) => ({ id: String(index), title }))
        return { category: { ...category, threadCount: 25, moderators: defaultModerators, subcategories } }
      })
      setCategories(categories)
    })
  }, [])

  useEffect(() => {
    if (categories.length) {
      const timeout = setTimeout(() => {
        const moderators = [...repeat(asStorybookModerator(true), 4), ...defaultModerators.slice(4)]
        setCategories(
          categories.map(({ category }) => ({
            category: { ...category, moderators },
            latestPost: asStorybookPost(category.description),
            topThread: asStorybookThread(category.title),
          }))
        )
      }, 2000)
      return () => {
        clearTimeout(timeout)
      }
    }
  }, [categories.length])

  return (
    <MemoryRouter>
      <ForumCategoryList categories={categories} />
    </MemoryRouter>
  )
}

export const Default = Template.bind({})
Default.args = {}
