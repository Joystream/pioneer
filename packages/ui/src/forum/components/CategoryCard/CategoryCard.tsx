import React, { useMemo, useState } from 'react'
import styled from 'styled-components'

import { BadgeStatus } from '@/common/components/BadgeStatus'
import { CountBadge } from '@/common/components/CountBadge'
import { Arrow } from '@/common/components/icons'
import { AnswerIcon } from '@/common/components/icons/AnswerIcon'
import { TextBig, TextMedium } from '@/common/components/typography'
import { BorderRad, Colors } from '@/common/constants'

const categories = ['forum', 'content', 'builders']

// In case of different onClick event for message icon and box as whole, remember to stop propagation of msg onClick event
export const CategoryCard = () => {
  const [isHovered, setIsHovered] = useState<boolean>(false)

  const hoverComponent = useMemo(() => {
    return (
      <CategoriesBox>
        {categories.map((category) => (
          <BadgeStatus>{category}</BadgeStatus>
        ))}
      </CategoriesBox>
    )
  }, [])

  return (
    <Box onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      <div>
        <TextBig bold value>
          Working Groups
        </TextBig>
        {isHovered ? (
          hoverComponent
        ) : (
          <TextMedium normalWeight inter lighter>
            In this category you can find or post the information, questions about all the Working Groups
          </TextMedium>
        )}
      </div>
      <div>
        <AnswerIcon />
        <CountBadge count={1} />
      </div>
      <Arrow direction="right" />
    </Box>
  )
}

const Box = styled.div`
  display: flex;
  column-gap: 15px;
  width: 500px;
  border: 1px solid ${Colors.Black[100]};
  border-radius: ${BorderRad.s};
  padding: 21px;
  height: 108px;
  cursor: pointer;

  :hover > *:last-child {
    color: ${Colors.LogoPurple};
  }

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
  }
`

const CategoriesBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`
