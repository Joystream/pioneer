import React, { useState } from 'react'
import styled, { css } from 'styled-components'

import { Animations, BorderRad, Colors, Shadows, Transitions } from '../../constants'
import { ButtonGhost } from '../buttons'
import { KebabMenuIcon } from '../icons'

export interface ContextMenuProps {
  children: React.ReactNode
}

export interface ContextMenuAlignMentProps {
  align?: 'left' | 'right'
}

export const ContextMenu = ({ children, align }: ContextMenuProps & ContextMenuAlignMentProps) => {
  const [isMenuVisible, setMenuVisible] = useState(false)
  const contextMenuHandlers = {
    onClick: (event: React.MouseEvent<HTMLElement>) => {
      event.stopPropagation()
      setMenuVisible(!isMenuVisible)
    },
    onBlur: () => setMenuVisible(false),
  }

  return (
    <ContextMenuContainer>
      <ButtonGhost square size="medium" {...contextMenuHandlers}>
        <KebabMenuIcon />
      </ButtonGhost>
      {isMenuVisible && <ContextMenuOptions children={children} align={align} />}
    </ContextMenuContainer>
  )
}

interface ContextMenuOptionsProps {
  className?: string
  children: React.ReactNode
}

export const ContextMenuOptions = ({
  className,
  children,
  align,
}: ContextMenuOptionsProps & ContextMenuAlignMentProps) => {
  return (
    <ContextMenuWrapper className={className} align={align}>
      {children}
    </ContextMenuWrapper>
  )
}

const ContextMenuWrapper = styled.div<ContextMenuAlignMentProps>`
  display: grid;
  grid-row-gap: 8px;
  position: absolute;
  top: 100%;
  ${({ align }) =>
    align === 'left'
      ? css`
          left: 0;
        `
      : css`
          right: 0;
        `}
  width: fit-content;
  padding: 16px 24px;
  background-color: ${Colors.White};
  border-radius: ${BorderRad.m};
  box-shadow: ${Shadows.select};
  transition: ${Transitions.all};
  z-index: 55;
  ${Animations.showTooltip};
`

export const ContextMenuContainer = styled.div`
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  width: fit-content;
  height: fit-content;
  text-transform: none;
`
