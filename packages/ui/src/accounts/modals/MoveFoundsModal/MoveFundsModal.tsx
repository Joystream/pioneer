import BN from 'bn.js'
import React from 'react'

import { useMyBalances } from '@/accounts/hooks/useMyBalances'
import { useStakingAccountsLocks } from '@/accounts/hooks/useStakingAccountsLocks'
import { LockType, WorkerLocks, WorkerLockType } from '@/accounts/types'
import { Info } from '@/common/components/Info'
import { Modal, ModalHeader, ModalFooter } from '@/common/components/Modal'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { TextMedium, TokenValue } from '@/common/components/typography'
import { BN_ZERO } from '@/common/constants'
import { useModal } from '@/common/hooks/useModal'

import { MoveFundsModalCall } from '.'
import { MoveFundsModalButtons } from './MoveFundsModalButtons'
import { MoveFundsModalInfo } from './MoveFundsModalInfo'
import { ModalBody, StyledOptionListAccount } from './styles'

const actionNameMapper = (lock?: LockType) => {
  switch (lock) {
    case 'Council Candidate':
      return 'announcing you candidacy'
    case 'Proposals':
      return 'creating this proposal'
    case 'Voting':
      return 'voting'
    case 'Bounties':
      return 'announcing work entry'
    default:
      return WorkerLocks.includes(lock as WorkerLockType) ? 'applying to this role' : 'this action'
  }
}

export const MoveFundsModal = () => {
  const {
    hideModal,
    modalData: { requiredStake, lock },
  } = useModal<MoveFundsModalCall>()

  const balances = useMyBalances()

  const accounts = useStakingAccountsLocks({ requiredStake, lockType: lock, filterByBalance: false })
  const accountsWithTransferableBalance = Object.entries(balances).filter(([, balances]) =>
    balances.transferable.gt(BN_ZERO)
  )
  const transferableTotal = accountsWithTransferableBalance.reduce(
    (sum, [, { transferable }]) => sum.add(transferable),
    BN_ZERO
  )
  const insufficientBalances = transferableTotal.lt(requiredStake)

  const freeAccounts = accounts.filter((account) => (account.optionLocks ? account.optionLocks.length === 0 : true))
  const noFreeAccounts = freeAccounts.length === 0

  return (
    <Modal modalSize="m" modalHeight="s" onClose={hideModal}>
      <ModalHeader onClick={hideModal} title="Your accounts" />
      <ModalBody>
        <RowGapBlock gap={32}>
          <TextMedium>
            Unfortunately, you don’t have any accounts suitable for {actionNameMapper(lock)}. You need at least{' '}
            <TokenValue value={requiredStake} /> on the balances free from{' '}
            <a href="https://joystream.gitbook.io/joystream-handbook/key-concepts/staking#locks-1">rivalrous locks.</a>
          </TextMedium>
          <RowGapBlock gap={4}>
            <TextMedium bold>Accounts with transferable balances:</TextMedium>
            <RowGapBlock gap={16}>
              <StyledOptionListAccount options={accounts} onChange={() => null} />
              <Info title="Suggestion">
                <MoveFundsModalInfo insufficientBalances={insufficientBalances} noFreeAccounts={noFreeAccounts} />
              </Info>
            </RowGapBlock>
          </RowGapBlock>
        </RowGapBlock>
      </ModalBody>
      <ModalFooter>
        <MoveFundsModalButtons insufficientBalances={insufficientBalances} noFreeAccounts={noFreeAccounts} />
      </ModalFooter>
    </Modal>
  )
}
