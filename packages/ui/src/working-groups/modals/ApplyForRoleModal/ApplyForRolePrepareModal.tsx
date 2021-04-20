import BN from 'bn.js'
import React, { useCallback, useMemo, useState } from 'react'
import * as Yup from 'yup'

import { SelectAccount } from '../../../accounts/components/SelectAccount'
import { Account } from '../../../accounts/types'
import { ButtonPrimary } from '../../../common/components/buttons'
import { InputComponent, InputNumber } from '../../../common/components/forms'
import { getErrorMessage, hasError } from '../../../common/components/forms/FieldError'
import { Modal, ModalFooter, ModalHeader, Row } from '../../../common/components/Modal'
import { Stepper } from '../../../common/components/Stepper'
import {
  StepDescriptionColumn,
  StepperBody,
  StepperModalBody,
  StepperModalWrapper,
} from '../../../common/components/StepperModal'
import { TextMedium, ValueInJoys } from '../../../common/components/typography'
import { useForm } from '../../../common/hooks/useForm'
import { useModal } from '../../../common/hooks/useModal'
import { useNumberInput } from '../../../common/hooks/useNumberInput'
import { formatTokenValue } from '../../../common/model/formatters'
import { AccountSchema } from '../../../memberships/model/validation'
import { OpeningFormPreview } from '../../components/OpeningFormPreview'

import { ApplyForRoleModalCall } from '.'

const steps = [{ title: 'Stake' }, { title: 'Form' }, { title: 'Submit application' }]

interface StakeStepForm {
  account?: Account
  amount?: string
}

const StakeStepFormSchema = Yup.object().shape({
  account: AccountSchema.required(),
  amount: Yup.number().required(),
})

interface Props {
  onSubmit: () => void
}

const MIN_STAKE = 100_000

export const ApplyForRolePrepareModal = ({ onSubmit }: Props) => {
  const {
    hideModal,
    modalData: { opening },
  } = useModal<ApplyForRoleModalCall>()
  const [step, setStep] = useState(0)
  const [amount, setAmount] = useNumberInput(0)

  const schema = useMemo(() => {
    StakeStepFormSchema.fields.amount = StakeStepFormSchema.fields.amount.min(
      MIN_STAKE,
      'You need at least ${min} stake'
    )
    return StakeStepFormSchema
  }, [MIN_STAKE])

  const { state, dispatch, isValid, errors, validate } = useForm<StakeStepForm>(schema, {
    account: undefined,
    amount: undefined,
  })

  useMemo(() => {
    dispatch({ type: 'amount', value: amount })
    validate(state, {})
  }, [JSON.stringify(state), amount])

  const changeField = (type: keyof StakeStepForm, value: string | Account) => {
    dispatch({ type, value })
  }

  const nextStep = useCallback(() => {
    if (step >= 1) {
      onSubmit()
    } else {
      setStep((step) => step + 1)
    }
  }, [step])

  return (
    <Modal onClose={hideModal} modalSize="l">
      <ModalHeader onClick={hideModal} title="Apply for role" />
      <StepperModalBody>
        <StepperModalWrapper>
          <Stepper steps={steps} active={step} />

          <StepDescriptionColumn>
            <OpeningFormPreview opening={opening} />
          </StepDescriptionColumn>

          <StepperBody>
            {step === 0 && (
              <>
                <Row>
                  <h4>Select an account</h4>
                  <TextMedium>First please select an account for staking.</TextMedium>
                  <InputComponent label="Select an account for Staking" required inputSize="l">
                    <SelectAccount onChange={(account) => changeField('account', account)} />
                  </InputComponent>
                </Row>

                <Row>
                  <h4>Stake</h4>
                  <TextMedium>
                    You must stake at least <ValueInJoys>{formatTokenValue(MIN_STAKE)}</ValueInJoys> to apply for this
                    role. This stake will be returned to you when the hiring process is complete, whether or not you are
                    hired, and will also be used to rank applications.
                  </TextMedium>
                  <InputComponent
                    id="amount-input"
                    label="Select amount for Staking"
                    inputWidth="s"
                    units="JOY"
                    validation={amount && hasError('amount', errors) ? 'invalid' : undefined}
                    message={amount && hasError('amount', errors) ? getErrorMessage('amount', errors) : undefined}
                    required
                  >
                    <InputNumber
                      id="amount-input"
                      value={formatTokenValue(new BN(amount))}
                      placeholder="0"
                      onChange={(event) => setAmount(event.target.value)}
                    />
                  </InputComponent>
                </Row>
              </>
            )}
            {step === 1 && (
              <>
                <Row>
                  <h4>Application</h4>
                </Row>
              </>
            )}
          </StepperBody>
        </StepperModalWrapper>
      </StepperModalBody>
      <ModalFooter>
        <ButtonPrimary disabled={!isValid} onClick={nextStep}>
          Next step
        </ButtonPrimary>
      </ModalFooter>
    </Modal>
  )
}
