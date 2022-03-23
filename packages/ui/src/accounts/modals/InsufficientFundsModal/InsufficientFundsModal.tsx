import BN from 'bn.js'
import React, { ReactNode, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

import { AccountInfo } from '@/accounts/components/AccountInfo'
import { useBalance } from '@/accounts/hooks/useBalance'
import { useMyAccounts } from '@/accounts/hooks/useMyAccounts'
import { TransferModalCall } from '@/accounts/modals/TransferModal'
import { accountOrNamed } from '@/accounts/model/accountOrNamed'
import { ButtonPrimary } from '@/common/components/buttons'
import {
  BalanceInfoInRow,
  InfoTitle,
  InfoValue,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from '@/common/components/Modal'
import { TextMedium, TokenValue } from '@/common/components/typography'
import { useModal } from '@/common/hooks/useModal'

import { BorderRad, Colors, Sizes } from '../../../common/constants'

export interface InsufficientFundsModalProps {
  onClose: () => void
  address: string
  amount: BN
  children?: ReactNode
}

export function InsufficientFundsModal({ onClose, address, amount, children }: InsufficientFundsModalProps) {
  const { t } = useTranslation('accounts')
  const { showModal } = useModal()
  const { allAccounts } = useMyAccounts()
  const account = useMemo(() => accountOrNamed(allAccounts, address, 'Controller account'), [allAccounts])
  const { transferable } = useBalance(account.address) || {}

  return (
    <Modal modalSize="m" modalHeight="s" onClose={onClose}>
      <ModalHeader onClick={onClose} title={t('modals.insufficientFunds.title')} />
      <ModalBody>
        {children ?? (
          <TextMedium margin="s">
            {t('modals.insufficientFunds.feeInfo1')}
            <TokenValue value={amount} />
            {t('modals.insufficientFunds.feeInfo2')}
          </TextMedium>
        )}
        <MemberRow>
          <AccountInfo account={account} />
          <BalanceInfoInRow>
            <InfoTitle>{t('modals.insufficientFunds.transferable')}</InfoTitle>
            <InfoValue>
              <TokenValue value={transferable} />
            </InfoValue>
          </BalanceInfoInRow>
        </MemberRow>
      </ModalBody>
      <ModalFooter>
        <ButtonPrimary
          size="medium"
          onClick={() => showModal<TransferModalCall>({ modal: 'TransferTokens', data: { to: account } })}
        >
          {t('modals.insufficientFunds.addJoy')}
        </ButtonPrimary>
      </ModalFooter>
    </Modal>
  )
}

const MemberRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr;
  align-items: center;
  width: 100%;
  min-height: ${Sizes.accountHeight};
  max-height: ${Sizes.accountHeight};
  padding: 8px 72px 8px 14px;
  border: 1px solid ${Colors.Black[300]};
  border-radius: ${BorderRad.s};
  background-color: ${Colors.White};
`
