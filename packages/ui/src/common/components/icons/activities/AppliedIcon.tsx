import React from 'react'
import styled from 'styled-components'

interface ActivityIconProps {
  className?: string
}

export const AppliedIcon: React.FC<ActivityIconProps> = ({ className }) => (
  <ActivityIcon viewBox="0 0 20 20" fill="none" color="currentColor" className={className}>
    <path
      d="M2.5 1.54134L3.20833 0.833008H16.5417L17.25 1.54134V18.208L16.5417 18.9163H3.20833L2.5 18.208V1.54134ZM3.91667 2.24967V17.4997H15.8333V2.24967H3.91667Z"
      fill="currentColor"
    />
    <path
      d="M14.0418 10.708H5.70844V12.3747H14.0418V10.708ZM14.0418 14.0413H5.70844V15.708H14.0418V14.0413Z"
      fill="currentColor"
    />
    <path
      d="M8.63555 6.40093C8.95051 6.15874 9.1526 5.78397 9.1526 5.36333C9.1526 4.63304 8.54347 4.04102 7.79206 4.04102C7.04065 4.04102 6.43151 4.63304 6.43151 5.36333C6.43151 5.78388 6.63352 6.15858 6.94837 6.40077C6.58328 6.54767 6.30991 6.78723 6.11583 7.0618C5.80789 7.49745 5.70844 8.00502 5.70844 8.33854V8.56838L5.91996 8.67117C6.19792 8.80625 6.91391 9.04102 7.79177 9.04102C8.66962 9.04102 9.38562 8.80625 9.66358 8.67117L9.8751 8.56838V8.33854C9.8751 8.00502 9.77565 7.49745 9.46771 7.0618C9.2737 6.78733 9.00045 6.54784 8.63555 6.40093Z"
      fill="currentColor"
    />
  </ActivityIcon>
)

export const ActivityIcon = styled.svg`
  height: 20px;
  width: 20px;
  position: relative;
`
