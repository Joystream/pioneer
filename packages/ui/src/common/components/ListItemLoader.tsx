import React from 'react'
import styled from 'styled-components'

import { repeat } from '@/common/utils'

interface ListItemLoaderProps {
  columnsTemplate: string
  children: React.ReactNode | React.ReactNode[]
  count?: number
  height?: string
  id?: string
}

export const ListItemLoader = ({ children, count = 1, id, ...styleProps }: ListItemLoaderProps) => {
  return (
    <span id={id}>
      {repeat(
        (index) => (
          <Wrapper key={index} {...styleProps}>
            {children}
          </Wrapper>
        ),
        count
      )}
    </span>
  )
}

const Wrapper = styled.div<ListItemLoaderProps>`
  width: 100%;
  display: grid;
  height: ${({ height }) => height ?? '94px'};
  grid-auto-flow: row;
  grid-template-columns: ${({ columnsTemplate }) => columnsTemplate};
  justify-content: space-between;
  align-items: center;
  padding: 16px 8px 16px 16px;
`
