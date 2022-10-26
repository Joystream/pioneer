import React, { useMemo } from 'react'
import { generatePath, Link } from 'react-router-dom'
import styled, { css } from 'styled-components'

import { BadgeStatusCss } from '@/common/components/BadgeStatus'
import { CountBadge } from '@/common/components/CountBadge'
import { Arrow } from '@/common/components/icons'
import { AnswerIcon } from '@/common/components/icons/AnswerIcon'
import { TextBig, TextMedium } from '@/common/components/typography'
import { BorderRad, Colors, RemoveScrollbar } from '@/common/constants'
import { ForumRoutes } from '@/forum/constant'
import { ForumCategory } from '@/forum/types'

export interface CategoryCardProps {
  category: ForumCategory
  className?: string
}

// In case of different onClick event for message icon and box as whole, remember to stop propagation of msg onClick event
export const CategoryCard = ({ className, category }: CategoryCardProps) => {
  const hoverComponent = useMemo(() => {
    return (
      <CategoriesBox id="category-subcategories">
        {category.subcategories.length &&
          category.subcategories.map((subcategory) => (
            <StyledBadge key={subcategory.title} to={generatePath(ForumRoutes.category, { id: subcategory.id })}>
              {subcategory.title}
            </StyledBadge>
          ))}
      </CategoriesBox>
    )
  }, [category.subcategories.length])

  return (
    <Box
      className={className}
      to={generatePath(ForumRoutes.category, { id: category.id })}
      ignoreHover={!category.subcategories.length}
    >
      <div>
        <TextBig bold value black>
          {category.title}
        </TextBig>
        {hoverComponent}
        <TextMedium id="category-description" normalWeight inter lighter truncateLines={2}>
          {category.description}
        </TextMedium>
      </div>
      <div>
        <AnswerIcon />
        <CountBadge count={category.subcategories.length} />
      </div>
      <Arrow direction="right" />
    </Box>
  )
}

const StyledBadge = styled(Link)`
  ${BadgeStatusCss}
`

const Box = styled(Link)<{ ignoreHover?: boolean }>`
  text-decoration: none;
  display: flex;
  column-gap: 15px;
  border: 1px solid ${Colors.Black[100]};
  border-radius: ${BorderRad.s};
  padding: 19px;
  height: 108px;

  > *:nth-child(1) {
    display: grid;
    row-gap: 5px;
    flex: 1;
  }

  > *:nth-child(2) {
    align-self: center;
    display: flex;
    gap: 5px;
    align-items: center;

    svg {
      color: ${Colors.Black[300]};

      :hover {
        color: ${Colors.LogoPurple};
      }
    }
  }

  > *:last-child {
    align-self: center;
    cursor: pointer;
    height: 100%;
    display: flex;
    align-items: center;
    color: ${Colors.Black[300]};

    :hover {
      color: ${Colors.LogoPurple};
    }
  }

  #category-subcategories {
    display: none;
  }

  ${({ ignoreHover }) =>
    !ignoreHover &&
    css`
      :hover {
        #category-subcategories {
          display: flex;
        }

        #category-description {
          display: none;
        }
      }
    `}
`

const CategoriesBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;

  overflow-y: auto;
  ${RemoveScrollbar}
`
