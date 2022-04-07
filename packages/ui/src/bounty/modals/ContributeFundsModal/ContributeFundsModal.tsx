import { useMachine } from '@xstate/react'
import BN from 'bn.js'
import React, { useCallback, useEffect, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import * as Yup from 'yup'

import { SelectedAccount } from '@/accounts/components/SelectAccount'
import { useBalance } from '@/accounts/hooks/useBalance'
import { useMyAccounts } from '@/accounts/hooks/useMyAccounts'
import { useTransactionFee } from '@/accounts/hooks/useTransactionFee'
import { accountOrNamed } from '@/accounts/model/accountOrNamed'
import { FundedRange } from '@/bounty/components/FundedRange'
import { AuthorizeTransactionModal } from '@/bounty/modals/AuthorizeTransactionModal/AuthorizeTransactionModal'
import { BountyContributeFundsModalCall } from '@/bounty/modals/ContributeFundsModal/index'
import { contributeFundsMachine, ContributeFundStates } from '@/bounty/modals/ContributeFundsModal/machine'
import { SuccessTransactionModal } from '@/bounty/modals/SuccessTransactionModal'
import { FundingLimited, isPerpetual } from '@/bounty/types/Bounty'
import { ButtonPrimary } from '@/common/components/buttons'
import { FailureModal } from '@/common/components/FailureModal'
import { Input, InputComponent, InputNumber } from '@/common/components/forms'
import { getErrorMessage, hasError } from '@/common/components/forms/FieldError'
import {
  AmountButton,
  AmountButtons,
  Modal,
  ModalFooter,
  ModalHeader,
  Row,
  ScrolledModalBody,
  ScrolledModalContainer,
  TransactionAmount,
  TransactionInfoContainer,
} from '@/common/components/Modal'
import { TransactionInfo } from '@/common/components/TransactionInfo'
import { WaitModal } from '@/common/components/WaitModal'
import { BN_ZERO, Fonts } from '@/common/constants'
import { useApi } from '@/common/hooks/useApi'
import { useModal } from '@/common/hooks/useModal'
import { useSchema } from '@/common/hooks/useSchema'
import { formatTokenValue } from '@/common/model/formatters'
import { BNSchema, minContext } from '@/common/utils/validation'
import { useMyMemberships } from '@/memberships/hooks/useMyMemberships'
import { SwitchMemberModalCall } from '@/memberships/modals/SwitchMemberModal'

const schema = Yup.object().shape({
  amount: BNSchema.test(minContext('${min} tJOY is smallest allowed contribution', 'minAmount')),
})

export const ContributeFundsModal = () => {
  const { t } = useTranslation('bounty')
  const {
    modalData: { bounty },
    hideModal,
    showModal,
  } = useModal<BountyContributeFundsModalCall>()
  const { api, isConnected } = useApi()
  const [state, send] = useMachine(contributeFundsMachine)
  const minFundingLimit = api?.consts.bounty.minFundingLimit ?? BN_ZERO
  const { active: activeMember } = useMyMemberships()
  const { allAccounts } = useMyAccounts()
  const balance = useBalance(activeMember?.controllerAccount)

  const setAmount = useCallback((amount: BN) => send('SET_AMOUNT', { amount }), [])

  const { setContext, isValid, errors } = useSchema({ amount: state.context.amount }, schema)
  useEffect(() => {
    if (minFundingLimit) {
      setContext({
        minAmount: minFundingLimit,
      })

      if (!state.context.amount && state.matches(ContributeFundStates.contribute)) {
        setAmount(minFundingLimit)
      }
    }
  }, [minFundingLimit, state.value])

  const setMaxAmount = useCallback(() => {
    balance && setAmount(balance.transferable)
  }, [balance])

  const setHalfAmount = useCallback(() => {
    balance && setAmount(balance.transferable.divn(2))
  }, [balance])

  const transaction = useMemo(() => {
    if (api && isConnected && activeMember) {
      return api.tx.bounty.fundBounty({ Member: activeMember.id }, bounty.id, state.context.amount ?? minFundingLimit)
    }
  }, [activeMember?.id, state.context.amount, isConnected, minFundingLimit.toString()])

  const fee = useTransactionFee(activeMember?.controllerAccount, transaction)

  const nextStep = useCallback(() => {
    send('NEXT')
  }, [])

  useEffect(() => {
    if (state.matches(ContributeFundStates.requirementsVerification)) {
      if (!activeMember) {
        showModal<SwitchMemberModalCall>({
          modal: 'SwitchMember',
          data: {
            originalModalName: 'BountyContributeFundsModal',
            originalModalData: { bounty },
          },
        })
      } else {
        nextStep()
      }
    }
  }, [state, activeMember?.id])

  if (state.matches(ContributeFundStates.requirementsVerification)) {
    return (
      <WaitModal
        title={t('common:modals.wait.title')}
        description={t('common:modals.wait.description')}
        onClose={hideModal}
        requirements={[
          { name: 'Initializing server connection', state: !!api },
          { name: 'Loading member', state: !!activeMember },
          { name: 'Creating transaction', state: !!transaction },
        ]}
      />
    )
  }

  if (!activeMember || !transaction || !api) {
    return null
  }
  const controllerAccount = accountOrNamed(allAccounts, activeMember.controllerAccount, 'Controller Account')

  if (state.matches(ContributeFundStates.success)) {
    return (
      <SuccessTransactionModal
        buttonLabel={t('modals.contribute.successButton')}
        onClose={hideModal}
        onButtonClick={hideModal}
        message={t('modals.contribute.success', { bounty: bounty.title })}
      />
    )
  }

  if (state.matches(ContributeFundStates.error)) {
    return (
      <FailureModal onClose={hideModal} events={state.context.transactionEvents}>
        {t('modals.contribute.error')}
      </FailureModal>
    )
  }

  if (state.matches(ContributeFundStates.cancel)) {
    return <FailureModal onClose={hideModal}>{t('common:modals.transactionCanceled')}</FailureModal>
  }

  if (state.matches(ContributeFundStates.transaction) && state.context.amount) {
    const service = state.children.transaction

    return (
      <AuthorizeTransactionModal
        onClose={hideModal}
        transaction={transaction}
        service={service}
        controllerAccount={controllerAccount}
        description={t('modals.contribute.authorizeDescription', {
          value: formatTokenValue(state.context.amount),
        })}
        buttonLabel={t('modals.contribute.nextButton')}
        contributeAmount={state.context.amount}
      />
    )
  }

  return (
    <Modal onClose={hideModal} modalSize="l">
      <ModalHeader title={t('modals.contribute.title')} onClick={hideModal} />
      <ScrolledModalBody>
        <ScrolledModalContainer>
          <Row>
            <InputComponent
              inputSize="l"
              label={t('modals.contribute.bountyId.label')}
              tooltipText={t('modals.contribute.bountyId.tooltip')}
              required
              inputDisabled
            >
              <ReadOnlyInput value={bounty.id} readOnly />
            </InputComponent>
          </Row>
          <Row>
            <InputComponent
              inputSize="l"
              label={t('modals.contribute.stakingAccount.label')}
              tooltipText={t('modals.contribute.stakingAccount.tooltip')}
              required
              inputDisabled
              borderless
            >
              <SelectedAccount account={controllerAccount} />
            </InputComponent>
          </Row>
          <Row>
            <TransactionAmount>
              <InputComponent
                label={t('modals.contribute.selectAmount')}
                sublabel={t('modals.contribute.selectAmountSubtitle', { value: formatTokenValue(minFundingLimit) })}
                id="amount-input"
                required
                inputWidth="s"
                units="JOY"
                validation={hasError('amount', errors) ? 'invalid' : undefined}
                message={hasError('amount', errors) ? getErrorMessage('amount', errors) : ' '}
              >
                <InputNumber
                  id="amount-input"
                  value={state.context.amount?.toString()}
                  onChange={(_, value) => setAmount(new BN(value))}
                  placeholder="0"
                  isTokenValue
                />
              </InputComponent>
              <StyledAmountButtons>
                <AmountButton size="small" onClick={setHalfAmount}>
                  {t('modals.contribute.halfButton')}
                </AmountButton>
                <AmountButton size="small" onClick={setMaxAmount}>
                  {t('modals.contribute.maxButton')}
                </AmountButton>
              </StyledAmountButtons>
            </TransactionAmount>
          </Row>
          {!isPerpetual(bounty.fundingType) && (
            <Row>
              <FundedRange
                rangeValue={bounty.totalFunding}
                maxRangeValue={(bounty.fundingType as FundingLimited).maxAmount}
                minRangeValue={(bounty.fundingType as FundingLimited).minAmount}
                flat
              />
            </Row>
          )}
        </ScrolledModalContainer>
      </ScrolledModalBody>
      <ModalFooter>
        <TransactionInfoContainer>
          <TransactionInfo title={t('modals.common.contributeAmount')} value={state.context.amount} />
          <TransactionInfo
            title={t('modals.common.transactionFee.label')}
            value={fee?.transactionFee}
            tooltipText={t('modals.common.transactionFee.tooltip')}
          />
        </TransactionInfoContainer>
        <ButtonPrimary size="medium" disabled={!isValid} onClick={nextStep}>
          {t('modals.contribute.nextButton')}
        </ButtonPrimary>
      </ModalFooter>
    </Modal>
  )
}

const ReadOnlyInput = styled(Input)`
  font-family: ${Fonts.Grotesk};
  font-size: 16px;
  line-height: 24px;
  font-weight: 700;
`

const StyledAmountButtons = styled(AmountButtons)`
  margin-bottom: -40px;
`
