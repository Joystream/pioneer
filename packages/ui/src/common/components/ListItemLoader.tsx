import React from 'react'
import styled from 'styled-components'

interface ListItemLoaderProps {
  columnsTemplate: string
  children: React.ReactNode | React.ReactNode[]
  count?: number
  height?: string
}

export const ListItemLoader = ({ children, count = 1, ...styleProps }: ListItemLoaderProps) => {
  return (
    <>
      {Array(count)
        .fill(null)
        .map((_, index) => (
          <Wrapper key={index} {...styleProps}>
            {children}
          </Wrapper>
        ))}
    </>
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
