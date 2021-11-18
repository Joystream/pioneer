import React, { useCallback } from 'react'
import styled from 'styled-components'

import { BenefitsTable } from '@/app/components/OnboardingOverlay/components/BenefitsTable'
import { DrawerContainer } from '@/app/components/OnboardingOverlay/components/DrawerContainer'
import { ButtonPrimary } from '@/common/components/buttons'
import { DropDownToggle } from '@/common/components/buttons/DropDownToggle'
import { ArrowDownIcon } from '@/common/components/icons/ArrowDownIcon'
import { ArrowUpExpandedIcon } from '@/common/components/icons/ArrowUpExpandedIcon'
import { StepperStep } from '@/common/components/Stepper'
import { HorizontalStepper } from '@/common/components/Stepper/HorizontalStepper'
import { VerticalStaticStepper } from '@/common/components/Stepper/VerticalStaticStepper'
import { TextHuge, TextSmall } from '@/common/components/typography'
import { Colors } from '@/common/constants'
import { useOnBoarding } from '@/common/hooks/useOnBoarding'
import { useToggle } from '@/common/hooks/useToggle'
import { OnBoardingStatus } from '@/common/providers/onboarding/types'
import { useModal } from '@/common/hooks/useModal'
import { SwitchMemberModalCall } from '@/memberships/modals/SwitchMemberModal'
import { OnBoardingModalCall } from '@/common/modals/OnBoardingModal'

export const onBoardingSteps: StepperStep[] = [
  {
    title: 'Add Polkadot plugin',
    type: 'next',
    id: 'installPlugin'
  },
  {
    title: 'Connect a Polkadot account',
    type: 'next',
    id: 'addAccount'
  },
  {
    title: 'Create membership for FREE',
    type: 'next',
    id: 'createMembership'
  }
]

const innerStaticStepperSteps = [
  {
    title: 'Install Polkadot extension',
    subtitle: ['and create account', 'then connect it to your joystream membership']
  },
  {
    title: 'Create or select a Polkadot account'
  },
  {
    title: 'Create membership for FREE'
  }
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
  const { showModal } = useModal<OnBoardingModalCall>()
  const { isLoading, status } = useOnBoarding()
  const [isOpen, toggle] = useToggle()
  const openOnBoardingModal = useCallback(() => {
    showModal({ modal: 'OnBoardingModal' })
  }, [])

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
          <ButtonPrimary size='large' onClick={openOnBoardingModal}>
            Join now
          </ButtonPrimary>
        </ButtonContainer>
      </Wrapper>
      <StyledDropDown isDropped={isOpen}>
        <DropdownContent>
          <DrawerContainer title='What are the benefits?'>
            <BenefitsTable />
          </DrawerContainer>
          <DrawerContainer title='How to become a member?'>
            <VerticalStaticStepper steps={innerStaticStepperSteps} />
            <ButtonPrimary onClick={openOnBoardingModal} size='large'>
              Continue
            </ButtonPrimary>
          </DrawerContainer>
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
