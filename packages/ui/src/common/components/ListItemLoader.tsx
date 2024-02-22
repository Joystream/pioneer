import React from 'react'
import styled from 'styled-components'

import { repeat } from '@/common/utils'

interface ListItemLoaderProps {
  columnsTemplate: string
  children: React.ReactNode | React.ReactNode[]
  count?: number
  height?: string
  id?: string
  gap?: string
  padding?: string
}

export const ListItemLoader = ({ children, count = 1, id, gap, ...styleProps }: ListItemLoaderProps) => {
  return (
    <ListWrapper gap={gap} id={id}>
      {repeat(
        (index) => (
          <ItemWrapper key={index} {...styleProps}>
            {children}
          </ItemWrapper>
        ),
        count
      )}
    </ListWrapper>
  )
}

const ListWrapper = styled.div<{ gap?: string }>`
  gap: ${({ gap }) => gap ?? '0'};
`

const ItemWrapper = styled.div<ListItemLoaderProps>`
  width: 100%;
  display: grid;
  height: ${({ height }) => height ?? '94px'};
  grid-auto-flow: row;
  grid-template-columns: ${({ columnsTemplate }) => columnsTemplate};
  justify-content: space-between;
  align-items: center;
  padding: ${({ padding }) => padding ?? '16px 8px 16px 16px'};
`
