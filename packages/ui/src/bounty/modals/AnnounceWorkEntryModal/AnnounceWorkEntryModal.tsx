import React, { useCallback, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import * as Yup from 'yup'

import { SelectStakingAccount } from '@/accounts/components/SelectAccount'
import { useBalance } from '@/accounts/hooks/useBalance'
import { useHasRequiredStake } from '@/accounts/hooks/useHasRequiredStake'
import { useMyAccounts } from '@/accounts/hooks/useMyAccounts'
import { useStakingAccountStatus } from '@/accounts/hooks/useStakingAccountStatus'
import { useTransactionFee } from '@/accounts/hooks/useTransactionFee'
import { MoveFundsModalCall } from '@/accounts/modals/MoveFundsModal'
import { accountOrNamed } from '@/accounts/model/accountOrNamed'
import { useApi } from '@/api/hooks/useApi'
import { CurrencyName } from '@/app/constants/currency'
import { BountyAnnounceWorkEntryModalCall } from '@/bounty/modals/AnnounceWorkEntryModal/index'
import { announceWorkEntryMachine, AnnounceWorkEntryStates } from '@/bounty/modals/AnnounceWorkEntryModal/machine'
import { AuthorizeTransactionModal } from '@/bounty/modals/AuthorizeTransactionModal/AuthorizeTransactionModal'
import { Input, InputComponent, TokenInput } from '@/common/components/forms'
import { getErrorMessage, hasError } from '@/common/components/forms/FieldError'
import {
  Modal,
  ModalHeader,
  ModalTransactionFooter,
  Row,
  ScrolledModalBody,
  ScrolledModalContainer,
  TransactionAmount,
} from '@/common/components/Modal'
import { TransactionInfo } from '@/common/components/TransactionInfo'
import { TextMedium } from '@/common/components/typography'
import { BN_ZERO, Fonts } from '@/common/constants'
import { useMachine } from '@/common/hooks/useMachine'
import { useModal } from '@/common/hooks/useModal'
import { useSchema } from '@/common/hooks/useSchema'
import { formatTokenValue } from '@/common/model/formatters'
import { MemberInfo } from '@/memberships/components'
import { useMyMemberships } from '@/memberships/hooks/useMyMemberships'
import { BindStakingAccountModal } from '@/memberships/modals/BindStakingAccountModal/BindStakingAccountModal'
import { IStakingAccountSchema, StakingAccountSchema } from '@/memberships/model/validation'

const transactionSteps = [{ title: 'Bind staking account' }, { title: 'Announce Work' }]

const schema = Yup.object().shape({
  account: StakingAccountSchema.required(''),
})

export const AnnounceWorkEntryModal = () => {
  const { t } = useTranslation('bounty')
  const {
    modalData: { bounty },
    hideModal,
    showModal,
  } = useModal<BountyAnnounceWorkEntryModalCall>()
  const { api, isConnected } = useApi()
  const boundingLock = api?.consts.members.candidateStake ?? BN_ZERO
  const { active: activeMember } = useMyMemberships()
  const { allAccounts } = useMyAccounts()
  const amount = bounty.entrantStake
  const [state, send] = useMachine(announceWorkEntryMachine)
  const balance = useBalance(state.context.stakingAccount?.address)
  const stakingStatus = useStakingAccountStatus(state.context.stakingAccount?.address, activeMember?.id)
  const { hasRequiredStake } = useHasRequiredStake(amount ?? BN_ZERO, 'Bounties')

  const { setContext, errors, isValid } = useSchema<IStakingAccountSchema>(
    { account: state.context.stakingAccount },
    schema
  )

  useEffect(() => {
    if (balance) {
      const requiredAmount = stakingStatus === 'free' ? boundingLock.add(amount) : amount
      setContext({
        balances: balance,
        stakeLock: 'Bounties',
        requiredAmount,
        stakingStatus: stakingStatus,
      })
    }
  }, [JSON.stringify(balance), amount, stakingStatus])

  const { transaction, feeInfo: fee } = useTransactionFee(
    activeMember?.controllerAccount,
    () => {
      if (api && isConnected && activeMember) {
        if (stakingStatus === 'confirmed') {
          return api.tx.bounty.announceWorkEntry(
            activeMember.id,
            bounty.id,
            state.context.stakingAccount?.address ?? ''
          )
        }

        return api.tx.utility.batch([
          api.tx.members.confirmStakingAccount(activeMember.id, state.context.stakingAccount?.address ?? ''),
          api.tx.bounty.announceWorkEntry(activeMember.id, bounty.id, state.context.stakingAccount?.address ?? ''),
        ])
      }
    },
    [activeMember?.id, state.context.stakingAccount?.address, isConnected, stakingStatus]
  )

  const nextStep = useCallback(() => {
    send('NEXT')
  }, [])
  useEffect(() => {
    if (state.matches(AnnounceWorkEntryStates.requirementsVerification)) {
      if (fee) {
        const areFundsSufficient = fee.canAfford && hasRequiredStake
        send(areFundsSufficient ? 'NEXT' : 'FAIL')
      }
    }

    if (state.matches(AnnounceWorkEntryStates.beforeTransaction)) {
      fee?.canAfford ? send(stakingStatus === 'free' ? 'REQUIRES_STAKING_CANDIDATE' : 'BOUND') : send('FAIL')
    }
  }, [state, activeMember?.id, stakingStatus, JSON.stringify(fee), hasRequiredStake])

  if (!activeMember || !transaction || !api || !fee) {
    return null
  }

  if (state.matches(AnnounceWorkEntryStates.requirementsFailed)) {
    showModal<MoveFundsModalCall>({
      modal: 'MoveFundsModal',
      data: {
        requiredStake: amount,
        lock: 'Bounties',
      },
    })

    return null
  }

  if (state.matches(AnnounceWorkEntryStates.bindStakingAccount)) {
    const transaction = api?.tx.members.addStakingAccountCandidate(activeMember.id)

    return (
      <BindStakingAccountModal
        onClose={hideModal}
        transaction={transaction}
        signer={state.context.stakingAccount?.address ?? ''}
        service={state.children.bindStakingAccount}
        memberId={activeMember.id}
        steps={transactionSteps}
      />
    )
  }

  if (state.matches(AnnounceWorkEntryStates.transaction)) {
    const service = state.children.transaction
    const controllerAccount = accountOrNamed(allAccounts, activeMember.controllerAccount, 'Controller Account')

    return (
      <AuthorizeTransactionModal
        onClose={hideModal}
        transaction={transaction}
        service={service}
        controllerAccount={controllerAccount}
        description={t('modals.announceWorkEntry.authorizeDescription', { value: formatTokenValue(amount) })}
        buttonLabel={t('modals.announceWorkEntry.nextButton')}
        contributeAmount={amount}
        useMultiTransaction={{ steps: transactionSteps, active: 1 }}
      />
    )
  }

  return (
    <Modal onClose={hideModal} modalSize="m">
      <ModalHeader title={t('modals.announceWorkEntry.title')} onClick={hideModal} />
      <ScrolledModalBody>
        <ScrolledModalContainer>
          <Row>
            <InputComponent
              inputSize="l"
              label={t('modals.announceWorkEntry.bountyId.label')}
              tooltipText={t('modals.announceWorkEntry.bountyId.tooltip')}
              required
              inputDisabled
            >
              <ReadOnlyInput value={bounty.title} readOnly />
            </InputComponent>
          </Row>
          <Row>
            <InputComponent
              inputSize="l"
              label={t('modals.announceWorkEntry.memberId.label')}
              tooltipText={t('modals.announceWorkEntry.memberId.tooltip')}
              required
              inputDisabled
            >
              <MemberInfoWithMargin member={activeMember} skipModal />
            </InputComponent>
          </Row>
          <Row>
            <TextMedium dark>{t('modals.announceWorkEntry.fillDetails')}</TextMedium>
          </Row>
          <Row>
            <InputComponent
              inputSize="l"
              label={t('modals.announceWorkEntry.stakingAccount.label')}
              tooltipText={t('modals.announceWorkEntry.stakingAccount.tooltip')}
              required
              validation={hasError('account', errors) ? 'invalid' : undefined}
              message={getErrorMessage('account', errors) ?? ''}
            >
              <SelectStakingAccount
                name="workEntry.stakingAccount"
                onChange={(account) => send('SET_STAKING_ACCOUNT', { account })}
                selected={state.context.stakingAccount}
                minBalance={amount}
                lockType="Bounties"
              />
            </InputComponent>
          </Row>
          <Row>
            <TransactionAmount alignItemsToEnd>
              <InputComponent
                label={t('modals.announceWorkEntry.selectAmount')}
                sublabel={t('modals.announceWorkEntry.selectAmountSubtitle')}
                id="amount-input"
                required
                inputWidth="s"
                units={CurrencyName.integerValue}
                disabled
                tooltipText={t('modals.announceWorkEntry.selectAmountTooltip')}
              >
                <TokenInput id="amount-input" value={amount} disabled />
              </InputComponent>
            </TransactionAmount>
          </Row>
        </ScrolledModalContainer>
      </ScrolledModalBody>
      <ModalTransactionFooter
        transactionFee={fee?.transactionFee}
        next={{ disabled: !isValid, label: t('modals.announceWorkEntry.nextButton'), onClick: nextStep }}
      >
        <TransactionInfo title={t('modals.common.contributeAmount')} value={amount} />
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

const MemberInfoWithMargin = styled(MemberInfo)`
  margin: 0 16px;
`
