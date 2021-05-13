import React from 'react'
import styled from 'styled-components'

interface DropItemProps {
  children?: React.ReactNode
  className?: string
  onMouseEnter?: () => void
  onMouseLeave?: () => void
}

export const PopupItem = ({ children, ...other }: DropItemProps) => {
  return <PopupItemContainer {...other}>{children}</PopupItemContainer>
}

const PopupItemContainer = styled.div`
  display: flex;
`
