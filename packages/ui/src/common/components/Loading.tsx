import React from 'react'
import styled from 'styled-components'

import { Colors } from '../constants'

import { LoadingAnimation } from './LoadingAnimation'
import { TextInlineSmall } from './typography'

interface Props {
  text?: string
}

export const Loading = ({ text }: Props) => {
  return (
    <LoadingWrapper>
      <LoadingAnimation />
      <LoadingText italic inter>
        {text ?? 'Loading...'}
      </LoadingText>
    </LoadingWrapper>
  )
}

const LoadingText = styled(TextInlineSmall)`
  color: ${Colors.Blue[300]};
`

const LoadingWrapper = styled.div`
  display: flex;
  width: fit-content;
  height: fit-content;
  align-items: center;
  column-gap: 8px;
`
