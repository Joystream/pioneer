import { Editor } from '@joystream/markdown-editor/types'
import { useMachine } from '@xstate/react'
import BN from 'bn.js'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

import { SelectAccount } from '@/accounts/components/SelectAccount'
import { useBalance } from '@/accounts/hooks/useBalance'
import { useMyAccounts } from '@/accounts/hooks/useMyAccounts'
import { useTransactionFee } from '@/accounts/hooks/useTransactionFee'
import { accountOrNamed } from '@/accounts/model/accountOrNamed'
import { Account } from '@/accounts/types'
import { BountyAnnounceWorkEntryModalCall } from '@/bounty/modals/AnnounceWorkEntryModal/index'
import { AuthorizeTransactionModal } from '@/bounty/modals/AuthorizeTransactionModal/AuthorizeTransactionModal'
import { contributeFundsMachine, ContributeFundStates } from '@/bounty/modals/ContributeFundsModal/machine'
import { SuccessTransactionModal } from '@/bounty/modals/SuccessTransactionModal'
import { ButtonPrimary } from '@/common/components/buttons'
import { CKEditor } from '@/common/components/CKEditor'
import { FailureModal } from '@/common/components/FailureModal'
import { Input, InputComponent, InputNumber } from '@/common/components/forms'
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
import { TextMedium } from '@/common/components/typography'
import { Fonts } from '@/common/constants'
import { useApi } from '@/common/hooks/useApi'
import { useModal } from '@/common/hooks/useModal'
import { formatTokenValue } from '@/common/model/formatters'
import { MemberInfo } from '@/memberships/components'
import { useMyMemberships } from '@/memberships/hooks/useMyMemberships'
import { SwitchMemberModalCall } from '@/memberships/modals/SwitchMemberModal'

export const AnnounceWorkEntryModal = () => {
  const { t } = useTranslation('bounty')
  const {
    modalData: { bounty },
    hideModal,
    showModal,
  } = useModal<BountyAnnounceWorkEntryModalCall>()
  const { api, isConnected } = useApi()
  const minWorkEntrantStake = api?.consts.bounty.minWorkEntrantStake.toNumber() ?? 0
  const { active: activeMember } = useMyMemberships()
  const { allAccounts } = useMyAccounts()
  const [amount, setAmount] = useState<string>(String(minWorkEntrantStake))
  const [description, setDescription] = useState<string>()
  const [state, send] = useMachine(contributeFundsMachine)
  const [account, setAccount] = useState<Account>()
  const balance = useBalance(account?.address)

  const setStakingAmount = useCallback((_, value: number) => setAmount(String(value)), [])

  const valid = useMemo(
    () => new BN(amount).gten(minWorkEntrantStake) && !!account && !!description,
    [amount, account, description]
  )

  const setMaxAmount = useCallback(() => {
    balance && setAmount(balance.transferable.toString())
  }, [balance])

  const setHalfAmount = useCallback(() => {
    balance && setAmount(balance.transferable.divn(2).toString())
  }, [balance])

  const handleDescription = useCallback((_, editor: Editor) => {
    setDescription(editor.getData())
  }, [])

  const transaction = useMemo(() => {
    if (api && isConnected && activeMember) {
      return api.tx.bounty.fundBounty({ Member: activeMember.id }, bounty.id, amount)
    }
  }, [JSON.stringify(activeMember), isConnected])

  const fee = useTransactionFee(activeMember?.controllerAccount, transaction)

  const contribution = useMemo(() => new BN(amount), [amount])

  const nextStep = useCallback(() => {
    send('NEXT')
  }, [])

  useEffect(() => {
    balance &&
      setAmount(
        balance.transferable.gten(minWorkEntrantStake) ? String(minWorkEntrantStake) : balance.transferable.toString()
      )
  }, [balance?.transferable.toString(), account?.address])

  useEffect(() => {
    if (state.matches(ContributeFundStates.requirementsVerification)) {
      if (!activeMember) {
        showModal<SwitchMemberModalCall>({ modal: 'SwitchMember' })
      } else {
        nextStep()
      }
    }
  }, [state, activeMember?.id])

  if (!activeMember || !transaction || state.matches(ContributeFundStates.requirementsVerification)) {
    return null
  }

  if (state.matches(ContributeFundStates.success)) {
    return (
      <SuccessTransactionModal
        buttonLabel={t('modals.announceWorkEntry.successButton')}
        onClose={hideModal}
        onButtonClick={hideModal}
        message={t('modals.announceWorkEntry.success', { bounty: bounty.title })}
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

  if (state.matches(ContributeFundStates.transaction)) {
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
        contributeAmount={contribution}
      />
    )
  }

  return (
    <Modal onClose={hideModal} modalSize="l" modalHeight="xl">
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
            >
              <SelectAccount onChange={setAccount} selected={account} />
            </InputComponent>
          </Row>
          <Row>
            <TransactionAmount alignItemsToEnd>
              <InputComponent
                label={t('modals.announceWorkEntry.selectAmount')}
                sublabel={t('modals.announceWorkEntry.selectAmountSubtitle', {
                  value: formatTokenValue(minWorkEntrantStake),
                })}
                id="amount-input"
                required
                inputWidth="s"
                units="JOY"
              >
                <InputNumber
                  id="amount-input"
                  value={amount}
                  onChange={setStakingAmount}
                  placeholder="0"
                  isTokenValue
                />
              </InputComponent>
              <AmountButtons>
                <AmountButton size="small" onClick={setHalfAmount}>
                  {t('modals.announceWorkEntry.halfButton')}
                </AmountButton>
                <AmountButton size="small" onClick={setMaxAmount}>
                  {t('modals.announceWorkEntry.maxButton')}
                </AmountButton>
              </AmountButtons>
            </TransactionAmount>
          </Row>
          <Row>
            <InputComponent inputSize="auto" label={t('modals.announceWorkEntry.description.label')} required>
              <CKEditor onChange={handleDescription} />
            </InputComponent>
          </Row>
        </ScrolledModalContainer>
      </ScrolledModalBody>
      <ModalFooter>
        <TransactionInfoContainer>
          <TransactionInfo title={t('modals.common.contributeAmount')} value={contribution} />
          <TransactionInfo
            title={t('modals.common.transactionFee.label')}
            value={fee?.transactionFee}
            tooltipText={t('modals.common.transactionFee.tooltip')}
          />
        </TransactionInfoContainer>
        <ButtonPrimary size="medium" disabled={!valid} onClick={nextStep}>
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
