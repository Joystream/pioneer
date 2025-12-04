import React, { useState, useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'
import styled from 'styled-components'

import { TextMedium } from '@/common/components/typography'
import { Colors } from '@/common/constants'

interface ActionItem {
  label: string
  action: string
  title: string
}

interface ValidatorActionsDropdownProps {
  onActionClick: (action: string) => void
  onOpenChange?: (isOpen: boolean) => void
}

const actions: ActionItem[] = [
  {
    label: 'Bond',
    action: 'Bond',
    title: "Bond tokens to support this validator's operations",
  },
  {
    label: 'Unbond',
    action: 'Unbond',
    title: 'Unbond tokens (releases lock with 28-day unbonding period)',
  },
  {
    label: 'Payout',
    action: 'Payout',
    title: 'Claim earned rewards from this validator',
  },
  {
    label: 'Rebag',
    action: 'Rebag',
    title: 'Rebag account in validator bag system',
  },
  {
    label: 'Rebond',
    action: 'Rebond',
    title: 'Rebond unbonding tokens to active staking',
  },
]

export const ValidatorActionsDropdown = ({ onActionClick, onOpenChange }: ValidatorActionsDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [dropdownPosition, setDropdownPosition] = useState<'bottom' | 'top'>('bottom')
  const [dropdownStyle, setDropdownStyle] = useState<React.CSSProperties>({})
  const dropdownRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  const handleActionClick = (action: string) => {
    if (['Bond', 'Unbond', 'Payout', 'Rebag', 'Rebond'].includes(action)) {
      onActionClick(action)
    }

    setIsOpen(false)
  }

  const handleOutsideClick = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsOpen(false)
    }
  }

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick)
      window.addEventListener('resize', calculateDropdownPosition)
      onOpenChange?.(true)
      return () => {
        document.removeEventListener('mousedown', handleOutsideClick)
        window.removeEventListener('resize', calculateDropdownPosition)
        onOpenChange?.(false)
      }
    } else {
      onOpenChange?.(false)
    }
  }, [isOpen, onOpenChange])

  const calculateDropdownPosition = () => {
    if (!buttonRef.current) return

    const rect = buttonRef.current.getBoundingClientRect()
    const viewportHeight = window.innerHeight
    const dropdownHeight = 200 // Approximate height of dropdown menu

    const spaceBelow = viewportHeight - rect.bottom
    const spaceAbove = rect.top

    let top: number | string = rect.bottom + 8
    let bottom: number | string = 'auto'

    if (spaceBelow < dropdownHeight && spaceAbove > dropdownHeight) {
      setDropdownPosition('top')
      top = 'auto'
      bottom = window.innerHeight - rect.top + 8
    } else {
      setDropdownPosition('bottom')
    }

    setDropdownStyle({
      position: 'fixed',
      top: top,
      bottom: bottom,
      left: rect.right - 140,
      zIndex: 100001,
    })
  }

  const handleDropdownClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    e.preventDefault()

    if (!isOpen) {
      calculateDropdownPosition()
    }

    setIsOpen(!isOpen)
  }

  return (
    <>
      <DropdownContainer ref={dropdownRef}>
        <DropdownButton ref={buttonRef} onClick={handleDropdownClick} title="Staking actions for this validator">
          <ThreeDots>⋯</ThreeDots>
        </DropdownButton>
      </DropdownContainer>

      {isOpen && (
        <>
          {createPortal(
            <DropdownMenu $position={dropdownPosition} style={dropdownStyle}>
              {actions.map((action) => (
                <DropdownItem
                  key={action.action}
                  onMouseDown={() => {
                    handleActionClick(action.action)
                  }}
                  title={action.title}
                  role="button"
                  tabIndex={0}
                >
                  <TextMedium>{action.label}</TextMedium>
                </DropdownItem>
              ))}
            </DropdownMenu>,
            document.body
          )}
        </>
      )}
    </>
  )
}

const DropdownContainer = styled.div`
  position: relative;
  display: inline-block;
  z-index: 100000;
`

const DropdownButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background: ${Colors.White};
  border: 1px solid ${Colors.Black[200]};
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
  padding: 0;

  &:hover {
    background: ${Colors.Black[50]};
    border-color: ${Colors.Black[300]};
    transform: scale(1.05);
  }

  &:focus {
    outline: none;
    border-color: ${Colors.Blue[500]};
    box-shadow: 0 0 0 2px ${Colors.Blue[100]};
  }

  &:active {
    transform: scale(0.95);
  }
`

const ThreeDots = styled.div`
  font-size: 16px;
  font-weight: bold;
  color: ${Colors.Black[600]};
  line-height: 1;
  transform: rotate(90deg);
`

const DropdownMenu = styled.div<{ $position: 'top' | 'bottom' }>`
  display: flex;
  flex-direction: column;
  gap: 4px;
  background: ${Colors.White};
  border: 1px solid ${Colors.Black[200]};
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  min-width: 140px;
  overflow: hidden;
  animation: fadeIn 0.15s ease-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: ${({ $position }) => ($position === 'top' ? 'translateY(4px)' : 'translateY(-4px)')};
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`

const DropdownItem = styled.button`
  width: 100%;
  padding: 10px 16px;
  background: ${Colors.White};
  text-align: left;
  cursor: pointer;
  transition: all 0.2s ease;
  user-select: none;
  font-size: 14px;
  font-weight: 500;
  border: none;
  outline: none;

  &:hover {
    background: ${Colors.Blue[50]};
    color: ${Colors.Blue[600]};
  }

  &:focus {
    outline: none;
    background: ${Colors.Blue[100]};
    color: ${Colors.Blue[700]};
  }

  &:active {
    background: ${Colors.Blue[100]};
    transform: scale(0.98);
  }

  &:not(:last-child) {
    border-bottom: 1px solid ${Colors.Black[100]};
  }

  &:first-child {
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
  }

  &:last-child {
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
  }
`
