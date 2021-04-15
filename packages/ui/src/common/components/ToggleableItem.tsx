import React, { ReactNode } from 'react'

import { useToggle } from '../hooks/useToggle'
import { isFunction } from '../utils'

import { Toggle, ToggleButton } from './buttons/Toggle'
import { ArrowDownIcon } from './icons'

interface ToggleableItemProps {
  children: ReactNode | ((isOpen: boolean) => ReactNode)
  inlineOpenToggle?: boolean
}

export const ToggleableItem = ({ children }: ToggleableItemProps) => {
  const [isOpen, toggleOpen] = useToggle()

  return (
    <Toggle isOpen={isOpen}>
      {isFunction(children) ? children(isOpen) : children}
      <ToggleButton onClick={toggleOpen}>
        <ArrowDownIcon />
      </ToggleButton>
    </Toggle>
  )
}
