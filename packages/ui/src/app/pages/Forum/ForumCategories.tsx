import React from 'react'

import { PageLayout } from '@/app/components/PageLayout'
import { Loading } from '@/common/components/Loading'
import { RouterLink } from '@/common/components/RouterLink'
import { useForumCategories } from '@/forum/hooks/useForumCategories'

export const ForumCategories = () => {
  const { isLoading, forumCategories } = useForumCategories()

  return (
    <PageLayout
      header={<h2>Categories</h2>}
      main={
        <div>
          {isLoading && <Loading />}
          {!isLoading &&
            forumCategories.length &&
            forumCategories.map((category) => {
              return (
                <div key={category.id}>
                  {category.id} | <RouterLink to={`/forum/category/${category.id}`}> {category.title}</RouterLink>
                </div>
              )
            })}
        </div>
      }
    />
  )
}
