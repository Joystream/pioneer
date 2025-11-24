import React, { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import styled from 'styled-components'

import { ButtonGhost } from '@/common/components/buttons'
import { TransactionButtonWrapper } from '@/common/components/buttons/TransactionButton'
import { EditSymbol } from '@/common/components/icons/symbols'
import { DeleteSymbol } from '@/common/components/icons/symbols/DeleteSymbol'
import { BorderRad, Colors, ZIndex } from '@/common/constants'

export interface MenuActionItem {
  label: string
  onClick: () => void
  disabled?: boolean
}

interface Props {
  items: MenuActionItem[]
  canStop: boolean
  stopDisabled: boolean
  onStop: () => void
  canUnbond: boolean
  onUnbond: () => void
}

export const NominatorActionMenu = ({
  items,
  canStop,
  stopDisabled,
  onStop,
  canUnbond,
  onUnbond,
}: Props) => {
  const [isMenuOpen, setMenuOpen] = useState(false)
  const [menuPosition, setMenuPosition] = useState<{ top: number; right: number } | null>(null)
  const menuRef = useRef<HTMLDivElement | null>(null)
  const dropdownRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!isMenuOpen) return

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node
      const clickedOutsideMenu = menuRef.current && !menuRef.current.contains(target)
      const clickedOutsideDropdown = dropdownRef.current && !dropdownRef.current.contains(target)

      if (clickedOutsideMenu && clickedOutsideDropdown) {
        setMenuOpen(false)
        setMenuPosition(null)
      }
    }

    window.addEventListener('mousedown', handleClickOutside)
    return () => window.removeEventListener('mousedown', handleClickOutside)
  }, [isMenuOpen])

  const toggleMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
    if (!isMenuOpen && menuRef.current) {
      const rect = menuRef.current.getBoundingClientRect()
      const menuHeight = 200
      const spaceBelow = window.innerHeight - rect.bottom
      const spaceAbove = rect.top

      const top = spaceBelow < menuHeight && spaceAbove > menuHeight ? rect.top - menuHeight - 8 : rect.bottom + 8

      setMenuPosition({
        top,
        right: window.innerWidth - rect.right,
      })
    } else {
      setMenuPosition(null)
    }

    setMenuOpen((prev) => !prev)
  }

  const handleMenuItemClick = (
    event: React.MouseEvent<HTMLButtonElement>,
    { disabled, onClick }: MenuActionItem
  ) => {
    if (disabled) return
    event.stopPropagation()
    setMenuOpen(false)
    setMenuPosition(null)
    onClick()
  }

  const handleUnbond = () => {
    if (!canUnbond) return
    onUnbond()
  }

  return (
    <TransactionButtonWrapper>
      <MenuContainer ref={menuRef}>
        <ButtonForTransfer
          size="small"
          square
          onClick={toggleMenu}
          aria-haspopup="menu"
          aria-expanded={isMenuOpen}
        >
          <EditSymbol />
        </ButtonForTransfer>
        {isMenuOpen &&
          menuPosition &&
          createPortal(
            <MenuDropdown
              ref={dropdownRef}
              role="menu"
              style={{ top: `${menuPosition.top}px`, right: `${menuPosition.right}px` }}
            >
              {items.map((item) => (
                <MenuItem
                  key={item.label}
                  disabled={item.disabled}
                  onClick={(event) => handleMenuItemClick(event, item)}
                >
                  {item.label}
                </MenuItem>
              ))}
            </MenuDropdown>,
            document.body
          )}
        {canStop ? (
          <ButtonGhost size="small" onClick={onStop} disabled={stopDisabled}>
            Stop
          </ButtonGhost>
        ) : (
          <TransactionButtonWrapper>
            <ButtonForTransfer size="small" square disabled={!canUnbond} onClick={handleUnbond}>
              <DeleteSymbol />
            </ButtonForTransfer>
          </TransactionButtonWrapper>
        )}
      </MenuContainer>
    </TransactionButtonWrapper>
  )
}

export const ButtonForTransfer = styled(ButtonGhost)`
  position: relative;
  z-index: 1;
  svg {
    color: ${Colors.Black[900]};
  }
`

const MenuDropdown = styled.div`
  position: fixed;
  display: grid;
  gap: 8px;
  min-width: 240px;
  padding: 16px 20px;
  background-color: ${Colors.White};
  border: 1px solid ${Colors.Black[100]};
  border-radius: ${BorderRad.m};
  box-shadow: 0 12px 24px rgba(17, 17, 17, 0.12);
  z-index: ${ZIndex.dropdown};
`

const MenuItem = styled.button<{ disabled?: boolean }>`
  display: flex;
  width: 100%;
  font-size: 14px;
  line-height: 20px;
  font-weight: 600;
  text-align: left;
  color: ${({ disabled }) => (disabled ? Colors.Black[300] : Colors.Black[900])};
  background: transparent;
  border: none;
  padding: 0;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};

  &:hover,
  &:focus {
    color: ${({ disabled }) => (disabled ? Colors.Black[300] : Colors.Blue[500])};
  }
`

const MenuContainer = styled.div`
  position: relative;
  display: flex;
  gap: 0;
  align-items: center;
`

