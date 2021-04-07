import React from 'react'
import styled from 'styled-components'

import { Colors, Fonts, Transitions } from '../../app/constants'
import { CopyButton } from './buttons'

interface CopyComponentText {
  altText?: string
  copyText: string
  className?: any
}

export const CopyComponent = React.memo(({ altText, copyText, className }: CopyComponentText) => {
  return (
    <CopyGroup className={className}>
      <CopyText>
        {!altText && copyText}
        {altText && altText}
      </CopyText>
      <CopyButton textToCopy={copyText} />
    </CopyGroup>
  )
})

export const CopyGroup = styled.div`
  display: grid;
  grid-auto-flow: column;
  align-items: center;
  grid-column-gap: 8px;
  width: fit-content;
  height: fit-content;
  font-family: ${Fonts.Inter};
  font-size: 12px;
  line-height: 18px;
  color: ${Colors.Black[400]};
  transition: ${Transitions.all};
`

export const CopyText = styled.span`
  max-width: 152px;
  font-family: inherit;
  font-size: inherit;
  line-height: inherit;
  color: inherit;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`
