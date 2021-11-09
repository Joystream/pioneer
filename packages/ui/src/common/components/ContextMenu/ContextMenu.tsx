import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import { usePopper } from 'react-popper'
import styled from 'styled-components'

import { useOutsideClick } from '@/common/hooks/useOutsideClick'

import { Animations, BorderRad, Colors, Shadows, ZIndex } from '../../constants'
import { ButtonLink, ButtonSize } from '../buttons'
import { TransactionButton } from '../buttons/TransactionButton'
import { KebabMenuIcon } from '../icons'

export interface ContextMenuItem {
  text: string
  onClick: (event?: React.MouseEvent<HTMLElement>) => void
}

export interface ContextMenuProps {
  items: ContextMenuItem[]
  size?: ButtonSize
  title?: string
}

export const ContextMenu = ({ items, size, title }: ContextMenuProps) => {
  const [isMenuVisible, setMenuVisible] = useState(false)
  const [referenceElementRef, setReferenceElementRef] = useState<HTMLDivElement | null>(null)
  const [popperElementRef, setPopperElementRef] = useState<HTMLDivElement | null>(null)

  const { styles, attributes } = usePopper(referenceElementRef, popperElementRef, {
    placement: 'bottom-end',
    modifiers: [
      {
        name: 'offset',
        options: {
          offset: [0, 8],
        },
      },
    ],
  })

  const contextMenuHandlers = {
    onClick: (event: React.MouseEvent<HTMLElement>) => {
      event.stopPropagation()
      setMenuVisible(!isMenuVisible)
    },
    onBlur: () => setMenuVisible(false),
  }

  useOutsideClick(popperElementRef, isMenuVisible, () => setMenuVisible(false))

  return (
    <ContextMenuContainer ref={setReferenceElementRef}>
      <TransactionButton
        style="ghost"
        square
        size={size ?? 'medium'}
        {...contextMenuHandlers}
        title={title ?? 'Context menu'}
      >
        <KebabMenuIcon />
      </TransactionButton>
      {isMenuVisible &&
        ReactDOM.createPortal(
          <ContextMenuWrapper
            isOpen={isMenuVisible}
            ref={setPopperElementRef}
            style={styles.popper}
            {...attributes.popper}
          >
            {items.map((item, index) => (
              <ButtonLink
                key={index}
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
          </ContextMenuWrapper>,
          document.body
        )}
    </ContextMenuContainer>
  )
}

const ContextMenuWrapper = styled.div<{ isOpen?: boolean }>`
  display: ${({ isOpen }) => (isOpen ? 'grid' : 'none')};
  grid-row-gap: 8px;
  position: absolute;
  top: 100%;
  width: fit-content;
  padding: 16px 24px;
  background-color: ${Colors.White};
  border-radius: ${BorderRad.m};
  box-shadow: ${Shadows.select};
  z-index: ${ZIndex.contextMenu};
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
