import { History } from 'history'
import React from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'

import { ButtonGhost } from '../buttons'
import { Arrow } from '../icons'

interface PreviousPageProps {
  children?: React.ReactNode
  showOverflow?: boolean
  customLink?: string
}
const setPrevHistory = (history: History<unknown>, customLink?: string) => {
  if (history.action === 'POP' && customLink) {
    history.push(customLink)
  } else {
    history.goBack()
  }
}
export const PreviousPage = ({ children, showOverflow, customLink }: PreviousPageProps) => {
  const history = useHistory()
  return (
    <PreviousPageBlock showOverflow={showOverflow}>
      <PreviousPageButtonContainer>
        <PreviousPageButton onClick={() => setPrevHistory(history, customLink)} size="small" square>
          <BackArrow direction="left" />
        </PreviousPageButton>
      </PreviousPageButtonContainer>
      {children}
    </PreviousPageBlock>
  )
}

const PreviousPageBlock = styled.div<{ showOverflow?: boolean }>`
  display: grid;
  grid-auto-flow: column;
  grid-column-gap: 8px;
  align-items: center;
  width: fit-content;
  max-width: 100%;
  overflow: ${({ showOverflow }) => (showOverflow ? 'visible' : 'hidden')};
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
