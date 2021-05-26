import React from 'react'
import styled from 'styled-components'

interface ActivityIconProps {
  className?: string
}

export const WarnedIcon: React.FC<ActivityIconProps> = ({ className }) => {
  return (
    <ActivityIcon viewBox="0 0 20 20" fill="none" color="currentColor" className={className}>
      <path
        d="M10 1.25C5.16797 1.25 1.25 5.16797 1.25 10C1.25 14.832 5.16797 18.75 10 18.75C14.832 18.75 18.75 14.832 18.75 10C18.75 5.16797 14.832 1.25 10 1.25ZM10 17.2656C5.98828 17.2656 2.73438 14.0117 2.73438 10C2.73438 5.98828 5.98828 2.73438 10 2.73438C14.0117 2.73438 17.2656 5.98828 17.2656 10C17.2656 14.0117 14.0117 17.2656 10 17.2656Z"
        fill="currentColor"
      />
      <path
        d="M9.0625 13.4375C9.0625 13.6861 9.16127 13.9246 9.33709 14.1004C9.5129 14.2762 9.75136 14.375 10 14.375C10.2486 14.375 10.4871 14.2762 10.6629 14.1004C10.8387 13.9246 10.9375 13.6861 10.9375 13.4375C10.9375 13.1889 10.8387 12.9504 10.6629 12.7746C10.4871 12.5988 10.2486 12.5 10 12.5C9.75136 12.5 9.5129 12.5988 9.33709 12.7746C9.16127 12.9504 9.0625 13.1889 9.0625 13.4375V13.4375ZM9.53125 11.25H10.4688C10.5547 11.25 10.625 11.1797 10.625 11.0938V5.78125C10.625 5.69531 10.5547 5.625 10.4688 5.625H9.53125C9.44531 5.625 9.375 5.69531 9.375 5.78125V11.0938C9.375 11.1797 9.44531 11.25 9.53125 11.25Z"
        fill="currentColor"
      />
    </ActivityIcon>
  )
}

export const ActivityIcon = styled.svg`
  height: 20px;
  width: 20px;
  position: relative;
`
