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
      <PreviousPageButtonContainer>
        <PreviousPageButton onClick={() => history.goBack()} size="small" square>
          <BackArrow direction="left" />
        </PreviousPageButton>
      </PreviousPageButtonContainer>
      {children}
    </PreviousPageBlock>
  )
}

const PreviousPageBlock = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-column-gap: 8px;
  align-items: center;
  width: fit-content;
  max-width: 100%;
  overflow: hidden;
`

const PreviousPageButtonContainer = styled.div`
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  width: 16px;
  height: 16px;
`

const PreviousPageButton = styled(ButtonGhost)`
  position: absolute;
  left: 50%;
  top: 50%;
  min-height: unset;
  min-width: unset;
  padding: 0;
  width: 32px;
  height: 32px;
  border: none;
  transform: translate(-50%, -50%);

  &:before,
  &:after {
    content: unset;
  }
  &:active {
    transform: translate(-50%, -50%);
  }
  &:disabled {
    &:active {
      transform: translate(-50%, -50%);
    }
  }
`

const BackArrow = styled(Arrow)`
  width: 100%;
  height: 100%;
`
