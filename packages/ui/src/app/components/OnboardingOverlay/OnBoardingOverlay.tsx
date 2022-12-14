import { Wallet } from 'injectweb3-connect'
import React, { useCallback } from 'react'
import styled from 'styled-components'

import { useMyAccounts } from '@/accounts/hooks/useMyAccounts'
import { useApi } from '@/api/hooks/useApi'
import { BenefitsTable } from '@/app/components/OnboardingOverlay/components/BenefitsTable'
import { DrawerContainer } from '@/app/components/OnboardingOverlay/components/DrawerContainer'
import { ButtonPrimary } from '@/common/components/buttons'
import { DropDownToggle } from '@/common/components/buttons/DropDownToggle'
import { ArrowDownIcon } from '@/common/components/icons/ArrowDownIcon'
import { ArrowUpExpandedIcon } from '@/common/components/icons/ArrowUpExpandedIcon'
import { PolkadotAppInfo } from '@/common/components/PolkadotAppInfo'
import { StepperStep } from '@/common/components/Stepper'
import { HorizontalStepper } from '@/common/components/Stepper/HorizontalStepper'
import { VerticalStaticStepper } from '@/common/components/Stepper/VerticalStaticStepper'
import { TextHuge, TextSmall } from '@/common/components/typography'
import { Colors, ZIndex } from '@/common/constants'
import { useLocalStorage } from '@/common/hooks/useLocalStorage'
import { useModal } from '@/common/hooks/useModal'
import { useNetworkEndpoints } from '@/common/hooks/useNetworkEndpoints'
import { useOnBoarding } from '@/common/hooks/useOnBoarding'
import { useToggle } from '@/common/hooks/useToggle'
import { OnBoardingStatus } from '@/common/providers/onboarding/types'

export const onBoardingSteps: StepperStep[] = [
  {
    title: 'Connect wallet',
    type: 'next',
    id: 'installPlugin',
  },
  {
    title: 'Connect account',
    type: 'next',
    id: 'addAccount',
  },
  {
    title: 'Create free membership',
    type: 'next',
    id: 'createMembership',
  },
]

const innerStaticStepperSteps = [
  {
    title: 'Connect wallet',
    subtitle: 'Select or install a free browser wallet extension. Popular with Joystream community:',
  },
  {
    title: 'Connect account',
    subtitle: 'Select a wallet account to connect your Joystream membership with.',
    walletIcon: false,
  },
  {
    title: 'Create a free membership',
    subtitle: 'Set up a free Joystream membership.',
    walletIcon: false,
  },
]

export const asOnBoardingSteps = (steps: StepperStep[], status: OnBoardingStatus): StepperStep[] => {
  const activeIndex = steps.findIndex((step) => step.id === status)
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
  const { api } = useApi()
  const { showModal } = useModal()
  const { wallet } = useMyAccounts()
  const [selectedWallet] = useLocalStorage<Wallet | undefined>('recentWallet')
  const { isLoading, status } = useOnBoarding()
  const [isOpen, toggle] = useToggle()
  const [endpoints] = useNetworkEndpoints()

  const openOnBoardingModal = useCallback(() => {
    showModal({ modal: 'OnBoardingModal' })
  }, [wallet, selectedWallet])

  if (isLoading || !status || status === 'finished' || !api?.isConnected) {
    return null
  }

  return (
    <>
      <TopSpace />
      <MainWrapper>
        <Wrapper>
          <TextContainer>
            <TextHuge bold>Become a member</TextHuge>
            <TextSmall onClick={toggle}>Show how {!isOpen ? <ArrowDownIcon /> : <ArrowUpExpandedIcon />}</TextSmall>
          </TextContainer>
          <StepperContainer>
            <HorizontalStepper steps={onBoardingSteps} />
          </StepperContainer>
          <ButtonContainer>
            <ButtonPrimary size="large" onClick={openOnBoardingModal}>
              {!wallet ? 'Connect Wallet' : 'Join Now'}
            </ButtonPrimary>
          </ButtonContainer>
        </Wrapper>
        <StyledDropDown isDropped={isOpen}>
          <DropdownContent>
            <DrawerContainer
              title="What are the benefits?"
              subtitle="Becoming a Joystream member allows you to contribute to the project."
            >
              <BenefitsTable />
            </DrawerContainer>
            <DrawerContainer
              title="How to become a member?"
              subtitle="Joining the community is as simple as one-two-three!"
            >
              <VerticalStaticStepper steps={innerStaticStepperSteps} />
              <ButtonPrimary onClick={openOnBoardingModal} size="large">
                {!wallet ? 'Connect Wallet' : 'Join Now'}
              </ButtonPrimary>
            </DrawerContainer>
            <HorizontalSeparator className="twoColumns" />
            <OnBoardingPolkadotAppInfo className="twoColumns" rpcUrl={endpoints.nodeRpcEndpoint} />
          </DropdownContent>
        </StyledDropDown>
      </MainWrapper>
    </>
  )
}

const OnBoardingPolkadotAppInfo = styled(PolkadotAppInfo)`
  background-color: ${Colors.Black[600]};
  color: white;
  height: fit-content;
`
const HorizontalSeparator = styled.div`
  width: 100%;
  margin-top: 30px;
  height: 1px;
  background-color: ${Colors.Black[600]};
`

const TopSpace = styled.div`
  width: calc(100% - 226px);
  height: 90px;
`

const MainWrapper = styled.div`
  position: fixed;
  top: 0;
  width: calc(100% - 226px);
  z-index: ${ZIndex.navbar};
`

const StyledDropDown = styled(DropDownToggle)`
  background-color: ${Colors.Black[700]};
  position: absolute;
  z-index: ${ZIndex.navbarInner};
  height: calc(100vh - 85px);
`

const DropdownContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  padding: 33px 24px 33px 33px;
  grid-row-gap: 30px;

  > *:first-child {
    padding-right: 10%;
  }

  > *:nth-child(2) {
    justify-self: center;
  }

  .twoColumns {
    grid-column: 1 / 3;
  }

  button {
    margin: 30px 0 0 50px;
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

export const StepperContainer = styled.div`
  display: flex;
  flex: 3;
  align-items: center;
  padding: 10px;
  justify-content: center;
`
