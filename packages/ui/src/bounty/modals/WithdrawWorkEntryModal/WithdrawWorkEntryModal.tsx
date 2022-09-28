import BN from 'bn.js'
import React, { useEffect, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

import { useMyAccounts } from '@/accounts/hooks/useMyAccounts'
import { useTransactionFee } from '@/accounts/hooks/useTransactionFee'
import { InsufficientFundsModal } from '@/accounts/modals/InsufficientFundsModal'
import { accountOrNamed } from '@/accounts/model/accountOrNamed'
import { useApi } from '@/api/hooks/useApi'
import { AuthorizeTransactionModal } from '@/bounty/modals/AuthorizeTransactionModal'
import { WithdrawWorkModalMachine, WithdrawWorkModalState } from '@/bounty/modals/WithdrawWorkEntryModal/machine'
import { InputComponent, InputContainer } from '@/common/components/forms'
import { FileIcon } from '@/common/components/icons'
import {
  Modal,
  ModalHeader,
  ModalTransactionFooter,
  ScrolledModalBody,
  ScrolledModalContainer,
} from '@/common/components/Modal'
import { ColumnGapBlock } from '@/common/components/page/PageContent'
import { TextBig, TextMedium, TokenValue } from '@/common/components/typography'
import { Colors } from '@/common/constants'
import { useMachine } from '@/common/hooks/useMachine'
import { useModal } from '@/common/hooks/useModal'
import { SelectedMember } from '@/memberships/components/SelectMember'
import { useMyMemberships } from '@/memberships/hooks/useMyMemberships'

import { BountyWithdrawWorkEntryModalCall } from '.'

export const WithdrawWorkEntryModal = () => {
  const { t } = useTranslation('bounty')
  const { api, connectionState } = useApi()
  const {
    modalData: { bounty },
    hideModal,
  } = useModal<BountyWithdrawWorkEntryModalCall>()

  const [state, send] = useMachine(WithdrawWorkModalMachine)

  const { active: activeMember } = useMyMemberships()
  const { allAccounts } = useMyAccounts()

  const entry = useMemo(
    () => activeMember && bounty.entries?.find((entry) => entry.worker.id === activeMember.id && !entry.withdrawn),
    [activeMember?.id]
  )

  const { transaction, feeInfo } = useTransactionFee(
    activeMember?.controllerAccount,
    () => {
      if (api && connectionState === 'connected' && activeMember && entry) {
        return api.tx.bounty.withdrawWorkEntry(activeMember.id, bounty.id, entry.id)
      }
    },
    [activeMember?.id, entry?.id, connectionState]
  )

  useEffect(() => {
    if (state.matches(WithdrawWorkModalState.requirementsVerification)) {
      if (feeInfo && feeInfo.canAfford) {
        send('NEXT')
      }

      if (feeInfo && !feeInfo.canAfford) {
        send('FAIL')
      }
    }
  }, [feeInfo, state])

  if (
    !api ||
    !activeMember ||
    !transaction ||
    !feeInfo ||
    state.matches(WithdrawWorkModalState.requirementsVerification)
  ) {
    return null
  }

  if (state.matches(WithdrawWorkModalState.requirementsFailed)) {
    return (
      <InsufficientFundsModal
        onClose={hideModal}
        address={activeMember.controllerAccount}
        amount={feeInfo.transactionFee}
      />
    )
  }

  if (state.matches(WithdrawWorkModalState.transaction)) {
    const service = state.children.transaction
    const controllerAccount = accountOrNamed(allAccounts, activeMember.controllerAccount, 'Controller Account')

    return (
      <AuthorizeTransactionModal
        onClose={hideModal}
        transaction={transaction}
        service={service}
        controllerAccount={controllerAccount}
        description={t('modals.withdrawWorkEntry.authorizeDescription')}
        buttonLabel={t('modals.withdrawWorkEntry.submitButton')}
      />
    )
  }

  return (
    <Modal onClose={hideModal} modalSize="m">
      <ModalHeader title={t('modals.withdrawWorkEntry.title')} onClick={hideModal} />
      <ScrolledModalBody>
        <ScrolledModalContainer>
          <WarningWrapper>
            <ColumnGapBlock gap={4}>
              <TextMedium bold value>
                <FileIcon /> {t('modals.withdrawWorkEntry.warningBox.question')}
              </TextMedium>
            </ColumnGapBlock>
            <TextMedium inter light>
              {t('modals.withdrawWorkEntry.warningBox.text')}
            </TextMedium>
          </WarningWrapper>
          <Container
            disabled
            label={t('modals.withdrawWorkEntry.bountyInput.label')}
            tooltipText={t('modals.withdrawWorkEntry.bountyInput.tooltipText')}
            inputSize="l"
          >
            <TextBig value bold>
              {bounty.title}
            </TextBig>
          </Container>
          <SelectedMember
            disabled
            label={t('modals.withdrawWorkEntry.memberInput.label')}
            tooltipText={t('modals.withdrawWorkEntry.memberInput.tooltipText')}
            member={entry?.worker}
          />
          {entry?.works?.map((work, index) => (
            <Container key={work.id} label={t('modals.withdrawWorkEntry.workInput', { value: index + 1 })} disabled>
              <TextMedium value bold>
                {work.title}
              </TextMedium>
            </Container>
          ))}
          <Container disabled label={t('modals.withdrawWorkEntry.stakeInput')} inputSize="l">
            <TokenValue value={entry?.stake ? new BN(entry.stake) : undefined} size="s" />
          </Container>
        </ScrolledModalContainer>
      </ScrolledModalBody>
      <ModalTransactionFooter
        transactionFee={feeInfo.transactionFee}
        next={{
          label: t('modals.withdrawWorkEntry.submitButton'),
          onClick: () => send('NEXT'),
        }}
      />
    </Modal>
  )
}

const WarningWrapper = styled.div`
  background-color: ${Colors.Warning[50]};
  width: 100%;
  padding: 10px 15px;
  > * {
    padding: 5px 0;
  }
`

const Container = styled(InputComponent)`
  ${InputContainer} {
    padding-left: 16px;
  }
`
