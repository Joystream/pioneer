import React from 'react'
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
      <SubcategoryLink key={id} to={'/'} size="small">
        {title}
      </SubcategoryLink>
    ))

  return (
    <CategoryListItemStyles $colLayout={categoriesColLayout(isArchive)}>
      <Category>
        <CategoryListItemTitle
          as={GhostRouterLink}
          to={`${ForumRoutes.category}/${category.id}${isArchive ? '/archive' : ''}`}
        >
          {category.title}
        </CategoryListItemTitle>
        <TextMedium light>{category.description}</TextMedium>

        {subcategories.length > 0 && (
          <TextInlineExtraSmall lighter>Subcategories: {intersperse(subcategories, ', ')}</TextInlineExtraSmall>
        )}
      </Category>

      <ThreadCount categoryId={category.id} />

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

export interface CategoryItemFieldProps {
  categoryId: string
}

const CategoryListItemTitle = styled.h5`
  font-size: 16px;
  line-height: 24px;
  font-family: ${Fonts.Grotesk};
  font-weight: 700;
  color: ${Colors.Black[900]};
  transition: ${Transitions.all};

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
