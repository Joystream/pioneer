import React from 'react'
import styled from 'styled-components'

interface ActivityIconProps {
  className?: string
}

export const IncreasedIcon: React.FC<ActivityIconProps> = ({ className }) => {
  return (
    <ActivityIcon viewBox="0 0 20 20" fill="none" color="currentColor" className={className}>
      <path
        d="M15.8319 8.92399L11.4226 13.3333H10.2441L7.50002 10.5892L3.08928 15L1.91077 13.8215L6.91077 8.82145H8.08928L10.8334 11.5655L14.6534 7.74548L15.8319 8.92399Z"
        fill="currentColor"
      />
      <path d="M13.3334 5.24408H17.5L18.3334 6.07741V10.2441H16.6667V6.91075H13.3334V5.24408Z" fill="currentColor" />
    </ActivityIcon>
  )
}

export const ActivityIcon = styled.svg`
  height: 20px;
  width: 20px;
  position: relative;
`
