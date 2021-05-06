import React from 'react'
import styled from 'styled-components'

interface DropItemProps {
  ref: React.MutableRefObject<HTMLDivElement>
  children?: React.ReactNode
  className?: string
}

export const PopupItem = ({ children, className }: DropItemProps) => {
  return <PopupItemContainer className={className}>{children}</PopupItemContainer>
}

const PopupItemContainer = styled.div`
  display: flex;
`
