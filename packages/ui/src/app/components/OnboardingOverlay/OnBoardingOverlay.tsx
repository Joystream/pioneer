import React from 'react'
import styled from 'styled-components'

import { BenefitsTable } from '@/app/components/OnboardingOverlay/components/BenefitsTable'
import { DrawerContainer } from '@/app/components/OnboardingOverlay/components/DrawerContainer'
import { DropDownToggle } from '@/common/components/buttons/DropDownToggle'
import { ArrowDownIcon } from '@/common/components/icons/ArrowDownIcon'
import { ArrowUpExpandedIcon } from '@/common/components/icons/ArrowUpExpandedIcon'
import { OnBoardingButton } from '@/common/components/OnBoardingButton'
import { StepperStep } from '@/common/components/Stepper'
import { HorizontalStepper } from '@/common/components/Stepper/HorizontalStepper'
import { VerticalStaticStepper } from '@/common/components/Stepper/VerticalStaticStepper'
import { TextHuge, TextSmall } from '@/common/components/typography'
import { Colors } from '@/common/constants'
import { OnBoardingStatus, useOnBoardingStatus } from '@/common/hooks/useOnBoardingStatus'
import { useToggle } from '@/common/hooks/useToggle'

export const onBoardingSteps: StepperStep[] = [
  {
    title: 'Add Polkadot plugin',
    type: 'next',
    id: 'installPlugin',
  },
  {
    title: 'Connect a Polkadot account',
    type: 'next',
    id: 'addAccount',
  },
  {
    title: 'Get FREE tokens',
    type: 'next',
    id: 'getFreeTokens',
  },
  {
    title: 'Create membership',
    type: 'next',
    id: 'createMembership',
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

export const asOnBoardingSteps = (steps: StepperStep[], status: OnBoardingStatus): StepperStep[] => {
  const activeIndex = steps.findIndex((step) => step?.id === status)
  if (activeIndex === -1) return steps.map((step) => ({ ...step, type: 'next' }))

  return steps.map((step, index) => {
    if (index < activeIndex) {
      return { ...step, type: 'past' }
    }
    if (index === activeIndex) {
      return { ...step, type: 'active' }
    }
    return { ...step, type: 'next' }
  })
}

export const OnBoardingOverlay = () => {
  const { isLoading, status } = useOnBoardingStatus()
  const [isOpen, toggle] = useToggle()

  if (isLoading || !status || status === 'finished') {
    return null
  }

  const steps = asOnBoardingSteps(onBoardingSteps, status)

  return (
    <MainWrapper>
      <Wrapper>
        <TextContainer>
          <TextHuge bold>Become a member</TextHuge>
          <TextSmall onClick={toggle}>Show how {!isOpen ? <ArrowDownIcon /> : <ArrowUpExpandedIcon />}</TextSmall>
        </TextContainer>
        <StepperContainer>
          <HorizontalStepper steps={steps} />
        </StepperContainer>
        <ButtonContainer>
          <OnBoardingButton>Join now</OnBoardingButton>
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
          <OnBoardingButton>Continue</OnBoardingButton>
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
  z-index: 84;
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

  > * {
    overflow: hidden;
  }
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
  }
`

const StepperContainer = styled.div`
  display: flex;
  flex: 3;
  align-items: center;
  padding: 10px;
  justify-content: center;
`
