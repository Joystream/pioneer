import React, { useState } from 'react'
import styled from 'styled-components'

import { Animations, BorderRad, Colors, Shadows, Transitions } from '../../constants'
import { ButtonGhost } from '../buttons'
import { KebabMenuIcon } from '../icons'

export interface ContextMenuProps {
  children: React.ReactNode
}

export const ContextMenu = ({ children }: ContextMenuProps) => {
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
      {isMenuVisible && <ContextMenuOptions children={children} />}
    </ContextMenuContainer>
  )
}

interface ContextMenuOptionsProps {
  className?: string
  children: React.ReactNode
}

export const ContextMenuOptions = ({ className, children }: ContextMenuOptionsProps) => {
  return <TooltipPopupContainer className={className}>{children}</TooltipPopupContainer>
}

const TooltipPopupContainer = styled.div`
  display: grid;
  grid-row-gap: 8px;
  position: absolute;
  top: 100%;
  right: 0;
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
