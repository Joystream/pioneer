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
  isActive?: boolean
  isPreview?: boolean
  onClick?: () => void
  className?: string
  haveHover?: boolean
}

export const DataListItem = ({
  value,
  title,
  color,
  percentage,
  isActive,
  onClick,
  isPreview,
  className,
  haveHover,
}: Props) => {
  return (
    <Wrapper isActive={isActive} isPreview={isPreview} haveHover={haveHover} onClick={onClick} className={className}>
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

const HoverCss = css`
  font-weight: 700;
  cursor: pointer;
`

const ActiveCss = css`
  background-color: ${Colors.Black[50]};
  border: 1px solid ${Colors.Black[200]};
  border-right: none;
  cursor: pointer;

  &::after {
    position: absolute;
    background-color: ${Colors.Black[50]};
    content: '';
    height: 100%;
    width: 1px;
    right: -1px;
  }
`

const Wrapper = styled.div<{ isActive?: boolean; haveHover?: boolean; isPreview?: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 10px;
  border: 1px solid transparent;
  border-right: none;
  position: relative;

  ${({ isActive, isPreview }) => {
    if (isActive) {
      return ActiveCss
    }

    if (isPreview) {
      return HoverCss
    }
  }}

  ${({ haveHover }) => {
    if (haveHover) {
      return css`
        :hover {
          ${HoverCss}
        }
      `
    }
  }}

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
