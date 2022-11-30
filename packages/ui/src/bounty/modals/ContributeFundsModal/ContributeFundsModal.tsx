import BN from 'bn.js'
import React, { useCallback, useEffect, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import * as Yup from 'yup'

import { SelectedAccount } from '@/accounts/components/SelectAccount'
import { useBalance } from '@/accounts/hooks/useBalance'
import { useMyAccounts } from '@/accounts/hooks/useMyAccounts'
import { useTransactionFee } from '@/accounts/hooks/useTransactionFee'
import { InsufficientFundsModal } from '@/accounts/modals/InsufficientFundsModal'
import { accountOrNamed } from '@/accounts/model/accountOrNamed'
import { useApi } from '@/api/hooks/useApi'
import { CurrencyName } from '@/app/constants/currency'
import { FundedRange } from '@/bounty/components/FundedRange'
import { AuthorizeTransactionModal } from '@/bounty/modals/AuthorizeTransactionModal/AuthorizeTransactionModal'
import { BountyContributeFundsModalCall } from '@/bounty/modals/ContributeFundsModal/index'
import { contributeFundsMachine, ContributeFundStates } from '@/bounty/modals/ContributeFundsModal/machine'
import { SuccessTransactionModal } from '@/bounty/modals/SuccessTransactionModal'
import { isFundingLimited } from '@/bounty/types/Bounty'
import { Input, InputComponent, TokenInput } from '@/common/components/forms'
import { getErrorMessage, hasError } from '@/common/components/forms/FieldError'
import {
  AmountButton,
  AmountButtons,
  Modal,
  ModalHeader,
  ModalTransactionFooter,
  Row,
  ScrolledModalBody,
  ScrolledModalContainer,
  TransactionAmount,
} from '@/common/components/Modal'
import { TransactionInfo } from '@/common/components/TransactionInfo'
import { BN_ZERO, Fonts } from '@/common/constants'
import { useMachine } from '@/common/hooks/useMachine'
import { useModal } from '@/common/hooks/useModal'
import { useSchema } from '@/common/hooks/useSchema'
import { formatTokenValue } from '@/common/model/formatters'
import { asBN } from '@/common/utils/bn'
import { BNSchema, minContext } from '@/common/utils/validation'
import { useMyMemberships } from '@/memberships/hooks/useMyMemberships'

const schema = Yup.object().shape({
  amount: BNSchema.test(
    minContext(`\${min}${CurrencyName.integerValue} is smallest allowed contribution`, 'minAmount')
  ),
})

export const ContributeFundsModal = () => {
  const { t } = useTranslation('bounty')
  const {
    modalData: { bounty },
    hideModal,
  } = useModal<BountyContributeFundsModalCall>()
  const { api, isConnected } = useApi()
  const [state, send] = useMachine(contributeFundsMachine)
  const minFundingLimit = asBN(api?.consts.bounty.minFundingLimit ?? 0)
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

  const { transaction, feeInfo: fee } = useTransactionFee(
    activeMember?.controllerAccount,
    () => {
      if (api && isConnected && activeMember) {
        return api.tx.bounty.fundBounty({ Member: activeMember.id }, bounty.id, state.context.amount ?? minFundingLimit)
      }
    },
    [activeMember?.id, state.context.amount, isConnected, minFundingLimit.toString()]
  )

  const nextStep = useCallback(() => {
    send('NEXT')
  }, [])

  const fundedDetails = useMemo(() => {
    const funding = bounty.fundingType
    const isLimited = isFundingLimited(funding)
    const minRangeValue = isLimited ? funding.minAmount : undefined
    const maxRangeValue = isLimited ? funding.maxAmount : funding.target
    return {
      rangeValue: bounty.totalFunding,
      minRangeValue,
      maxRangeValue,
    }
  }, [bounty])

  useEffect(() => {
    if (state.matches(ContributeFundStates.requirementsVerification)) {
      if (fee && fee.canAfford) {
        nextStep()
      }

      if (fee && !fee.canAfford) {
        send('FAIL')
      }
    }
  }, [state, activeMember?.id, fee])

  if (!activeMember || !transaction || !api || !fee) {
    return null
  }
  const controllerAccount = accountOrNamed(allAccounts, activeMember.controllerAccount, 'Controller Account')

  if (state.matches(ContributeFundStates.requirementsFailed)) {
    return (
      <InsufficientFundsModal
        onClose={hideModal}
        address={activeMember.controllerAccount}
        amount={fee.transactionFee}
      />
    )
  }

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
    <Modal onClose={hideModal} modalSize="m">
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
              <ReadOnlyInput value={bounty.title} readOnly />
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
                units={CurrencyName.integerValue}
                validation={hasError('amount', errors) ? 'invalid' : undefined}
                message={hasError('amount', errors) ? getErrorMessage('amount', errors) : ' '}
                tooltipText="If a contribution is made that brings the cumulative funding equal to or above the upper bound, then the difference is returned, and the bounty proceeds to the Working Period stage."
                tooltipLinkURL="https://joystream.gitbook.io/testnet-workspace/system/bounties#stage"
                tooltipLinkText="Learn more"
              >
                <TokenInput
                  id="amount-input"
                  value={state.context.amount}
                  onChange={(_, value) => setAmount(value)}
                  placeholder="0"
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
          <Row>
            <FundedRange
              {...fundedDetails}
              rangeValue={fundedDetails.rangeValue.add(state.context.amount ?? BN_ZERO)}
              flat
            />
          </Row>
        </ScrolledModalContainer>
      </ScrolledModalBody>
      <ModalTransactionFooter
        transactionFee={fee?.transactionFee}
        next={{ disabled: !isValid, label: t('modals.contribute.nextButton'), onClick: nextStep }}
      >
        <TransactionInfo title={t('modals.common.contributeAmount')} value={state.context.amount} />
      </ModalTransactionFooter>
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
