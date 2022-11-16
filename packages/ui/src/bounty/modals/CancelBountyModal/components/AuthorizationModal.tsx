import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ActorRef } from 'xstate'

import { SelectAccount } from '@/accounts/components/SelectAccount'
import { useMyAccounts } from '@/accounts/hooks/useMyAccounts'
import { useMyBalances } from '@/accounts/hooks/useMyBalances'
import { Account } from '@/accounts/types'
import { useApi } from '@/api/hooks/useApi'
import { InputComponent } from '@/common/components/forms'
import { Modal, ModalBody, ModalHeader, ModalTransactionFooter } from '@/common/components/Modal'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { TextMedium } from '@/common/components/typography'
import { BN_ZERO } from '@/common/constants'
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
  const [hasFunds, setHasFunds] = useState<boolean>(false)
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
      Object.entries(balances ?? []).flatMap(([address, balance]) =>
        balance.transferable.gte(paymentInfo?.partialFee || BN_ZERO) ? address : []
      ),
    [balances, paymentInfo?.partialFee]
  )

  const accountsFilter = useCallback(
    ({ address }: Account) => accountsWithValidAmount.includes(address),
    [accountsWithValidAmount.length]
  )

  useEffect(() => {
    if (selectedAccount && paymentInfo?.partialFee) {
      setHasFunds(!!balances?.[selectedAccount.address]?.transferable.gte(paymentInfo.partialFee))
    }
  }, [balances, selectedAccount, paymentInfo?.partialFee])

  return (
    <Modal onClose={onClose} modalSize="l">
      <ModalHeader title={t('modals.bountyCancel.authorization.title')} onClick={onClose} />
      <ModalBody>
        <RowGapBlock gap={20}>
          <div>
            <TextMedium light>{t('modals.bountyCancel.authorization.informationBox.info1')}</TextMedium>
            <TextMedium light>
              {t('modals.bountyCancel.authorization.informationBox.info2', {
                fee: paymentInfo?.partialFee.toString() ?? '-',
              })}
            </TextMedium>
          </div>
          <InputComponent
            label={t('modals.bountyCancel.authorization.accountInput.label')}
            required
            inputSize="l"
            tooltipText={t('modals.bountyCancel.authorization.accountInput.tooltipText')}
          >
            <SelectAccount
              filter={accountsFilter}
              onChange={(account) => setSelectedAccount(account)}
              selected={selectedAccount}
            />
          </InputComponent>
        </RowGapBlock>
      </ModalBody>
      <ModalTransactionFooter
        transactionFee={paymentInfo?.partialFee}
        next={{ disabled: !hasFunds || !isReady, label: t('common:authorizeTransaction'), onClick: sign }}
      />
    </Modal>
  )
}
