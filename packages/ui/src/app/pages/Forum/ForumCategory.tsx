import React from 'react'
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
import { ForumCategoryList } from '@/forum/components/category'
import { ThreadFilters } from '@/forum/components/threads/ThreadFilters'
import { ThreadList } from '@/forum/components/threads/ThreadList'
import { useForumCategory } from '@/forum/hooks/useForumCategory'
import { useForumCategoryThreads } from '@/forum/hooks/useForumCategoryThreads'
import { MemberStack, moderatorsSumary } from '@/memberships/components/MemberStack'

export const ForumCategory = () => {
  const { id } = useParams<{ id: string }>()
  const { category } = useForumCategory(id)
  const { isLoading: isLoadingThreads, threads } = useForumCategoryThreads(id)
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
        <div>
          <RowGapBlock gap={24}>
            <ItemCount count={category.subcategories.length}>Categories</ItemCount>

            {category.subcategories.length > 0 && <ForumCategoryList categories={category.subcategories} />}
          </RowGapBlock>

          {isLoadingThreads ? (
            <Loading />
          ) : (
            <RowGapBlock gap={24}>
              <ThreadFilters onApply={() => undefined}>
                <ItemCount count={threads.length} size="xs">
                  Threads
                </ItemCount>
              </ThreadFilters>
              {threads.length > 0 && <ThreadList threads={threads} onSort={() => undefined} />}
            </RowGapBlock>
          )}
        </div>
      }
    />
  )
}

const ModeratorsContainer = styled(Label)`
  align-items: center;
`
