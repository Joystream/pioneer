import React from 'react'
import styled from 'styled-components'

interface ActivityIconProps {
  className?: string
}

export function DecreasedIcon({ className }: ActivityIconProps) {
  return (
    <ActivityIcon viewBox="0 0 20 20" fill="none" color="currentColor" className={className}>
      <path
        d="M15.8319 11.32L11.4226 6.91072H10.2441L7.50002 9.6548L3.08928 5.24406L1.91077 6.42257L6.91077 11.4226H8.08928L10.8334 8.67849L14.6534 12.4985L15.8319 11.32Z"
        fill="currentColor"
      />
      <path d="M13.3334 15H17.5L18.3334 14.1667V10H16.6667V13.3333H13.3334V15Z" fill="currentColor" />
    </ActivityIcon>
  )
}

export const ActivityIcon = styled.svg`
  height: 20px;
  width: 20px;
  position: relative;
`
