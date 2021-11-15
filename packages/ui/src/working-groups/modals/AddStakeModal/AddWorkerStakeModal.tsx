import BN from 'bn.js'
import React, { useEffect, useMemo } from 'react'
import * as Yup from 'yup'

import { ButtonPrimary, ButtonsGroup } from '@/common/components/buttons'
import { InputComponent, InputNumber } from '@/common/components/forms'
import { getErrorMessage, hasError } from '@/common/components/forms/FieldError'
import { Modal, ModalBody, ModalFooter, ModalHeader } from '@/common/components/Modal'
import { useForm } from '@/common/hooks/useForm'
import { useModal } from '@/common/hooks/useModal'
import { useNumberInput } from '@/common/hooks/useNumberInput'
import { formatTokenValue } from '@/common/model/formatters'
import { AddWorkerStakeModalCall } from '@/working-groups/modals/AddStakeModal/types'
import { StakeStepFormFields } from '@/working-groups/modals/ApplyForRoleModal/StakeStep'

const StakeFormSchema = Yup.object().shape({
  amount: Yup.number().required(),
})

export const AddWorkerStakeModal = () => {
  // todo: add mahcine to handle sign/pending/success/error on transaction
  const { hideModal, modalData } = useModal<AddWorkerStakeModalCall>()
  const minStake = modalData.worker?.minStake - modalData?.worker.stake
  const [amount, setAmount] = useNumberInput(0, minStake)

  const schema = useMemo(() => {
    StakeFormSchema.fields.amount = StakeFormSchema.fields.amount.min(minStake, 'You need at least ${min} stake')
    return StakeFormSchema
  }, [minStake.toString()])

  const { changeField, validation, fields } = useForm<StakeStepFormFields>({ amount: undefined }, schema)
  const { isValid, errors } = validation

  useEffect(() => {
    changeField('amount', amount)
  }, [amount])

  const onSubmit = () => {
    console.log(fields, ' fields')
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
