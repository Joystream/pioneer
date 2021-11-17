import { useMachine } from '@xstate/react'
import BN from 'bn.js'
import React, { useEffect, useMemo } from 'react'
import * as Yup from 'yup'

import { useBalance } from '@/accounts/hooks/useBalance'
import { ButtonPrimary, ButtonsGroup } from '@/common/components/buttons'
import { FailureModal } from '@/common/components/FailureModal'
import { InputComponent, InputNumber } from '@/common/components/forms'
import { getErrorMessage, hasError } from '@/common/components/forms/FieldError'
import { Modal, ModalBody, ModalFooter, ModalHeader } from '@/common/components/Modal'
import { useApi } from '@/common/hooks/useApi'
import { useForm } from '@/common/hooks/useForm'
import { useModal } from '@/common/hooks/useModal'
import { useNumberInput } from '@/common/hooks/useNumberInput'
import { formatTokenValue } from '@/common/model/formatters'
import { moveExcessMachine } from '@/working-groups/modals/MoveExcessTokensModal/machine'
import { MoveExcessTokensSignModal } from '@/working-groups/modals/MoveExcessTokensModal/MoveExcessTokensSignModal'
import { SuccessModal } from '@/working-groups/modals/MoveExcessTokensModal/SuccessModal'
import { MoveExcessTokensModalCall } from '@/working-groups/modals/MoveExcessTokensModal/types'

export interface MoveExcessFormFields {
  amount?: string
}

const MoveExcessFormSchema = Yup.object().shape({
  amount: Yup.number().required(),
})

export const MoveExcessTokensModal = () => {
  const { api } = useApi()
  const { hideModal, modalData } = useModal<MoveExcessTokensModalCall>()
  const [state, send] = useMachine(moveExcessMachine)
  const { minStake, stake, roleAccount, stakeAccount } = modalData.worker
  const stakeExcess = stake - minStake
  const [amount, setAmount] = useNumberInput(0, stakeExcess)
  const balance = useBalance(stakeAccount)

  const schema = useMemo(() => {
    if (balance?.transferable) {
      MoveExcessFormSchema.fields.amount = MoveExcessFormSchema.fields.amount.max(
        balance?.transferable.toNumber(),
        'Given amount exceed your transferable balance of ${max} JOY'
      )
    }
    return MoveExcessFormSchema
  }, [stakeExcess.toString(), balance?.transferable.toString()])

  const { changeField, validation, fields } = useForm<MoveExcessFormFields>({ amount: undefined }, schema)
  const { isValid, errors } = validation

  useEffect(() => {
    changeField('amount', amount)
  }, [amount])

  const onSubmit = () => {
    send({ type: 'DONE', form: fields })
  }

  if (state.matches('transaction')) {
    const transaction = api?.tx?.balances?.transfer(roleAccount, state.context.form.amount || 0)
    return (
      <MoveExcessTokensSignModal
        onClose={hideModal}
        service={state.children.transaction}
        amount={new BN(state.context.form.amount || 0)}
        transaction={transaction}
        worker={modalData.worker}
        workerBalance={balance?.transferable}
      />
    )
  }

  if (state.matches('success')) {
    return <SuccessModal onClose={hideModal} amount={state.context.form.amount || '0'} />
  }

  if (state.matches('error')) {
    return (
      <FailureModal onClose={hideModal} events={state.context.transactionEvents}>
        There was an problem with increasing the stake
      </FailureModal>
    )
  }

  return (
    <Modal onClose={hideModal} modalSize="m" modalHeight="s">
      <ModalHeader title="Add stake" onClick={hideModal} />
      <ModalBody>
        <InputComponent
          id="amount-input"
          label="Select amount for Staking"
          units="JOY"
          validation={amount && hasError('amount', errors) ? 'invalid' : undefined}
          message={amount && hasError('amount', errors) ? getErrorMessage('amount', errors) : undefined}
          required
        >
          <InputNumber
            id="amount-input"
            value={formatTokenValue(new BN(amount))}
            placeholder={modalData.worker?.minStake.toString()}
            onChange={(event) => setAmount(event.target.value)}
          />
        </InputComponent>
      </ModalBody>
      <ModalFooter>
        <ButtonsGroup align="right">
          <ButtonPrimary disabled={!isValid} size="medium" onClick={onSubmit}>
            Move Excess Tokens
          </ButtonPrimary>
        </ButtonsGroup>
      </ModalFooter>
    </Modal>
  )
}
