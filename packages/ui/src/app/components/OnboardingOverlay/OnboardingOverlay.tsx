import React, { useState } from 'react'
import styled from 'styled-components'

import { ButtonPrimary } from '@/common/components/buttons'
import { ArrowDownExpandedIcon } from '@/common/components/icons'
import { StepperStep } from '@/common/components/Stepper'
import { HorizontalStepper } from '@/common/components/Stepper/HorizontalStepper'
import { TextHuge, TextSmall } from '@/common/components/typography'
import { Colors, Transitions } from '@/common/constants'

const steps: StepperStep[] = [
  {
    title: 'Add Polkadot plugin',
    type: 'next',
  },
  {
    title: 'Create or select a Polkadot account',
    type: 'next',
  },
  {
    title: 'Get FREE tokens',
    type: 'next',
  },
  {
    title: 'Create membership',
    type: 'next',
  },
]

export const OnboardingOverlay = () => {
  const [state, setState] = useState(false)

  return (
    <Wrapper>
      <TextContainer>
        <TextHuge bold>Become a member</TextHuge>
        <TextSmall onClick={() => setState((prev) => !prev)}>
          Show how <ArrowDownExpandedIcon />
        </TextSmall>
      </TextContainer>
      <StepperContainer>
        <HorizontalStepper steps={steps} />
      </StepperContainer>
      <ButtonContainer>
        <ButtonPrimary size="large">Join now</ButtonPrimary>
      </ButtonContainer>
      <Dropdown isOpen={state}>keafhds</Dropdown>
    </Wrapper>
  )
}

const Dropdown = styled.div<{ isOpen: boolean }>`
  width: 100%;
  height: ${({ isOpen }) => (isOpen ? '100%' : '0px')};
  background-color: red;
  position: absolute;
  transition: ${Transitions.all};
  inset: 0;
  top: 85px;
`

const Wrapper = styled.div`
  width: 100%;
  background-color: ${Colors.Black[700]};
  color: ${Colors.White};
  height: 85px;
  display: flex;
  position: relative;
`

const ButtonContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: end;
  padding-right: 24px;
`

const TextContainer = styled.div`
  display: flex;
  padding: 13px 0 19px 33px;
  flex-direction: column;
  justify-content: space-between;
  flex: 1;

  > *:last-child {
    color: ${Colors.Black[400]};
  }

  svg {
    height: 16px;
    width: 16px;
    margin-left: 5px;
    margin-bottom: -4px;
  }
`

const StepperContainer = styled.div`
  display: flex;
  flex: 3;
  align-items: center;
  padding: 10px;
`
