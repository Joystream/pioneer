import React from 'react'
import { useParams } from 'react-router-dom'

import { PageLayout } from '@/app/components/PageLayout'
import { ButtonPrimary } from '@/common/components/buttons'
import { Loading } from '@/common/components/Loading'
import { RouterLink } from '@/common/components/RouterLink'
import { useModal } from '@/common/hooks/useModal'
import { useForumCategory } from '@/forum/hooks/useForumCategory'
import { useForumCategoryThreads } from '@/forum/hooks/useForumCategoryThreads'

export const ForumCategory = () => {
  const { id } = useParams<{ id: string }>()
  const { category } = useForumCategory(id)
  const { isLoading: isLoadingThreads, threads } = useForumCategoryThreads(id)
  const { showModal } = useModal()

  if (!category) return <Loading />

  return (
    <PageLayout
      header={<h2>Category</h2>}
      main={
        <div>
          {isLoadingThreads ? (
            <Loading />
          ) : (
            <>
              <ButtonPrimary
                size="medium"
                onClick={() => showModal({ modal: 'CreateThreadModal', data: { categoryId: id } })}
              >
                Create a Thread
              </ButtonPrimary>
              {threads.map((thread) => {
                return (
                  <div key={thread.id}>
                    <RouterLink to={'/forum/thread/' + thread.id}>
                      {thread.id} | {thread.isSticky ? '📌' : ''} {thread.title}
                    </RouterLink>
                  </div>
                )
              })}
            </>
          )}
        </div>
      }
    />
  )
}
