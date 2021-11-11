import { useMachine } from '@xstate/react'
import React, { useMemo } from 'react'
import styled from 'styled-components'

import { asOnBoardingSteps, onBoardingSteps } from '@/app/components/OnboardingOverlay/OnBoardingOverlay'
import { CloseButton } from '@/common/components/buttons'
import { FailureModal } from '@/common/components/FailureModal'
import { WarningIcon } from '@/common/components/icons/WarningIcon'
import { ModalFooter, ScrolledModal } from '@/common/components/Modal'
import { HorizontalStepper } from '@/common/components/Stepper/HorizontalStepper'
import { TextMedium } from '@/common/components/typography'
import { Colors } from '@/common/constants'
import { useApi } from '@/common/hooks/useApi'
import { useModal } from '@/common/hooks/useModal'
import { useObservable } from '@/common/hooks/useObservable'
import { useOnBoardingStatus } from '@/common/hooks/useOnBoardingStatus'
import { OnBoardingAccount } from '@/common/modals/OnBoardingModal/OnBoardingAccount'
import { OnBoardingMembership } from '@/common/modals/OnBoardingModal/OnBoardingMembership'
import { OnBoardingPlugin } from '@/common/modals/OnBoardingModal/OnBoardingPlugin'
import { OnBoardingTokens } from '@/common/modals/OnBoardingModal/OnBoardingTokens'
import { MemberFormFields } from '@/memberships/modals/BuyMembershipModal/BuyMembershipFormModal'
import { BuyMembershipSignModal } from '@/memberships/modals/BuyMembershipModal/BuyMembershipSignModal'
import { BuyMembershipSuccessModal } from '@/memberships/modals/BuyMembershipModal/BuyMembershipSuccessModal'
import { buyMembershipMachine } from '@/memberships/modals/BuyMembershipModal/machine'
import { toMemberTransactionParams } from '@/memberships/modals/utils'

export const OnBoardingModal = () => {
  const { isLoading, status, setFreeTokens } = useOnBoardingStatus()
  const { api, connectionState } = useApi()
  const membershipPrice = useObservable(api?.query.members.membershipPrice(), [connectionState])
  const [state, send] = useMachine(buyMembershipMachine)
  const { hideModal } = useModal()

  const step = useMemo(() => {
    switch (status) {
      case 'installPlugin':
        return <OnBoardingPlugin />
      case 'addAccount':
        return <OnBoardingAccount onAccountSelect={setFreeTokens} />
      case 'getFreeTokens':
        return <OnBoardingTokens onRedemption={() => setFreeTokens('redeemed')} />
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
        onClose={hideModal}
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
    <StyledModal onClose={hideModal} modalSize="m">
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
  width: 100%;
  height: 80px;
  display: grid;
  place-items: center;
  position: relative;
  background-color: ${Colors.Black[700]};

  > *:first-child {
    width: 80%;
  }
`

const StyledModal = styled(ScrolledModal)`
  > *:last-child {
    background-color: ${Colors.Black[100]};
  }
`

const OnBoardingTextFooterWrapper = styled(ModalFooter)`
  display: flex;
  grid-column-gap: 5px;
  justify-items: center;
  justify-content: center;
`
