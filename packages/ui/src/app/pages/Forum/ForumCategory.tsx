import React from 'react'
import { useParams } from 'react-router-dom'

import { PageLayout } from '@/app/components/PageLayout'
import { ButtonPrimary } from '@/common/components/buttons'
import { Loading } from '@/common/components/Loading'
import { RouterLink } from '@/common/components/RouterLink'
import { useModal } from '@/common/hooks/useModal'
import { useForumCategoryThreads } from '@/forum/hooks/useForumCategoryThreads'

export const ForumCategory = () => {
  const { id } = useParams<{ id: string }>()

  const { isLoading, threads } = useForumCategoryThreads(id)
  const { showModal } = useModal()

  return (
    <PageLayout
      header={<h2>Category</h2>}
      main={
        <div>
          {isLoading && <Loading />}
          {!isLoading && (
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
