import React from 'react'
import { CSSTransition } from 'react-transition-group'
import styled from 'styled-components'

import { Transitions } from '../../constants'

interface DropItemProps {
  showBy: boolean
  children?: React.ReactNode
  className?: string
}

export const DropItem = ({ showBy, children, className }: DropItemProps) => {
  return (
    <CSSTransition in={showBy} classNames="DropDown" timeout={Transitions.durationNumeric} unmountOnExit>
      <DropItemContainer className={className}>{children}</DropItemContainer>
    </CSSTransition>
  )
}

const DropItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  transition: ${Transitions.all};
`
