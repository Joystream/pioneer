import React, { useMemo, useState } from 'react'
import { generatePath, useHistory } from 'react-router-dom'
import styled from 'styled-components'

import { BadgeStatus } from '@/common/components/BadgeStatus'
import { CountBadge } from '@/common/components/CountBadge'
import { Arrow } from '@/common/components/icons'
import { AnswerIcon } from '@/common/components/icons/AnswerIcon'
import { TextBig, TextMedium } from '@/common/components/typography'
import { BorderRad, Colors } from '@/common/constants'
import { ForumRoutes } from '@/forum/constant'
import { ForumCategory } from '@/forum/types'

interface CategoryCardProps {
  category: ForumCategory
  className?: string
}

// In case of different onClick event for message icon and box as whole, remember to stop propagation of msg onClick event
export const CategoryCard = ({ className, category }: CategoryCardProps) => {
  const [isHovered, setIsHovered] = useState<boolean>(false)
  const { push } = useHistory()
  const hoverComponent = useMemo(() => {
    return (
      <CategoriesBox>
        {category.subcategories.length
          ? category.subcategories.map((subcategory) => (
              <StyledBadge onClick={() => push(generatePath(ForumRoutes.category, { id: subcategory.id }))}>
                {subcategory.title}
              </StyledBadge>
            ))
          : 'No subcategories'}
      </CategoriesBox>
    )
  }, [])

  return (
    <Box className={className} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      <div>
        <TextBig bold value>
          {category.title}
        </TextBig>
        {isHovered ? (
          hoverComponent
        ) : (
          <TextMedium normalWeight inter lighter>
            {category.description}
          </TextMedium>
        )}
      </div>
      <div>
        <AnswerIcon />
        <CountBadge count={1} />
      </div>
      <span
        onClick={(e) => {
          e.stopPropagation()
          push(generatePath(ForumRoutes.category, { id: category.id }))
        }}
      >
        <Arrow direction="right" />
      </span>
    </Box>
  )
}

const StyledBadge = styled(BadgeStatus)`
  cursor: pointer;
`

const Box = styled.div`
  display: flex;
  column-gap: 15px;
  border: 1px solid ${Colors.Black[100]};
  border-radius: ${BorderRad.s};
  padding: 21px;
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
  }
`

const CategoriesBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`
