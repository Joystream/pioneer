import React from 'react'
import styled from 'styled-components'

import { RowGapBlock } from '@/common/components/page/PageContent'
import { TextMedium } from '@/common/components/typography'

import { AddProposalButton } from '../AddProposalButton'

export const NoProposals = () => (
  <NoProposalContainer gap={16}>
    <h3>There are no current proposals yet</h3>
    <TextMedium>
      Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit
      mollit. Exercitation veniam consequat sunt nostrud amet.
    </TextMedium>
    <AddProposalButton />
  </NoProposalContainer>
)

const NoProposalContainer = styled(RowGapBlock)`
  place-self: center;
  justify-items: center;
  width: 420px;
  height: fit-content;
  margin-top: 172px;
  text-align: center;
`
