import React, { useCallback, useState, FC } from 'react'

import { filterAccount, SelectAccount } from '@/accounts/components/SelectAccount'
import { Account } from '@/accounts/types'
import { ButtonPrimary } from '@/common/components/buttons'
import { InputComponent } from '@/common/components/forms'
import { Modal, ModalBody, ModalFooter, ModalHeader } from '@/common/components/Modal'

interface Props {
  account?: Account
  onClose: () => void
  onAccept: (selectedAccount: Account) => void
  title: string
  buttonLabel: string
}

export const ChangeAccountSelectModal: FC<Props> = ({ account, onClose, onAccept, title, buttonLabel }) => {
  const [selectedAccount, setSelectedAccount] = useState<Account | undefined>(account)
  const filterSelectedAccount = useCallback(filterAccount(selectedAccount), [selectedAccount])
  const onClick = () => {
    if (selectedAccount) {
      onAccept(selectedAccount)
    }
  }

  return (
    <Modal onClose={onClose} modalSize="m" modalHeight="s">
      <ModalHeader onClick={onClose} title={title} />
      <ModalBody>
        <InputComponent required inputSize="l" label="Select account" id="select-account-input">
          <SelectAccount filter={filterSelectedAccount} onChange={setSelectedAccount} selected={selectedAccount} />
        </InputComponent>
      </ModalBody>
      <ModalFooter>
        <ButtonPrimary size="medium" onClick={onClick} disabled={!selectedAccount}>
          {buttonLabel}
        </ButtonPrimary>
      </ModalFooter>
    </Modal>
  )
}
