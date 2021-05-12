import React from 'react'
import styled from 'styled-components'

import { AddProposalButton } from '../AddProposalButton'

export const NoProposals = () => (
  <NoProposalContainer>
    <h3>There is no current proposals yet</h3>
    <p>
      Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit
      mollit. Exercitation veniam consequat sunt nostrud amet.
    </p>
    <AddProposalButton />
  </NoProposalContainer>
)

const NoProposalContainer = styled.div`
  place-self: center;
  height: 50%;
  width: 422px;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto;
  align-content: start;
  justify-items: center;
  gap: 16px;
  text-align: center;
`
