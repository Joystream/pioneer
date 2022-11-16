import { useApolloClient } from '@apollo/client'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import styled from 'styled-components'

import { asOnBoardingSteps, onBoardingSteps } from '@/app/components/OnboardingOverlay/OnBoardingOverlay'
import { CloseButton } from '@/common/components/buttons'
import { FailureModal } from '@/common/components/FailureModal'
import { WarningIcon } from '@/common/components/icons/WarningIcon'
import { ModalFooter, ResultText, ScrolledModal } from '@/common/components/Modal'
import { ColumnGapBlock } from '@/common/components/page/PageContent'
import { HorizontalStepper } from '@/common/components/Stepper/HorizontalStepper'
import { TextMedium } from '@/common/components/typography'
import { WaitModal } from '@/common/components/WaitModal'
import { Colors } from '@/common/constants'
import { useDebounce } from '@/common/hooks/useDebounce'
import { useMachine } from '@/common/hooks/useMachine'
import { useModal } from '@/common/hooks/useModal'
import { useNetworkEndpoints } from '@/common/hooks/useNetworkEndpoints'
import { useOnBoarding } from '@/common/hooks/useOnBoarding'
import { useQueryNodeTransactionStatus } from '@/common/hooks/useQueryNodeTransactionStatus'
import { onBoardingMachine } from '@/common/modals/OnBoardingModal/machine'
import { OnBoardingAccount } from '@/common/modals/OnBoardingModal/OnBoardingAccount'
import { OnBoardingMembership } from '@/common/modals/OnBoardingModal/OnBoardingMembership'
import { OnBoardingPlugin } from '@/common/modals/OnBoardingModal/OnBoardingPlugin'
import { OnBoardingStatus, SetMembershipAccount } from '@/common/providers/onboarding/types'
import { definedValues } from '@/common/utils'
import { MemberFormFields } from '@/memberships/modals/BuyMembershipModal/BuyMembershipFormModal'
import { BuyMembershipSuccessModal } from '@/memberships/modals/BuyMembershipModal/BuyMembershipSuccessModal'
import { toExternalResources } from '@/memberships/modals/utils'

export const OnBoardingModal = () => {
  const { hideModal } = useModal()
  const { status: realStatus, membershipAccount, setMembershipAccount, isLoading } = useOnBoarding()
  const status = useDebounce(realStatus, 50)
  const [state, send] = useMachine(onBoardingMachine)
  const [membershipData, setMembershipData] = useState<{ id: string; blockHash: string }>()
  const transactionStatus = useQueryNodeTransactionStatus(!!membershipData?.blockHash, membershipData?.blockHash)
  const apolloClient = useApolloClient()
  const [endpoints] = useNetworkEndpoints()
  const statusRef = useRef<OnBoardingStatus>()

  const step = useMemo(() => {
    switch (status ?? statusRef.current) {
      case 'installPlugin':
        return <OnBoardingPlugin />
      case 'addAccount':
        return <OnBoardingAccount onAccountSelect={setMembershipAccount} />
      case 'createMembership':
        if (endpoints.membershipFaucetEndpoint) {
          return (
            <OnBoardingMembership
              setMembershipAccount={setMembershipAccount as SetMembershipAccount}
              onSubmit={(params: MemberFormFields) => send({ type: 'DONE', form: params })}
              membershipAccount={membershipAccount as string}
            />
          )
        }
      // eslint-disable-next-line no-fallthrough
      default:
        return null
    }
  }, [status, membershipAccount])

  useEffect(() => {
    async function submitNewMembership(form: MemberFormFields) {
      if (!endpoints.membershipFaucetEndpoint) {
        return send({ type: 'ERROR' })
      }
      try {
        const membershipData = {
          account: membershipAccount,
          handle: form.handle,
          name: form.name,
          avatar: form.avatarUri,
          about: form.about,
          captchaToken: form.captchaToken,
          externalResources: toExternalResources(definedValues(form.externalResources)),
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
    if (status) {
      statusRef.current = status
    }
  }, [status])

  useEffect(() => {
    if (membershipData?.blockHash && transactionStatus === 'confirmed') {
      send('SUCCESS')
      apolloClient.refetchQueries({ include: 'active' })
    }
  }, [JSON.stringify(membershipData), transactionStatus])

  if (state.matches('success')) {
    const { form } = state.context
    return <BuyMembershipSuccessModal onClose={hideModal} member={form} memberId={membershipData?.id} />
  }

  if (state.matches('transaction') && transactionStatus !== 'confirmed') {
    return (
      <WaitModal
        onClose={hideModal}
        title="Pending transaction"
        description="Please wait while your membership is being created. Our faucet server will create it for you so you don't need to worry about any fees. This should take about 15 seconds."
      />
    )
  }

  if (status === 'finished' || isLoading || !status) {
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
        <HorizontalStepper steps={asOnBoardingSteps(onBoardingSteps, status ?? statusRef.current)} />
        <StyledCloseButton onClick={hideModal} />
      </StepperWrapper>
      {step}
    </StyledModal>
  )
}

interface OnBoardingTextFooterProps {
  text?: string
  button?: React.ReactNode
}

export const OnBoardingTextFooter = ({ text, button }: OnBoardingTextFooterProps) => (
  <OnBoardingTextFooterWrapper>
    {text && (
      <ColumnGapBlock gap={5}>
        <WarningIcon />
        <TextMedium>{text}</TextMedium>
      </ColumnGapBlock>
    )}
    {button}
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
  justify-content: space-between;
  background-color: ${Colors.Black[100]};
`
