import { useMachine } from '@xstate/react'
import React, { useCallback, useEffect, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import * as Yup from 'yup'

import { SelectAccount } from '@/accounts/components/SelectAccount'
import { filterByRequiredStake } from '@/accounts/components/SelectAccount/helpers'
import { useBalance } from '@/accounts/hooks/useBalance'
import { useMyAccounts } from '@/accounts/hooks/useMyAccounts'
import { useMyBalances } from '@/accounts/hooks/useMyBalances'
import { useStakingAccountStatus } from '@/accounts/hooks/useStakingAccountStatus'
import { useTransactionFee } from '@/accounts/hooks/useTransactionFee'
import { accountOrNamed } from '@/accounts/model/accountOrNamed'
import { BountyAnnounceWorkEntryModalCall } from '@/bounty/modals/AnnounceWorkEntryModal/index'
import { announceWorkEntryMachine, AnnounceWorkEntryStates } from '@/bounty/modals/AnnounceWorkEntryModal/machine'
import { AuthorizeTransactionModal } from '@/bounty/modals/AuthorizeTransactionModal/AuthorizeTransactionModal'
import { SuccessTransactionModal } from '@/bounty/modals/SuccessTransactionModal'
import { ButtonPrimary } from '@/common/components/buttons'
import { FailureModal } from '@/common/components/FailureModal'
import { Input, InputComponent, InputNumber } from '@/common/components/forms'
import { getErrorMessage, hasError } from '@/common/components/forms/FieldError'
import {
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
import { TextMedium } from '@/common/components/typography'
import { WaitModal } from '@/common/components/WaitModal'
import { BN_ZERO, Fonts } from '@/common/constants'
import { useApi } from '@/common/hooks/useApi'
import { useModal } from '@/common/hooks/useModal'
import { useSchema } from '@/common/hooks/useSchema'
import { formatTokenValue } from '@/common/model/formatters'
import { MemberInfo } from '@/memberships/components'
import { useMyMemberships } from '@/memberships/hooks/useMyMemberships'
import { BindStakingAccountModal } from '@/memberships/modals/BindStakingAccountModal/BindStakingAccountModal'
import { SwitchMemberModalCall } from '@/memberships/modals/SwitchMemberModal'
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
  const balances = useMyBalances()
  const amount = bounty.entrantStake
  const [state, send] = useMachine(announceWorkEntryMachine)
  const balance = useBalance(state.context.stakingAccount?.address)
  const stakingStatus = useStakingAccountStatus(state.context.stakingAccount?.address, activeMember?.id)

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

  const transaction = useMemo(() => {
    if (api && isConnected && activeMember) {
      if (stakingStatus === 'confirmed') {
        return api.tx.bounty.announceWorkEntry(activeMember.id, bounty.id, state.context.stakingAccount?.address ?? '')
      }

      return api.tx.utility.batch([
        api.tx.members.confirmStakingAccount(activeMember.id, state.context.stakingAccount?.address ?? ''),
        api.tx.bounty.announceWorkEntry(activeMember.id, bounty.id, state.context.stakingAccount?.address ?? ''),
      ])
    }
  }, [activeMember?.id, state.context.stakingAccount?.address, isConnected, stakingStatus])

  const fee = useTransactionFee(activeMember?.controllerAccount, transaction)

  const nextStep = useCallback(() => {
    send('NEXT')
  }, [])

  useEffect(() => {
    if (state.matches(AnnounceWorkEntryStates.requirementsVerification)) {
      if (!activeMember) {
        return showModal<SwitchMemberModalCall>({
          modal: 'SwitchMember',
          data: {
            originalModalName: 'BountyAnnounceWorkEntryModal',
            originalModalData: { bounty },
          },
        })
      } else if (api && transaction) {
        nextStep()
      }
    }

    if (state.matches(AnnounceWorkEntryStates.beforeTransaction)) {
      send(stakingStatus === 'free' ? 'REQUIRES_STAKING_CANDIDATE' : 'BOUND')
    }
  }, [state, activeMember?.id, stakingStatus])

  if (state.matches(AnnounceWorkEntryStates.requirementsVerification)) {
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

  if (state.matches(AnnounceWorkEntryStates.success)) {
    return (
      <SuccessTransactionModal
        buttonLabel={t('modals.announceWorkEntry.successButton')}
        onClose={hideModal}
        onButtonClick={hideModal}
        message={t('modals.announceWorkEntry.success', { bounty: bounty.title })}
      />
    )
  }
  if (state.matches(AnnounceWorkEntryStates.error)) {
    return (
      <FailureModal onClose={hideModal} events={state.context.transactionEvents}>
        {t('modals.contribute.error')}
      </FailureModal>
    )
  }

  if (state.matches(AnnounceWorkEntryStates.cancel)) {
    return <FailureModal onClose={hideModal}>{t('common:modals.transactionCanceled')}</FailureModal>
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
    <Modal onClose={hideModal} modalSize="l">
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
              <ReadOnlyInput value={bounty.id} readOnly />
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
              <SelectAccount
                onChange={(account) => send('SET_STAKING_ACCOUNT', { account })}
                selected={state.context.stakingAccount}
                filter={(account) => filterByRequiredStake(amount, 'Bounties', balances[account.address])}
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
                units="JOY"
                disabled
              >
                <InputNumber id="amount-input" value={amount.toString()} isTokenValue disabled />
              </InputComponent>
            </TransactionAmount>
          </Row>
        </ScrolledModalContainer>
      </ScrolledModalBody>
      <ModalFooter>
        <TransactionInfoContainer>
          <TransactionInfo title={t('modals.common.contributeAmount')} value={amount} />
          <TransactionInfo
            title={t('modals.common.transactionFee.label')}
            value={fee?.transactionFee}
            tooltipText={t('modals.common.transactionFee.tooltip')}
          />
        </TransactionInfoContainer>
        <ButtonPrimary size="medium" disabled={!isValid} onClick={nextStep}>
          {t('modals.announceWorkEntry.nextButton')}
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

const MemberInfoWithMargin = styled(MemberInfo)`
  margin: 0 16px;
`
