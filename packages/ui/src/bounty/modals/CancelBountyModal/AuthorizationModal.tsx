import React, { useCallback, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ActorRef } from 'xstate'

import { SelectAccount } from '@/accounts/components/SelectAccount'
import { useMyAccounts } from '@/accounts/hooks/useMyAccounts'
import { useMyBalances } from '@/accounts/hooks/useMyBalances'
import { Account } from '@/accounts/types'
import { ButtonPrimary } from '@/common/components/buttons'
import { InputComponent } from '@/common/components/forms'
import { Modal, ModalBody, ModalFooter, ModalHeader, TransactionInfoContainer } from '@/common/components/Modal'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { TransactionInfo } from '@/common/components/TransactionInfo'
import { TextMedium } from '@/common/components/typography'
import { BN_ZERO } from '@/common/constants'
import { useApi } from '@/common/hooks/useApi'
import { useSignAndSendTransaction } from '@/common/hooks/useSignAndSendTransaction'
import { Member } from '@/memberships/types'

interface Props {
  onClose: () => void
  creator: Member
  bountyId: string
  service: ActorRef<any>
}

export const AuthorizationModal = ({ onClose, creator, bountyId, service }: Props) => {
  const { t } = useTranslation('bounty')
  const { allAccounts } = useMyAccounts()
  const [selectedAccount, setSelectedAccount] = useState<Account | undefined>(
    allAccounts.find((acc) => acc.address === creator.controllerAccount)
  )
  const { api } = useApi()
  const balances = useMyBalances()

  const transaction = useMemo(() => {
    return api?.tx.bounty.cancelBounty({ Member: creator.id }, bountyId)
  }, [creator.id, bountyId])

  const { isReady, sign, paymentInfo } = useSignAndSendTransaction({
    service,
    transaction,
    signer: selectedAccount?.address || creator.controllerAccount,
  })

  const accountsWithValidAmount = useMemo(
    () =>
      Object.entries(balances).map(([address, balance]) => {
        if (balance.transferable.gte(paymentInfo?.partialFee || BN_ZERO)) {
          return address
        }
      }),
    [balances, paymentInfo?.partialFee]
  )

  const accountsFilter = useCallback((acc: Account) => accountsWithValidAmount.includes(acc.address), [
    accountsWithValidAmount.length,
  ])

  return (
    <Modal onClose={onClose} modalSize="l">
      <ModalHeader title={t('modals.bounty.cancel.authorization.title')} onClick={onClose} />
      <ModalBody>
        <RowGapBlock gap={20}>
          <div>
            <TextMedium light>{t('modals.bounty.cancel.authorization.informationBox.info1')}</TextMedium>
            <TextMedium light>
              {t('modals.bounty.cancel.authorization.informationBox.info1', { fee: paymentInfo?.partialFee || '-' })}
            </TextMedium>
          </div>
          <InputComponent
            label={t('modals.bounty.cancel.authorization.accountInput.label')}
            required
            inputSize="l"
            tooltipText={t('modals.bounty.cancel.authorization.accountInput.tooltipText')}
          >
            <SelectAccount
              filter={accountsFilter}
              onChange={(account) => setSelectedAccount(account)}
              selected={selectedAccount}
            />
          </InputComponent>
        </RowGapBlock>
      </ModalBody>
      <ModalFooter>
        <TransactionInfoContainer>
          <TransactionInfo
            title={t('common:modals.transactionFee.label')}
            value={paymentInfo?.partialFee}
            tooltipText={t('common:modals.transactionFee.tooltipText')}
          />
        </TransactionInfoContainer>
        <ButtonPrimary disabled={!selectedAccount || !isReady} onClick={sign} size="medium">
          {t('modals.bountyCancel.authorization.button')}
        </ButtonPrimary>
      </ModalFooter>
    </Modal>
  )
}
