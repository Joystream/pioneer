import React, { useRef, useState } from 'react'
import styled, { css } from 'styled-components'

import { useOutsideClick } from '@/common/hooks/useOutsideClick'

import { Animations, BorderRad, Colors, Shadows, Transitions } from '../../constants'
import { ButtonGhost, ButtonLink } from '../buttons'
import { KebabMenuIcon } from '../icons'

export interface ContextMenuItem {
  text: string
  onClick: () => void
}

export interface ContextMenuProps {
  items: ContextMenuItem[]
}

export interface ContextMenuAlignmentProps {
  align?: 'left' | 'right'
}

export const ContextMenu = ({ align, items }: ContextMenuProps & ContextMenuAlignmentProps) => {
  const [isMenuVisible, setMenuVisible] = useState(false)
  const contextMenuHandlers = {
    onClick: (event: React.MouseEvent<HTMLElement>) => {
      event.stopPropagation()
      setMenuVisible(!isMenuVisible)
    },
    onBlur: () => setMenuVisible(false),
  }

  const container = useRef<HTMLDivElement>(null)
  useOutsideClick(container, isMenuVisible, setMenuVisible)

  return (
    <ContextMenuContainer ref={container}>
      <ButtonGhost square size="medium" {...contextMenuHandlers}>
        <KebabMenuIcon />
      </ButtonGhost>
      {isMenuVisible && (
        <ContextMenuOptions align={align}>
          {items.map((item) => (
            <ButtonLink
              size="small"
              bold
              borderless
              onClick={() => {
                item.onClick()
                setMenuVisible(false)
              }}
            >
              {item.text}
            </ButtonLink>
          ))}
        </ContextMenuOptions>
      )}
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
}: ContextMenuOptionsProps & ContextMenuAlignmentProps) => {
  return (
    <ContextMenuWrapper className={className} align={align}>
      {children}
    </ContextMenuWrapper>
  )
}

const ContextMenuWrapper = styled.div<ContextMenuAlignmentProps>`
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
