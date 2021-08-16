import React, { Reducer, useReducer } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'

import { PageHeaderRow, PageHeaderWrapper, PageLayout } from '@/app/components/PageLayout'
import { ButtonPrimary, ButtonsGroup } from '@/common/components/buttons'
import { PlusIcon } from '@/common/components/icons/PlusIcon'
import { ItemCount } from '@/common/components/ItemCount'
import { Loading } from '@/common/components/Loading'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { PageTitle } from '@/common/components/page/PageTitle'
import { PreviousPage } from '@/common/components/page/PreviousPage'
import { Label } from '@/common/components/typography'
import { useModal } from '@/common/hooks/useModal'
import { merge } from '@/common/utils'
import { ForumCategoryList } from '@/forum/components/category'
import { ThreadFilters } from '@/forum/components/threads/ThreadFilters'
import { ThreadList } from '@/forum/components/threads/ThreadList'
import { useForumCategory } from '@/forum/hooks/useForumCategory'
import { ThreadsDefaultOptions, ThreadsOptions, useForumCategoryThreads } from '@/forum/hooks/useForumCategoryThreads'
import { MemberStack, moderatorsSumary } from '@/memberships/components/MemberStack'

const threadOptionReducer: Reducer<ThreadsOptions, Partial<ThreadsOptions>> = merge

export const ForumCategory = () => {
  const { id } = useParams<{ id: string }>()
  const { category } = useForumCategory(id)

  const [threadOption, dispatchThreadOption] = useReducer(threadOptionReducer, ThreadsDefaultOptions)
  const { isLoading: isLoadingThreads, threads, threadCount } = useForumCategoryThreads(id, threadOption)

  const { showModal } = useModal()

  if (!category) return <Loading />

  return (
    <PageLayout
      lastBreadcrumb={category.title}
      header={
        <PageHeaderWrapper>
          <PageHeaderRow>
            <PreviousPage>
              <PageTitle>{category.title}</PageTitle>
            </PreviousPage>
            <ButtonsGroup>
              <ButtonPrimary
                size="medium"
                onClick={() => showModal({ modal: 'CreateThreadModal', data: { categoryId: id } })}
              >
                <PlusIcon /> Add New Thread
              </ButtonPrimary>
            </ButtonsGroup>
          </PageHeaderRow>

          <ModeratorsContainer>
            Moderators: <MemberStack members={moderatorsSumary(category.moderators)} max={5} />
          </ModeratorsContainer>
        </PageHeaderWrapper>
      }
      main={
        <>
          <RowGapBlock gap={24}>
            <ItemCount count={category.subcategories.length}>Categories</ItemCount>

            {category.subcategories.length > 0 && <ForumCategoryList categories={category.subcategories} />}
          </RowGapBlock>

          <RowGapBlock gap={24}>
            <ThreadFilters onApply={(filters) => dispatchThreadOption({ filters })}>
              <ItemCount count={threadCount ?? 0} size="xs">
                Threads
              </ItemCount>
            </ThreadFilters>

            <ThreadList
              threads={threads}
              onSort={(order) => dispatchThreadOption({ order })}
              isLoading={isLoadingThreads}
            />
          </RowGapBlock>
        </>
      }
    />
  )
}

const ModeratorsContainer = styled(Label)`
  align-items: center;
`
