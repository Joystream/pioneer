import { useMachine } from '@xstate/react'
import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

import { useMyAccounts } from '@/accounts/hooks/useMyAccounts'
import { useTransactionFee } from '@/accounts/hooks/useTransactionFee'
import { accountOrNamed } from '@/accounts/model/accountOrNamed'
import { AuthorizeTransactionModal } from '@/bounty/modals/AuthorizeTransactionModal'
import { SuccessTransactionModal } from '@/bounty/modals/SuccessTransactionModal'
import { WithdrawWorkModalMachine, WithdrawWorkModalState } from '@/bounty/modals/WithdrawWorkEntryModal/machine'
import { ButtonPrimary } from '@/common/components/buttons'
import { FailureModal } from '@/common/components/FailureModal'
import { InputComponent, InputContainer } from '@/common/components/forms'
import { FileIcon } from '@/common/components/icons'
import { Modal, ModalHeader, ModalBody, ModalFooter, TransactionInfoContainer, ScrolledModalBody, ScrolledModalContainer } from '@/common/components/Modal'
import { ColumnGapBlock, RowGapBlock } from '@/common/components/page/PageContent'
import { TransactionInfo } from '@/common/components/TransactionInfo'
import { TextMedium, TextBig, TokenValue } from '@/common/components/typography'
import { Colors } from '@/common/constants'
import { useApi } from '@/common/hooks/useApi'
import { useModal } from '@/common/hooks/useModal'
import { SelectedMember } from '@/memberships/components/SelectMember'
import { useMyMemberships } from '@/memberships/hooks/useMyMemberships'

import { BountyWithdrawWorkEntryModalCall } from '.'

export const WithdrawWorkEntryModal = () => {
  const { t } = useTranslation('bounty')
  const { api, connectionState } = useApi()
  const {
    modalData: { bounty, entry },
    hideModal,
  } = useModal<BountyWithdrawWorkEntryModalCall>()

  const [state, send] = useMachine(WithdrawWorkModalMachine)

  const { active: activeMember } = useMyMemberships()
  const { allAccounts } = useMyAccounts()

  const transaction = useMemo(() => {
    if (api && connectionState === 'connected' && activeMember) {
      return api.tx.bounty.withdrawWorkEntry(activeMember.id, bounty.id, entry.id)
    }
  }, [JSON.stringify(activeMember), connectionState])

  const feeInfo = useTransactionFee(activeMember?.controllerAccount, transaction)

  if (!api || !activeMember || !transaction || !feeInfo) {
    return null
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

  if (state.matches(WithdrawWorkModalState.success)) {
    return (
      <SuccessTransactionModal
        onClose={hideModal}
        onButtonClick={hideModal}
        message={t('modals.withdrawWorkEntry.success')}
        buttonLabel={t('modals.withdrawWorkEntry.successButton')}
      />
    )
  }

  if (state.matches(WithdrawWorkModalState.error)) {
    return (
      <FailureModal onClose={hideModal} events={state.context.transactionEvents}>
        {t('modals.withdrawWorkEntry.error')}
      </FailureModal>
    )
  }

  return (
    <Modal onClose={hideModal} modalSize="l" modalHeight="xl">
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
            member={entry.worker}
          />
          {entry.works.map((work, index) => (
            <Container key={work.id} label={t('modals.withdrawWorkEntry.workInput', { value: index + 1 })} disabled>
              <TextMedium value bold>
                {work.title}
              </TextMedium>
            </Container>
          ))}
          <Container disabled label={t('modals.withdrawWorkEntry.stakeInput')} inputSize="l">
            <TokenValue value={entry.stake} size="s" />
          </Container>
        </ScrolledModalContainer>
      </ScrolledModalBody>
      <ModalFooter>
        <TransactionInfoContainer>
          <TransactionInfo
            title={t('modals.common.transactionFee.label')}
            value={feeInfo.transactionFee}
            tooltipText={t('modals.common.transactionFee.tooltip')}
          />
        </TransactionInfoContainer>
        <ButtonPrimary size="medium" onClick={() => send('NEXT')}>
          {t('modals.withdrawWorkEntry.submitButton')}
        </ButtonPrimary>
      </ModalFooter>
    </Modal>
  )
}

const BodyContainer = styled(RowGapBlock)`
  label {
    color: ${Colors.Black[900]};
  }
`

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
