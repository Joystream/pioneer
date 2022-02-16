import React from 'react'

import { AddressToBalanceMap, LockType } from '@/accounts/types'
import { ButtonPrimary } from '@/common/components/buttons'
import { Info } from '@/common/components/Info'
import { Modal, ModalFooter, ModalHeader } from '@/common/components/Modal'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { TextMedium, TokenValue } from '@/common/components/typography'
import { Address } from '@/common/types'

import { MemberRowsList } from './MemberRowsList'
import { ModalBody } from './styles'

export interface MoveFoundsTransferableModalProps {
  onClose: () => void
  onManageAccountsClick: () => void
  requiredStake: number
  balances: AddressToBalanceMap
  accounts?: Address[]
  lock?: LockType
}

export const MoveFundsTransferableModal = ({
  onClose,
  onManageAccountsClick,
  requiredStake,
  accounts,
  balances,
  lock,
}: MoveFoundsTransferableModalProps) => {
  if (!accounts || !accounts.length) {
    return null
  }

  return (
    <Modal modalSize="m" modalHeight="s" onClose={onClose}>
      <ModalHeader onClick={onClose} title="Move funds" />
      <ModalBody>
        <RowGapBlock gap={32}>
          <TextMedium margin="l">
            Unfortunately, you don’t have any accounts suitable for applying to this role. In order to create this
            proposal or apply for this role you need at least
            <TokenValue value={requiredStake} /> on the balances free from{' '}
            <a href="https://joystream.gitbook.io/joystream-handbook/key-concepts/staking#locks-1">rivalrous locks.</a>
          </TextMedium>
          <RowGapBlock gap={4}>
            <TextMedium bold>Accounts with transferable balances:</TextMedium>
            <RowGapBlock gap={16}>
              <MemberRowsList balances={balances} accounts={accounts} lock={lock} />
              <Info title="Info">
                <TextMedium light>Transfer the balances to lock-free accounts in My profile</TextMedium>
              </Info>
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
