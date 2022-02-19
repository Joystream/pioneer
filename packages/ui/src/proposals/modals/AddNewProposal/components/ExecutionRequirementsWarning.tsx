import React, { useEffect, useMemo } from 'react'
import styled from 'styled-components'
import { State, Typestate } from 'xstate'

import { Checkbox } from '@/common/components/forms'
import { WarningIcon } from '@/common/components/icons/WarningIcon'
import { TextMedium } from '@/common/components/typography'
import { Colors } from '@/common/constants'
import { AddNewProposalContext, AddNewProposalEvent } from '@/proposals/modals/AddNewProposal/machine'

interface Props {
  state: State<AddNewProposalContext, AddNewProposalEvent, any, Typestate<AddNewProposalContext>>
  setValid: (state: boolean) => void
}

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

  return <WarningContainer setValue={setValid} children={children} />
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
    column-gap: 5px;
  }
`

interface WarningContainerProps {
  children: React.ReactNode
  setValue(value: boolean): void
}

const WarningContainer = ({ children, setValue }: WarningContainerProps) => {
  return (
    <Container>
      <TextMedium bold>
        <WarningIcon /> WARNING
      </TextMedium>
      {children}
      <TextMedium>
        <Checkbox isRequired onChange={setValue} id="execution-requirement" />I understand the risk and want to proceed
      </TextMedium>
    </Container>
  )
}
