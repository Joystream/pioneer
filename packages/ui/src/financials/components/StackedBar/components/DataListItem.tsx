import React, { ReactNode } from 'react'
import styled, { css } from 'styled-components'

import { Arrow } from '@/common/components/icons'
import { ColumnGapBlock } from '@/common/components/page/PageContent'
import { TextMedium } from '@/common/components/typography'
import { Colors } from '@/common/constants'

interface Props {
  color: string
  title: string
  value: ReactNode
  percentage: number
  isActive: boolean
  isPreview?: boolean
  onClick: () => void
}

export const DataListItem = ({ value, title, color, percentage, isActive, onClick, isPreview }: Props) => {
  return (
    <Wrapper isActive={isActive || !!isPreview} onClick={onClick}>
      <TextMedium value bold={isActive}>
        <ColorDot color={color} />
        {title}
      </TextMedium>
      <ValueContainer gap={20}>
        {value}
        <TextMedium value bold>
          {Math.round(percentage)}%
        </TextMedium>
        {isActive && <Arrow direction="left" />}
      </ValueContainer>
    </Wrapper>
  )
}

const ActiveCss = css`
  background-color: ${Colors.Black[50]};
  border: 1px solid ${Colors.Black[200]};
  border-right: none;

  &::after {
    position: absolute;
    background-color: ${Colors.Black[50]};
    content: '';
    height: 100%;
    width: 1px;
    right: -1px;
  }
`

const Wrapper = styled.div<{ isActive: boolean }>`
  display: flex;
  cursor: pointer;
  justify-content: space-between;
  align-items: center;
  padding: 5px 10px;
  border: 1px solid transparent;
  border-right: none;
  position: relative;

  ${({ isActive }) => {
    if (isActive) {
      return ActiveCss
    }
  }}

  :hover {
    ${ActiveCss}
  }

  > * {
    flex: 1;
    min-width: 0;
  }

  ${TextMedium} {
    display: flex;
    column-gap: 5px;
    align-items: center;
  }
`

const ValueContainer = styled(ColumnGapBlock)`
  justify-items: end;
  align-items: center;
  grid-template-columns: 1fr 20px 10px;
`

const ColorDot = styled.div<{ color: string }>`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${({ color }) => color};
`
