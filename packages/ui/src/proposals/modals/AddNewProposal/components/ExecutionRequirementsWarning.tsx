import React, { useMemo } from 'react'
import { FieldError, useFormContext } from 'react-hook-form'
import styled from 'styled-components'

import { AlertSymbol, LinkSymbol } from '@/common/components/icons/symbols'
import { TooltipExternalLink } from '@/common/components/Tooltip'
import { TextMedium } from '@/common/components/typography'
import { Colors } from '@/common/constants'

// const PROPOSALS_WITH_SPECIFIC_EXECUTION_WARNING = ['updateWorkingGroupBudget']

export const ExecutionRequirementsWarning = React.memo(({ currentState }: { currentState: string }) => {
  const formContext = useFormContext()

  const possibleMessage = useMemo(() => {
    return (
      Object.values((formContext.formState.errors as any)[currentState] ?? {}).find(
        (value) => (value as FieldError).type === 'execution'
      ) as FieldError
    )?.message
  }, [JSON.stringify(formContext?.formState.errors)])

  return (
    <Container>
      <TextMedium bold>
        <AlertSymbol /> Warning
      </TextMedium>
      <TextMedium inter>
        {possibleMessage ??
          'Parameters provided here are checked across two set of constraints which are executed at different times,\n' +
            'creation and execution constraints. Current inputs for proposal parameters violate the execution constraints for\n' +
            'this proposal, meaning while you can create this proposal, if the runtime execution constraints for this\n' +
            'proposal remain unchanged at the time of council vote, this proposal will be automatically rejected.'}
        <TooltipExternalLink
          href="https://app.gitbook.com/o/-M-C0Rf1ILeSmMugzduG/s/-M-C0W9924TH_Qp2jnDV/governance/proposals#parameters-general-and-specific"
          target="_blank"
        >
          <TextMedium>Learn more</TextMedium> <LinkSymbol />
        </TooltipExternalLink>
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

    a {
      margin-top: 10px;
    }
  }
`
