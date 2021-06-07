import React from 'react'

import { AccountInfo } from '@/accounts/components/AccountInfo'
import { Account, AddressToBalanceMap } from '@/accounts/types'
import { ButtonPrimary } from '@/common/components/buttons'
import { Info } from '@/common/components/Info'
import { BalanceInfoInRow, InfoTitle, InfoValue, Modal, ModalFooter, ModalHeader } from '@/common/components/Modal'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { TextMedium, TokenValue } from '@/common/components/typography'

import { MemberRow, ModalBody } from './styles'

export interface MoveFoundsTransferableModalProps {
  onClose: () => void
  onManageAccountsClick: () => void
  requiredStake: number
  balances: AddressToBalanceMap
  accounts?: Account[]
}

export const MoveFoundsTransferableModal = ({
  onClose,
  onManageAccountsClick,
  requiredStake,
  accounts,
  balances,
}: MoveFoundsTransferableModalProps) => {
  if (!accounts || !accounts.length) {
    return null
  }

  return (
    <Modal modalSize="m" modalHeight="s" onClose={onClose}>
      <ModalHeader onClick={onClose} title="Move founds" />
      <ModalBody>
        <RowGapBlock gap={32}>
          <TextMedium light>
            Unfortunately, you don’t have any accounts suitable for applying to this role. You need at least{' '}
            <TokenValue value={requiredStake} /> to apply for this role. Please move your funds.
          </TextMedium>
          <RowGapBlock gap={4}>
            <TextMedium bold>Accounts with transferable balances:</TextMedium>
            <RowGapBlock gap={16}>
              <div>
                {accounts.map((account) => (
                  <MemberRow key={account.address}>
                    <AccountInfo account={account} />
                    <BalanceInfoInRow>
                      <InfoTitle>Transferable balance</InfoTitle>
                      <InfoValue>
                        <TokenValue value={balances[account.address] && balances[account.address].transferable} />
                      </InfoValue>
                    </BalanceInfoInRow>
                  </MemberRow>
                ))}
              </div>
              <Info
                title="Info"
                content={
                  <TextMedium light>
                    You can combine balances in one of your account or transfer tokens into new account.
                  </TextMedium>
                }
              />
            </RowGapBlock>
          </RowGapBlock>
        </RowGapBlock>
      </ModalBody>
      <ModalFooter>
        <ButtonPrimary size="medium" onClick={onManageAccountsClick}>
          Manage your accounts
        </ButtonPrimary>
      </ModalFooter>
    </Modal>
  )
}
