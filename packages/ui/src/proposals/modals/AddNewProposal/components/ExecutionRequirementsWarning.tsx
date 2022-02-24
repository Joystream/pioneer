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
      <TextMedium inter>
        Parameters provided here are checked across two set of constraints which are executed at different times,
        creation and execution constraints. Current inputs for proposal parameters violate the execution constraints for
        this proposal, meaning while you can create this proposal, if the runtime execution constraints for this
        proposal remain unchanged at the time of council vote, this proposal will be automatically rejected.
        <a
          href="https://app.gitbook.com/o/-M-C0Rf1ILeSmMugzduG/s/-M-C0W9924TH_Qp2jnDV/governance/proposals#parameters-general-and-specific"
          target="_blank"
        >
          Learn more &#62;
        </a>
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

  p:first-child {
    display: flex;
    align-items: center;
    column-gap: 4px;
  }

  p:last-child {
    display: flex;
    flex-direction: column;
  }
`
