import React from 'react'
import styled from 'styled-components'

import { BlockTime } from '@/common/components/BlockTime'
import { LinkButtonInnerWrapper, LinkButtonLink } from '@/common/components/buttons/LinkButtons'
import { TableListItem, TableListItemAsLinkHover } from '@/common/components/List'
import { GhostRouterLink } from '@/common/components/RouterLink'
import { TextInlineExtraSmall, TextMedium } from '@/common/components/typography'
import { Colors, Overflow } from '@/common/constants'
import { categoriesColLayout, ForumRoutes } from '@/forum/constant'
import { ForumCategory } from '@/forum/types'
import { MemberStack, moderatorsSummary } from '@/memberships/components/MemberStack'

import { LatestPost } from './LatestPost'
import { PopularThread } from './PopularThread'
import { ThreadCount } from './ThreadCount'

export interface CategoryListItemProps {
  category: ForumCategory
  isArchive?: boolean
}
export const CategoryListItem = ({ category, isArchive = false }: CategoryListItemProps) => {
  const block = category.status.categoryArchivalStatusUpdatedEvent

  return (
    <CategoryListItemStyles
      as={GhostRouterLink}
      to={`${ForumRoutes.category}/${category.id}${isArchive ? '/archive' : ''}`}
      $colLayout={categoriesColLayout(isArchive)}
    >
      <Category>
        <h5>{category.title}</h5>
        <TextMedium light>{category.description}</TextMedium>
        <TextInlineExtraSmall lighter>
          Subcategories:{' '}
          {category.subcategories.map(({ title }, index) => (
            <>
              <SubcategoryLink key={index} to={'/'} size="small">
                {title}
              </SubcategoryLink>
              {index < category.subcategories.length - 1 && ', '}
            </>
          ))}
        </TextInlineExtraSmall>
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

export const CategoryListItemStyles = styled(TableListItem)`
  align-items: start;
  height: 128px;
  padding: 14px 24px;

  ${TableListItemAsLinkHover};

  & > * {
    margin-top: 8px;
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
    }
    ${LinkButtonInnerWrapper} {
      transform: translateY(0);
    }
  }
`
