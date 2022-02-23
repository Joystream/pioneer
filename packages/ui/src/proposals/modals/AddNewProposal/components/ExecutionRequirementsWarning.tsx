import React from 'react'
import styled from 'styled-components'

import { AlertSymbol } from '@/common/components/icons/symbols'
import { TextMedium } from '@/common/components/typography'
import { Colors } from '@/common/constants'

export const ExecutionRequirementsWarning = React.memo(() => {
  return (
    <Container>
      <TextMedium bold>
        <AlertSymbol /> Warning
      </TextMedium>
      <TextMedium>
        Proposal parameters provided do not satisfy current runtime execution constraints. If the proposal was executed
        with the current runtime state, then it would get rejected automatically.
      </TextMedium>{' '}
    </Container>
  )
})

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  background-color: ${Colors.Warning[50]};
  border-radius: 4px;

  ${TextMedium} {
    display: flex;
    align-items: center;
    column-gap: 4px;
  }
`
