import React, { useMemo } from 'react'

import { useMyBalances } from '@/accounts/hooks/useMyBalances'
import { useStakingAccountsLocks } from '@/accounts/hooks/useStakingAccountsLocks'
import { LockType, WorkerLocks, WorkerLockType } from '@/accounts/types'
import { Info } from '@/common/components/Info'
import { Modal, ModalHeader, ModalFooter } from '@/common/components/Modal'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { TextMedium, TokenValue } from '@/common/components/typography'
import { BN_ZERO } from '@/common/constants'
import { useModal } from '@/common/hooks/useModal'
import { useMyMemberships } from '@/memberships/hooks/useMyMemberships'

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
    modalData: { requiredStake, lock, isFeeOriented },
  } = useModal<MoveFundsModalCall>()

  const { active } = useMyMemberships()
  const balances = useMyBalances()

  const allAccounts = useStakingAccountsLocks({ requiredStake, lockType: lock, filterByBalance: false })
  const addressesWithTransferableBalance = Object.entries(balances ?? []).filter(([, balances]) =>
    balances.transferable.gt(BN_ZERO)
  )
  const transferableTotal = addressesWithTransferableBalance.reduce(
    (sum, [, { transferable }]) => sum.add(transferable),
    BN_ZERO
  )
  const insufficientBalances = transferableTotal.lt(requiredStake)

  const freeAccounts = allAccounts.filter((account) => (account.optionLocks ? account.optionLocks.length === 0 : true))
  const noFreeAccounts = freeAccounts.length === 0

  const displayedAccounts = useMemo(() => {
    const memberAccounts = allAccounts.filter((account) => active?.boundAccounts.includes(account.address))

    if (isFeeOriented) {
      const transferableBalanceAddresses = addressesWithTransferableBalance.map(([address]) => address)
      return allAccounts.filter((account) => transferableBalanceAddresses.includes(account.address))
    }

    // When all accounts are locked, display only accounts per selected-member
    return noFreeAccounts ? memberAccounts : allAccounts
  }, [])
  return (
    <Modal modalSize="m" modalHeight="s" onClose={hideModal}>
      <ModalHeader onClick={hideModal} title="Your accounts" />
      <ModalBody>
        <RowGapBlock gap={32}>
          <TextMedium>
            {isFeeOriented ? (
              <>
                Unfortunately the account associated with the currently selected membership has insufficient balance to
                cover the minimal fee. You need at least
                <TokenValue value={requiredStake} /> transferable balance on this account.
              </>
            ) : (
              <>
                Unfortunately, you don’t have any accounts suitable for {actionNameMapper(lock)}. You need at least{' '}
                <TokenValue value={requiredStake} /> on the balances free from{' '}
                <a href="https://joystream.gitbook.io/joystream-handbook/key-concepts/staking#locks-1">
                  rivalrous locks.
                </a>
              </>
            )}
          </TextMedium>
          <RowGapBlock gap={4}>
            <TextMedium bold>Accounts with transferable balances:</TextMedium>
            <RowGapBlock gap={16}>
              <StyledOptionListAccount options={displayedAccounts} onChange={() => null} />
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
