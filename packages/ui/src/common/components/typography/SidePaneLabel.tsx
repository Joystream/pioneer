import React from 'react'
import styled from 'styled-components'

interface Props {
  text: string
  className?: any
}

export const SidePaneLabel = React.memo(({ text, className }: Props) => {
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
