import BN from 'bn.js'
import React, { useState } from 'react'

import { SelectAccount } from '../../../accounts/components/SelectAccount'
import { ButtonPrimary } from '../../../common/components/buttons'
import { InputComponent, InputNumber } from '../../../common/components/forms'
import { Modal, ModalFooter, ModalHeader, Row } from '../../../common/components/Modal'
import { Stepper } from '../../../common/components/Stepper'
import {
  StepDescriptionColumn,
  StepperBody,
  StepperModalBody,
  StepperModalWrapper,
} from '../../../common/components/StepperModal'
import { TextMedium, ValueInJoys } from '../../../common/components/typography'
import { useModal } from '../../../common/hooks/useModal'
import { useNumberInput } from '../../../common/hooks/useNumberInput'
import { formatTokenValue } from '../../../common/model/formatters'
import { OpeningFormPreview } from '../../components/OpeningFormPreview'

import { ApplyForRoleModalCall } from '.'

const steps = [{ title: 'Stake' }, { title: 'Form' }, { title: 'Submit application' }]

export const ApplyForRoleModal = () => {
  const {
    hideModal,
    modalData: { opening },
  } = useModal<ApplyForRoleModalCall>()
  const [step] = useState(0)
  const [amount, setAmount] = useNumberInput(0)

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
            <Row>
              <h4>1. Select and account</h4>
              <TextMedium>First please select an account for staking</TextMedium>
              <InputComponent label="Select an Account for Staking" required>
                <SelectAccount onChange={(a) => console.log(a)} />
              </InputComponent>
            </Row>

            <Row>
              <h4>2. Stake</h4>
              <TextMedium>
                You must stake at least <ValueInJoys>{formatTokenValue(100_000)}</ValueInJoys> to apply for this role.
                This stake will be returned to you when the hiring process is complete, whether or not you are hired,
                and will also be used to rank applications.
              </TextMedium>
              <InputComponent required id="amount-input" inputWidth="s" units="JOY">
                <InputNumber
                  id="amount-input"
                  value={formatTokenValue(new BN(amount))}
                  placeholder="0"
                  onChange={(event) => setAmount(event.target.value)}
                />
              </InputComponent>
            </Row>
          </StepperBody>
        </StepperModalWrapper>
      </StepperModalBody>
      <ModalFooter>
        <ButtonPrimary>Next step</ButtonPrimary>
      </ModalFooter>
    </Modal>
  )
}
