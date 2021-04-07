import React from 'react'
import styled from 'styled-components'

interface AboutMemberProps {
  text: string
  className?: any
}

export const MembershipLabel = React.memo(({ text, className }: AboutMemberProps) => {
  return (
    <AboutLabel title={text} className={className}>
      {text}
    </AboutLabel>
  )
})

export const AboutLabel = styled.h6`
  width: fit-content;
  max-width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-transform: capitalize;
`
