import { useMachine } from '@xstate/react'
import Axios from 'axios'
import React, { useEffect, useMemo } from 'react'
import styled from 'styled-components'

import { asOnBoardingSteps, onBoardingSteps } from '@/app/components/OnboardingOverlay/OnBoardingOverlay'
import { CloseButton } from '@/common/components/buttons'
import { FailureModal } from '@/common/components/FailureModal'
import { WarningIcon } from '@/common/components/icons/WarningIcon'
import { ModalFooter, ScrolledModal } from '@/common/components/Modal'
import { HorizontalStepper } from '@/common/components/Stepper/HorizontalStepper'
import { TextMedium } from '@/common/components/typography'
import { WaitModal } from '@/common/components/WaitModal'
import { Colors } from '@/common/constants'
import { useModal } from '@/common/hooks/useModal'
import { useOnBoarding } from '@/common/hooks/useOnBoarding'
import { OnBoardingAccount } from '@/common/modals/OnBoardingModal/OnBoardingAccount'
import { OnBoardingMembership } from '@/common/modals/OnBoardingModal/OnBoardingMembership'
import { OnBoardingPlugin } from '@/common/modals/OnBoardingModal/OnBoardingPlugin'
import { SetMembershipAccount } from '@/common/providers/onboarding/types'
import { MemberFormFields } from '@/memberships/modals/BuyMembershipModal/BuyMembershipFormModal'
import { BuyMembershipSuccessModal } from '@/memberships/modals/BuyMembershipModal/BuyMembershipSuccessModal'
import { buyMembershipMachine } from '@/memberships/modals/BuyMembershipModal/machine'

export const OnBoardingModal = () => {
  const { hideModal } = useModal()
  const { isLoading, status, membershipAccount, setMembershipAccount } = useOnBoarding()
  const [state, send] = useMachine(buyMembershipMachine)

  const step = useMemo(() => {
    switch (status) {
      case 'installPlugin':
        return <OnBoardingPlugin />
      case 'addAccount':
        return <OnBoardingAccount onAccountSelect={setMembershipAccount} />
      case 'createMembership':
        return (
          <OnBoardingMembership
            setMembershipAccount={setMembershipAccount as SetMembershipAccount}
            onSubmit={(params: MemberFormFields) => send({ type: 'DONE', form: params })}
            membershipAccount={membershipAccount as string}
          />
        )
      default:
        return null
    }
  }, [status, membershipAccount])

  useEffect(() => {
    async function submitNewMembership(form: MemberFormFields) {
      const membershipData = {
        account: membershipAccount,
        handle: form.handle,
        avatar: form.avatarUri,
        about: form.about
      }
      const { data } = await Axios.post('http://localhost:4000/register', membershipData)
      console.log(data)
    }

    if (state.matches('transaction')) {
      submitNewMembership(state.context.form)
    }
  }, [JSON.stringify(state)])

  if (isLoading || !status || status === 'finished') {
    return null
  }

  if (state.matches('transaction')) {
    return (
      <WaitModal
        onClose={hideModal}
        title='Pending transaction'
        description="Please wait while your membership is being created. Our faucet server will create it for you so you don't need to worry about any fees. This should take about 15 seconds."
      />
    )
  }

  if (state.matches('success')) {
    const { form, memberId } = state.context
    return <BuyMembershipSuccessModal onClose={hideModal} member={form} memberId={memberId?.toString()} />
  }

  if (state.matches('error')) {
    return (
      <FailureModal onClose={hideModal} events={state.context.transactionEvents}>
        There was a problem with creating a membership for {state.context.form.name}.
      </FailureModal>
    )
  }

  return (
    <StyledModal onClose={hideModal} modalSize='m' modalHeight='m'>
      <StepperWrapper>
        <HorizontalStepper steps={asOnBoardingSteps(onBoardingSteps, status)} />
        <StyledCloseButton onClick={hideModal} />
      </StepperWrapper>
      {step}
    </StyledModal>
  )
}

export const OnBoardingTextFooter = ({ text }: { text: string }) => (
  <OnBoardingTextFooterWrapper>
    <WarningIcon />
    <TextMedium>{text}</TextMedium>
  </OnBoardingTextFooterWrapper>
)

const StyledCloseButton = styled(CloseButton)`
  position: absolute;
  right: 10px;
  top: 10px;
`

const StepperWrapper = styled.div`
  display: grid;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 0 52px;
  height: 80px;
  position: relative;
  background-color: ${Colors.Black[700]};
`

const StyledModal = styled(ScrolledModal)`
  grid-template-rows: 80px 1fr 64px;
  max-width: 780px;
`

const OnBoardingTextFooterWrapper = styled(ModalFooter)`
  display: flex;
  grid-column-gap: 5px;
  justify-items: center;
  justify-content: center;
  background-color: ${Colors.Black[100]};
`
