import { useMachine } from '@xstate/react'
import React, { useEffect, useMemo, useState } from 'react'
import styled from 'styled-components'

import { asOnBoardingSteps, onBoardingSteps } from '@/app/components/OnboardingOverlay/OnBoardingOverlay'
import { CloseButton } from '@/common/components/buttons'
import { FailureModal } from '@/common/components/FailureModal'
import { WarningIcon } from '@/common/components/icons/WarningIcon'
import { ModalFooter, ResultText, ScrolledModal } from '@/common/components/Modal'
import { HorizontalStepper } from '@/common/components/Stepper/HorizontalStepper'
import { TextMedium } from '@/common/components/typography'
import { WaitModal } from '@/common/components/WaitModal'
import { Colors } from '@/common/constants'
import { useModal } from '@/common/hooks/useModal'
import { useNetworkEndpoints } from '@/common/hooks/useNetworkEndpoints'
import { useOnBoarding } from '@/common/hooks/useOnBoarding'
import { useQueryNodeTransactionStatus } from '@/common/hooks/useQueryNodeTransactionStatus'
import { onBoardingMachine } from '@/common/modals/OnBoardingModal/machine'
import { OnBoardingAccount } from '@/common/modals/OnBoardingModal/OnBoardingAccount'
import { OnBoardingMembership } from '@/common/modals/OnBoardingModal/OnBoardingMembership'
import { OnBoardingPlugin } from '@/common/modals/OnBoardingModal/OnBoardingPlugin'
import { SetMembershipAccount } from '@/common/providers/onboarding/types'
import { MemberFormFields } from '@/memberships/modals/BuyMembershipModal/BuyMembershipFormModal'
import { BuyMembershipSuccessModal } from '@/memberships/modals/BuyMembershipModal/BuyMembershipSuccessModal'

export const OnBoardingModal = () => {
  const { hideModal } = useModal()
  const { isLoading, status, membershipAccount, setMembershipAccount } = useOnBoarding()
  const [state, send] = useMachine(onBoardingMachine)
  const [membershipData, setMembershipData] = useState<{ id: string; blockHash: string }>()
  const transactionStatus = useQueryNodeTransactionStatus(membershipData?.blockHash)
  const [endpoints] = useNetworkEndpoints()

  const step = useMemo(() => {
    switch (status) {
      // case 'installPlugin':
      //   return <OnBoardingPlugin />
      case 'addAccount':
        return <OnBoardingAccount onAccountSelect={setMembershipAccount} />
      case 'installPlugin':
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
      try {
        const membershipData = {
          account: membershipAccount,
          handle: form.handle,
          name: form.name,
          avatar: form.avatarUri,
          about: form.about,
        }

        const response = await fetch(endpoints.membershipFaucetEndpoint, {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          method: 'POST',
          body: JSON.stringify(membershipData),
        })

        const { error, memberId, blockHash } = await response.json()

        if (error) {
          send({ type: 'ERROR' })
        } else {
          setMembershipData({ id: parseInt(memberId, 16).toString(), blockHash: blockHash })
        }
      } catch (err) {
        send({ type: 'ERROR' })
      }
    }

    if (state.matches('transaction')) {
      submitNewMembership(state.context.form)
    }
  }, [endpoints.membershipFaucetEndpoint, JSON.stringify(state)])

  useEffect(() => {
    if (membershipData?.blockHash && transactionStatus === 'confirmed') {
      send('SUCCESS')
    }
  }, [JSON.stringify(membershipData), transactionStatus])

  if (state.matches('success')) {
    const { form } = state.context
    return <BuyMembershipSuccessModal onClose={hideModal} member={form} memberId={membershipData?.id} />
  }

  if (state.matches('transaction') && transactionStatus === 'rejected') {
    return (
      <WaitModal
        onClose={hideModal}
        title="Pending transaction"
        description="Please wait while your membership is being created. Our faucet server will create it for you so you don't need to worry about any fees. This should take about 15 seconds."
      />
    )
  }

  if (isLoading || !status || status === 'finished') {
    return null
  }

  if (state.matches('error')) {
    return (
      <FailureModal onClose={hideModal}>
        There was a problem with creating a membership for {state.context.form.name}.
        <ResultText>We could not create your membership at the moment! Please, try again later!</ResultText>
      </FailureModal>
    )
  }

  return (
    <StyledModal onClose={hideModal} modalSize="l" modalHeight="m">
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
