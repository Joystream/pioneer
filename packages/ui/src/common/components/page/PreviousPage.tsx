import React from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'

import { ButtonGhost } from '../buttons'
import { Arrow } from '../icons'

interface PreviousPageProps {
  children?: React.ReactNode
}

export const PreviousPage = ({ children }: PreviousPageProps) => {
  const history = useHistory()
  return (
    <PreviousPageBlock>
      <PreviousPageButton onClick={() => history.goBack()} size="small" square>
        <BackArrow direction="left" />
      </PreviousPageButton>
      {children}
    </PreviousPageBlock>
  )
}

const PreviousPageBlock = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-column-gap: 8px;
  align-items: center;
  grid-template-columns: auto auto;
`

const PreviousPageButton = styled(ButtonGhost)`
  min-height: unset;
  min-width: unset;
  padding: 0;
  width: 16px;
  height: 16px;
  border: none;

  &:before,
  &:after {
    content: unset;
  }
`

const BackArrow = styled(Arrow)`
  width: 100%;
  height: 100%;
`
