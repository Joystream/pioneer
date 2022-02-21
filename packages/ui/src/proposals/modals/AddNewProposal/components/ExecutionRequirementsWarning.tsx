import React, { useEffect, useMemo } from 'react'
import styled from 'styled-components'
import { State, Typestate } from 'xstate'

import { AlertSymbol } from '@/common/components/icons/symbols'
import { TextMedium } from '@/common/components/typography'
import { Colors } from '@/common/constants'
import { AddNewProposalContext, AddNewProposalEvent } from '@/proposals/modals/AddNewProposal/machine'

interface Props {
  state: State<AddNewProposalContext, AddNewProposalEvent, any, Typestate<AddNewProposalContext>>
  setValid: (state: boolean) => void
}

// They `state.matches` fn couldn't accept `as const` for `specificParameters` values and `any` was only solution I saw
export const proposalsWithExecutionRequirements: any[] = ['specificParameters.fundingRequest']

export const ExecutionRequirementsWarning = ({ state, setValid }: Props) => {
  const children = useMemo(() => {
    switch (true) {
      case state.matches('specificParameters.fundingRequest'):
        return (
          <TextMedium>
            The council budget at the time of proposal execution cannot be lower than the sum of amounts
          </TextMedium>
        )
      default:
        return null
    }
  }, [state.value])

  useEffect(() => {
    setValid(!children)
  }, [children, state.value])

  if (!children) {
    return null
  }

  return <WarningContainer children={children} />
}

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

interface WarningContainerProps {
  children: React.ReactNode
}

const WarningContainer = ({ children }: WarningContainerProps) => {
  return (
    <Container>
      <TextMedium bold>
        <AlertSymbol /> Warning
      </TextMedium>
      {children}
    </Container>
  )
}
