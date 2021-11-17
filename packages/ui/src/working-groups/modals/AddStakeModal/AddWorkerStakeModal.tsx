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
import { AddWorkerStakeSignModal } from '@/working-groups/modals/AddStakeModal/AddWorkerStakeSignModal'
import { addStakeMachine } from '@/working-groups/modals/AddStakeModal/machine'
import { SuccessModal } from '@/working-groups/modals/AddStakeModal/SuccessModal'
import { AddWorkerStakeModalCall } from '@/working-groups/modals/AddStakeModal/types'
import { getGroup } from '@/working-groups/model/getGroup'

export interface IncreaseStakeFormFields {
  amount?: string
}

const StakeFormSchema = Yup.object().shape({
  amount: Yup.number().required(),
})

export const AddWorkerStakeModal = () => {
  const { api } = useApi()
  const { hideModal, modalData } = useModal<AddWorkerStakeModalCall>()
  const [state, send] = useMachine(addStakeMachine)
  const { minStake, stake, group, runtimeId, roleAccount } = modalData.worker
  const minAddStake = minStake - stake
  const [amount, setAmount] = useNumberInput(0, minAddStake)
  const balance = useBalance(roleAccount)

  const schema = useMemo(() => {
    StakeFormSchema.fields.amount = StakeFormSchema.fields.amount.min(minAddStake, 'You need at least ${min} stake')
    if (balance?.transferable) {
      StakeFormSchema.fields.amount = StakeFormSchema.fields.amount.max(
        balance?.transferable.toNumber(),
        'Given amount exceed your transferable balance of ${max} JOY'
      )
    }
    return StakeFormSchema
  }, [minAddStake.toString(), balance?.transferable.toString()])

  const { changeField, validation, fields } = useForm<IncreaseStakeFormFields>({ amount: undefined }, schema)
  const { isValid, errors } = validation

  useEffect(() => {
    changeField('amount', amount)
  }, [amount])

  const onSubmit = () => {
    send({ type: 'DONE', form: fields })
  }

  if (state.matches('transaction')) {
    const workerGroup = api && getGroup(api, group.id)
    const transaction = workerGroup?.increaseStake(runtimeId, new BN(state.context.form.amount || 0))
    return (
      <AddWorkerStakeSignModal
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
            Add Stake
          </ButtonPrimary>
        </ButtonsGroup>
      </ModalFooter>
    </Modal>
  )
}
