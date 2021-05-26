import React from 'react'
import styled from 'styled-components'

interface ActivityIconProps {
  className?: string
}

export const ClosedIcon: React.FC<ActivityIconProps> = ({ className }) => {
  return (
    <ActivityIcon viewBox="0 0 20 20" fill="none" color="currentColor" className={className}>
      <path
        d="M1.53846 9.99996C1.53846 5.3268 5.3268 1.53846 9.99996 1.53846C14.6731 1.53846 18.4615 5.3268 18.4615 9.99996C18.4615 11.3552 18.1429 12.6361 17.5764 13.7717L18.7611 14.8247C19.5506 13.3941 19.9999 11.7495 19.9999 9.99996C19.9999 4.47714 15.5228 0 9.99996 0C4.47714 0 0 4.47714 0 9.99996C0 15.5228 4.47714 19.9999 9.99996 19.9999C11.1406 19.9999 12.2365 19.809 13.2577 19.4573L12.445 18.1028C11.6709 18.3361 10.8501 18.4615 9.99996 18.4615C5.3268 18.4615 1.53846 14.6731 1.53846 9.99996Z"
        fill="currentColor"
      />
      <path
        d="M13.5967 17.6612C14.9785 17.0113 16.1558 15.9987 17.0061 14.7461L18.1643 15.7757C17.1995 17.1371 15.9027 18.2466 14.3919 18.9864L13.5967 17.6612Z"
        fill="currentColor"
      />
      <path
        d="M13.6698 12.6274L11.0429 10.0004L13.67 7.37323L12.6271 6.33036L10 8.9575L7.18807 6.14551L6.1452 7.18838L8.95715 10.0004L6.14534 12.8122L7.18821 13.8551L10 11.0433L12.6269 13.6703L13.6698 12.6274Z"
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
