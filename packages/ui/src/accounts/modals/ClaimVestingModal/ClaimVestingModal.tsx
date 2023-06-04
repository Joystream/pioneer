import React, { useEffect, useMemo, useState } from 'react'
import styled from 'styled-components'

import { ListHeader } from '@/accounts/components/Accounts'
import { useBalance } from '@/accounts/hooks/useBalance'
import { useMyAccounts } from '@/accounts/hooks/useMyAccounts'
import { useMyBalances } from '@/accounts/hooks/useMyBalances'
import { SelectVestingAccount } from '@/accounts/modals/ClaimVestingModal/components/SelectVestingAccount'
import { Account } from '@/accounts/types'
import { useApi } from '@/api/hooks/useApi'
import { FailureModal } from '@/common/components/FailureModal'
import { InputComponent } from '@/common/components/forms'
import { Modal, ModalBody, ModalHeader, ModalTransactionFooter } from '@/common/components/Modal'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { SuccessModal } from '@/common/components/SuccessModal'
import { TextMedium, TokenValue } from '@/common/components/typography'
import { useMachine } from '@/common/hooks/useMachine'
import { useModal } from '@/common/hooks/useModal'
import { useSignAndSendTransaction } from '@/common/hooks/useSignAndSendTransaction'
import { transactionMachine } from '@/common/model/machines'

export const ClaimVestingModal = () => {
  const { hideModal } = useModal()
  const { api } = useApi()
  const [selectedAccount, setSelectedAccount] = useState<Account>()
  const vesting = useBalance(selectedAccount?.address)
  const balances = useMyBalances()
  const { allAccounts } = useMyAccounts()
  const [state, , service] = useMachine(transactionMachine)

  useEffect(() => {
    if (balances) {
      Object.entries(balances).forEach(([key, value]) => {
        if (value.vesting.length) {
          setSelectedAccount(allAccounts.find((a) => a.address === key))
        }
      })
    }
  }, [!balances])

  const transaction = useMemo(() => api?.tx.vesting.vest(), [])

  const { isReady, sign, paymentInfo, canAfford } = useSignAndSendTransaction({
    transaction,
    signer: selectedAccount?.address ?? '',
    service: service as any,
  })

  if (state.matches('error')) {
    return (
      <FailureModal onClose={hideModal} events={state.context.events}>
        There was a problem with claiming vesting
      </FailureModal>
    )
  }

  if (state.matches('success')) {
    return <SuccessModal onClose={hideModal} text="You have successfully claimed vesting" />
  }

  if (state.matches('prepare')) {
    return (
      <Modal onClose={hideModal} modalSize="s" modalHeight="l">
        <ModalHeader title="Claim" onClick={hideModal} />
        <ModalBody>
          <RowGapBlock gap={20}>
            <TextMedium>
              {selectedAccount ? (
                <>
                  You intend to claim <TokenValue value={vesting?.vestedClaimable} /> from your vesting lock.
                </>
              ) : (
                <>Select account from which you wish to claim vesting</>
              )}
            </TextMedium>
            <RowGapBlock gap={5}>
              <ItemHeaders>
                <Header>Account</Header>
                <Header>Unlocking</Header>
                <Header>Total claimable</Header>
              </ItemHeaders>
              <InputComponent
                inputSize="l"
                validation={canAfford ? undefined : 'invalid'}
                message={isReady ? (canAfford ? '' : 'Insufficient balance to cover fee.') : ''}
              >
                <SelectVestingAccount selected={selectedAccount} onChange={setSelectedAccount} />
              </InputComponent>
            </RowGapBlock>
          </RowGapBlock>
        </ModalBody>
        <ModalTransactionFooter
          transactionFee={paymentInfo?.partialFee}
          next={{ onClick: () => sign(), label: 'Sign transaction and claim', disabled: !isReady || !canAfford }}
        />
      </Modal>
    )
  }

  return null
}

const ItemHeaders = styled.div`
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: repeat(3, 1fr);
  justify-content: space-between;
  width: 100%;
  padding-left: 16px;
  padding-right: 8px;
`

const Header = styled(ListHeader)`
  :nth-child(2) {
    text-align: center;
    justify-self: center;
  }

  :last-child {
    padding-right: 40px;
  }
`
