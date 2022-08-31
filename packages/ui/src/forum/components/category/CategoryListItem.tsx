import React from 'react'
import { generatePath } from 'react-router'
import styled from 'styled-components'

import { BlockTimeWrapper } from '@/common/components/BlockTime'
import { LinkButtonInnerWrapper, LinkButtonLink } from '@/common/components/buttons/LinkButtons'
import { ArrowRightIcon } from '@/common/components/icons'
import { AnswerIcon } from '@/common/components/icons/AnswerIcon'
import { TableListItem, TableListItemAsLinkHover } from '@/common/components/List'
import { GhostRouterLink } from '@/common/components/RouterLink'
import { TextInlineExtraSmall, TextInlineMedium, TextMedium } from '@/common/components/typography'
import { Colors, Fonts, Overflow, Transitions } from '@/common/constants'
import { ForumRoutes } from '@/forum/constant'
import { ForumCategory } from '@/forum/types'
import { MemberStackStyles } from '@/memberships/components/MemberStack'

import { PostInfoStyles } from './LatestPost'
import { ThreadInfoStyles } from './PopularThread'
import { ThreadCount } from './ThreadCount'

export interface CategoryListItemProps {
  category: ForumCategory
  isArchive?: boolean
}
export const CategoryListItem = ({ category, isArchive = false }: CategoryListItemProps) => {
  return (
    <CategoryListItemStyles>
      <Category>
        <CategoryListItemTitle as={GhostRouterLink} to={categoryLink(category.id, isArchive)}>
          {category.title}
        </CategoryListItemTitle>
        <TextMedium light>{category.description}</TextMedium>
      </Category>

      <InfoWrapper>
        <Info>
          <StyledAnswerIcon />
          <ThreadCount categoryId={category.id} isArchive={isArchive} />
        </Info>
        <ArrowRightIcon />
      </InfoWrapper>
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
  align-items: center;
  height: 128px;
  padding: 14px 24px;
  display: flex;
  justify-content: space-between;
  width: 100%;

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

const Info = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 6px;
`

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 20px;
  svg {
    color: ${Colors.Black[300]};
    &:hover {
      ${CategoryListItemTitle} {
        color: ${Colors.Blue[500]};
      }
    }
  }
`

const StyledAnswerIcon = styled(AnswerIcon)`
  color: ${Colors.Black[300]};
`
