import { useMachine } from '@xstate/react'
import React, { useMemo, useState } from 'react'

import { useTransactionFee } from '@/accounts/hooks/useTransactionFee'
import { useVesting } from '@/accounts/hooks/useVesting'
import { SelectVestingAccount } from '@/accounts/modals/ClaimVestingModal/components/SelectVestingAccount'
import { Account } from '@/accounts/types'
import { ButtonPrimary, ButtonsGroup } from '@/common/components/buttons'
import { InputComponent } from '@/common/components/forms'
import { Modal, ModalBody, ModalHeader, ModalTransactionFooter } from '@/common/components/Modal'
import { TextMedium, TokenValue } from '@/common/components/typography'
import { useApi } from '@/common/hooks/useApi'
import { useModal } from '@/common/hooks/useModal'
import { useSignAndSendTransaction } from '@/common/hooks/useSignAndSendTransaction'
import { transactionMachine } from '@/common/model/machines'

export const ClaimVestingModal = () => {
  const { hideModal } = useModal()
  const { api } = useApi()
  const [selectedAccount, setSelectedAccount] = useState<Account>()
  const vesting = useVesting(selectedAccount?.address)
  const [state, service] = useMachine(transactionMachine)

  useTransactionFee(selectedAccount?.address, () => api?.tx.vesting.vest())

  // useSignAndSendTransaction({
  //   transaction: api?.tx.vesting.vest(),
  //   signer: selectedAccount?.address ?? '',
  //   service,
  // })

  return (
    <Modal onClose={hideModal} modalSize="s" modalHeight="l">
      <ModalHeader title="Claim" onClick={hideModal} />
      <ModalBody>
        <TextMedium>
          {selectedAccount ? (
            <>
              You intend to claim <TokenValue value={vesting?.vestedClaimable} /> from your vesting lock.
            </>
          ) : (
            <>Select account from which you wish to claim vesting</>
          )}
        </TextMedium>
        <InputComponent inputSize="l">
          <SelectVestingAccount selected={selectedAccount} onChange={setSelectedAccount} />
        </InputComponent>
      </ModalBody>
      <ModalTransactionFooter next={{ onClick: () => undefined, label: 'Sign transaction and claim' }} />
    </Modal>
  )
}
