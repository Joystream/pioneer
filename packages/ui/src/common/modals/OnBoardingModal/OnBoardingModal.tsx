import { useMachine } from '@xstate/react'
import React, { useMemo } from 'react'
import styled from 'styled-components'

import { asOnBoardingSteps, onBoardingSteps } from '@/app/components/OnboardingOverlay/OnBoardingOverlay'
import { CloseButton } from '@/common/components/buttons'
import { FailureModal } from '@/common/components/FailureModal'
import { WarningIcon } from '@/common/components/icons/WarningIcon'
import { Modal, ModalFooter } from '@/common/components/Modal'
import { HorizontalStepper } from '@/common/components/Stepper/HorizontalStepper'
import { TextMedium } from '@/common/components/typography'
import { Colors } from '@/common/constants'
import { useApi } from '@/common/hooks/useApi'
import { useObservable } from '@/common/hooks/useObservable'
import { useOnBoarding } from '@/common/hooks/useOnBoarding'
import { OnBoardingAccount } from '@/common/modals/OnBoardingModal/OnBoardingAccount'
import { OnBoardingMembership } from '@/common/modals/OnBoardingModal/OnBoardingMembership'
import { OnBoardingPlugin } from '@/common/modals/OnBoardingModal/OnBoardingPlugin'
import { OnBoardingTokens } from '@/common/modals/OnBoardingModal/OnBoardingTokens'
import { MemberFormFields } from '@/memberships/modals/BuyMembershipModal/BuyMembershipFormModal'
import { BuyMembershipSignModal } from '@/memberships/modals/BuyMembershipModal/BuyMembershipSignModal'
import { BuyMembershipSuccessModal } from '@/memberships/modals/BuyMembershipModal/BuyMembershipSuccessModal'
import { buyMembershipMachine } from '@/memberships/modals/BuyMembershipModal/machine'
import { toMemberTransactionParams } from '@/memberships/modals/utils'

interface Props {
  toggleModal: () => void
}

export const OnBoardingModal = ({ toggleModal }: Props) => {
  const { isLoading, status, setFreeTokens } = useOnBoarding()
  const { api, connectionState } = useApi()
  const membershipPrice = useObservable(api?.query.members.membershipPrice(), [connectionState])
  const [state, send] = useMachine(buyMembershipMachine)

  const step = useMemo(() => {
    switch (status) {
      case 'installPlugin':
        return <OnBoardingPlugin />
      case 'addAccount':
        return <OnBoardingAccount onAccountSelect={setFreeTokens} />
      case 'getFreeTokens':
        return <OnBoardingTokens onRedemption={() => setFreeTokens && setFreeTokens('redeemed')} />
      case 'createMembership':
        return (
          <OnBoardingMembership
            onSubmit={(params: MemberFormFields) => send({ type: 'DONE', form: params })}
            membershipPrice={membershipPrice}
          />
        )
      default:
        return null
    }
  }, [status, membershipPrice])

  if (isLoading || !status || status === 'finished') {
    return null
  }

  if (state.matches('transaction') && api) {
    const transaction = api.tx.members.buyMembership(toMemberTransactionParams(state.context.form))
    const { form } = state.context
    const service = state.children.transaction

    return (
      <BuyMembershipSignModal
        onClose={toggleModal}
        membershipPrice={membershipPrice}
        formData={form}
        transaction={transaction}
        initialSigner={form.controllerAccount}
        service={service}
      />
    )
  }

  if (state.matches('success')) {
    const { form, memberId } = state.context
    return <BuyMembershipSuccessModal onClose={toggleModal} member={form} memberId={memberId?.toString()} />
  }

  if (state.matches('error')) {
    return (
      <FailureModal onClose={toggleModal} events={state.context.transactionEvents}>
        There was a problem with creating a membership for {state.context.form.name}.
      </FailureModal>
    )
  }

  return (
    <StyledModal onClose={toggleModal} modalSize="l" modalHeight="m">
      <StepperWrapper>
        <HorizontalStepper steps={asOnBoardingSteps(onBoardingSteps, status)} />
        <StyledCloseButton onClick={toggleModal} />
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

const StyledModal = styled(Modal)`
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
