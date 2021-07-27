import React from 'react'
import { useParams } from 'react-router-dom'

import { PageLayout } from '@/app/components/PageLayout'
import { Loading } from '@/common/components/Loading'
import { useForumCategoryThreads } from '@/forum/hooks/useForumCategoryThreads'

export const ForumCategory = () => {
  const { id } = useParams<{ id: string }>()

  const { isLoading, threads } = useForumCategoryThreads(id)

  return (
    <PageLayout
      header={<h2>Category</h2>}
      main={
        <div>
          {isLoading && <Loading />}
          {!isLoading &&
            threads.length &&
            threads.map((thread) => {
              return (
                <div key={thread.id}>
                  {thread.id} | {thread.isSticky ? '📌' : ''} {thread.title}
                </div>
              )
            })}
        </div>
      }
    />
  )
}
