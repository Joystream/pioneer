import React from 'react'
import styled from 'styled-components'

import { Loader } from '@/common/components/icons'

import { TextInlineSmall } from './typography'

interface Props {
  text?: string
  withoutMargin?: boolean
}

export const Loading = ({ text, withoutMargin }: Props) => {
  return (
    <LoadingWrapper withoutMargin={withoutMargin}>
      <Loader />
      {text && (
        <TextInlineSmall italic inter lighter>
          {text}
        </TextInlineSmall>
      )}
    </LoadingWrapper>
  )
}

const LoadingWrapper = styled.div<Props>`
  display: flex;
  width: fit-content;
  height: fit-content;
  align-items: center;
  justify-content: center;
  column-gap: 8px;
  justify-self: start;
  place-self: center;
  margin: ${({ withoutMargin }) => (withoutMargin ? 'auto auto' : '100px auto')};
`
