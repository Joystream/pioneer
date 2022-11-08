import React from 'react'
import { generatePath } from 'react-router'
import styled from 'styled-components'

import { BlockTime, BlockTimeWrapper } from '@/common/components/BlockTime'
import { LinkButtonInnerWrapper, LinkButtonLink } from '@/common/components/buttons/LinkButtons'
import { TableListItem, TableListItemAsLinkHover } from '@/common/components/List'
import { GhostRouterLink } from '@/common/components/RouterLink'
import { TextInlineExtraSmall, TextInlineMedium, TextMedium } from '@/common/components/typography'
import { Colors, Fonts, Overflow, Transitions } from '@/common/constants'
import { intersperse } from '@/common/utils'
import { categoriesColLayout, ForumRoutes } from '@/forum/constant'
import { CategoryStatusType, ForumCategory } from '@/forum/types'
import { MemberStack, MemberStackStyles, moderatorsSummary } from '@/memberships/components/MemberStack'

import { LatestPost, PostInfoStyles } from './LatestPost'
import { PopularThread, ThreadInfoStyles } from './PopularThread'
import { ThreadCount } from './ThreadCount'

export interface CategoryListItemProps {
  category: ForumCategory
  isArchive?: boolean
}
export const CategoryListItem = ({ category, isArchive = false }: CategoryListItemProps) => {
  const block = category.status.categoryArchivalStatusUpdatedEvent

  const expectedStatus: CategoryStatusType = isArchive ? 'CategoryStatusArchived' : 'CategoryStatusActive'
  const subcategories = category.subcategories
    .filter(({ status }) => status === expectedStatus)
    .map(({ id, title }) => (
      <SubcategoryLink key={id} to={categoryLink(id, isArchive)} size="small">
        {title}
      </SubcategoryLink>
    ))

  return (
    <CategoryListItemStyles $colLayout={categoriesColLayout(isArchive)}>
      <Category>
        <CategoryListItemTitle as={GhostRouterLink} to={categoryLink(category.id, isArchive)}>
          {category.title}
        </CategoryListItemTitle>
        <TextMedium light>{category.description}</TextMedium>

        {subcategories.length > 0 && (
          <TextInlineExtraSmall lighter>Subcategories: {intersperse(subcategories, () => ', ')}</TextInlineExtraSmall>
        )}
      </Category>

      <ThreadCount categoryId={category.id} isArchive={isArchive} />

      <LatestPost categoryId={category.id} />

      {isArchive ? (
        block && <BlockTime block={block} layout="column" />
      ) : (
        <>
          <PopularThread categoryId={category.id} />
          <MemberStack members={moderatorsSummary(category.moderators)} max={5} />
        </>
      )}
    </CategoryListItemStyles>
  )
}

const categoryLink = (id: string, isArchive: boolean) =>
  generatePath(ForumRoutes.category, { id, type: isArchive ? 'archive' : undefined })

export interface CategoryItemFieldProps {
  categoryId: string
  isArchive?: boolean
}

const CategoryListItemTitle = styled.h5`
  display: inline-block;
  font-size: 16px;
  line-height: 24px;
  font-family: ${Fonts.Grotesk};
  font-weight: 700;
  color: ${Colors.Black[900]};
  transition: ${Transitions.all};
  ${Overflow.FullDots};

  &:before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
  }
`

export const CategoryListItemStyles = styled(TableListItem)`
  position: relative;
  align-items: start;
  height: 128px;
  padding: 14px 24px;

  ${TableListItemAsLinkHover};

  & > * {
    margin-top: 8px;
  }

  &:hover,
  &:focus,
  &:focus-within {
    ${CategoryListItemTitle} {
      color: ${Colors.Blue[500]};
    }
  }

  ${TextMedium},
  ${TextInlineExtraSmall},
  ${TextInlineMedium},
  ${PostInfoStyles},
  ${BlockTimeWrapper},
  ${ThreadInfoStyles},
  ${MemberStackStyles} {
    z-index: 2;
  }
`

const Category = styled.div`
  margin: 0;
  ${TextMedium} {
    color: ${Colors.Black[500]};
    margin: 12px 0 4px;
    ${Overflow.DotsTwoLine};
  }
  ${TextInlineExtraSmall} {
    ${Overflow.FullDots};
  }
`

const SubcategoryLink = styled(LinkButtonLink)`
  &,
  &:visited {
    display: inline-flex;
    font-size: inherit;
    line-height: 12px;
    font-weight: inherit;
    color: inherit;
    border: none;

    &:before {
      bottom: 0;
      background-color: ${Colors.Black[400]};
      transform: translateX(calc(-100% - 2px));
    }
    ${LinkButtonInnerWrapper} {
      transform: translateY(0);
    }
  }
  &:hover {
    &:before {
      transform: translateX(0%);
    }
  }
`
