import React from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'

import { PageHeaderRow, PageHeaderWrapper, PageLayout } from '@/app/components/PageLayout'
import { ButtonPrimary, ButtonsGroup } from '@/common/components/buttons'
import { CountBadge } from '@/common/components/CountBadge'
import { PlusIcon } from '@/common/components/icons/PlusIcon'
import { Loading } from '@/common/components/Loading'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { PageTitle } from '@/common/components/page/PageTitle'
import { PreviousPage } from '@/common/components/page/PreviousPage'
import { RouterLink } from '@/common/components/RouterLink'
import { TabContainer } from '@/common/components/Tabs'
import { Label } from '@/common/components/typography'
import { Colors } from '@/common/constants'
import { useModal } from '@/common/hooks/useModal'
import { ForumCategoryList } from '@/forum/components/category'
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

          <RowGapBlock gap={24}>
            <ModeratorsContainer>
              Moderators: <MemberStack members={moderatorsSumary(category.moderators)} max={5} />
            </ModeratorsContainer>
            <CategoriesCount as="h4">
              Categories <CountBadge count={category.subcategories.length} />
            </CategoriesCount>
          </RowGapBlock>
        </PageHeaderWrapper>
      }
      main={
        <div>
          {category.subcategories.length > 0 && <ForumCategoryList categories={category.subcategories} />}

          {isLoadingThreads ? (
            <Loading />
          ) : (
            <>
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

const CategoriesCount = styled(TabContainer).attrs({ active: true })`
  cursor: unset;
  &:hover,
  &:focus,
  &:focus-within {
    color: ${Colors.Black[900]};
    -webkit-text-stroke-color: unset;
  }
  &::before {
    display: none;
  }
`

const ModeratorsContainer = styled(Label)`
  align-items: center;
`
