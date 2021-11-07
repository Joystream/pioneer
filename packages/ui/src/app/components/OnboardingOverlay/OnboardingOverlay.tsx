import React, { useState } from 'react'
import styled from 'styled-components'

import { BenefitsTable } from '@/app/components/OnboardingOverlay/components/BenefitsTable'
import { DrawerContainer } from '@/app/components/OnboardingOverlay/components/DrawerContainer'
import { ButtonPrimary } from '@/common/components/buttons'
import { DropDownToggle } from '@/common/components/buttons/DropDownToggle'
import { ArrowDownExpandedIcon } from '@/common/components/icons'
import { StepperStep } from '@/common/components/Stepper'
import { HorizontalStepper } from '@/common/components/Stepper/HorizontalStepper'
import { VerticalStaticStepper } from '@/common/components/Stepper/VerticalStaticStepper'
import { TextHuge, TextSmall } from '@/common/components/typography'
import { Colors } from '@/common/constants'

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

const innerStaticStepperSteps = [
  {
    title: 'Install Polkadot extension',
    subtitle: ['and create account', 'then connect it to your joystream membership'],
  },
  {
    title: 'Create or select a Polkadot account',
  },
  {
    title: 'Get FREE tokens',
  },
  {
    title: 'Create membership',
  },
]

export const OnboardingOverlay = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <MainWrapper>
      <Wrapper>
        <TextContainer>
          <TextHuge bold>Become a member</TextHuge>
          <TextSmall onClick={() => setIsOpen((prev) => !prev)}>
            Show how <ArrowDownExpandedIcon /> {/*todo add icons and make them rotate on open*/}
          </TextSmall>
        </TextContainer>
        <StepperContainer>
          <HorizontalStepper steps={steps} />
        </StepperContainer>
        <ButtonContainer>
          <ButtonPrimary size="large">Join now</ButtonPrimary>
        </ButtonContainer>
      </Wrapper>
      <StyledDropDown isDropped={isOpen}>
        <DropdownContent>
          <DrawerContainer title="What are the benefits?">
            <BenefitsTable />
          </DrawerContainer>
          <DrawerContainer title="How to become a member?">
            <VerticalStaticStepper steps={innerStaticStepperSteps} />
          </DrawerContainer>
          <div />
          <ButtonPrimary size="large">Continue</ButtonPrimary>
        </DropdownContent>
      </StyledDropDown>
    </MainWrapper>
  )
}

const MainWrapper = styled.div`
  position: relative;
`

const StyledDropDown = styled(DropDownToggle)`
  background-color: ${Colors.Black[700]};
  position: absolute;
  z-index: 100000;
`

const DropdownContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-row-gap: 30px;
  padding: 40px;

  > *:first-child {
    padding-right: 10%;
  }

  > *:nth-child(2) {
    justify-self: center;
  }

  button {
    margin-left: 30%;
  }
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
    cursor: pointer;
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
  flex: 1;
  align-items: center;
  padding: 10px;
`
