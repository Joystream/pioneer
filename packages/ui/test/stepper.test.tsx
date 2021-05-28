import { fireEvent, render, screen } from '@testing-library/react'
import React, { useEffect, useReducer, useState } from 'react'

import { ButtonPrimary } from '@/common/components/buttons'
import { Arrow } from '@/common/components/icons'
import { Modal, ModalFooter } from '@/common/components/Modal'
import { Stepper } from '@/common/components/Stepper'
import { StepperBody, StepperModalWrapper } from '@/common/components/StepperModal'

const isStepValid = [false, false]

const TestModal = () => {
  const steps = [{ title: 'Step 1' }, { title: 'Step 2' }]
  const [validSteps, dispatchValidStep] = useReducer(
    (previousState: boolean[], action: { step: number; valid: boolean }) => {
      return previousState.splice(action.step, 1, action.valid)
    },
    [false, false]
  )
  const [active, setActiveStep] = useState(0)

  const onClose = () => undefined
  const onClick = () => setActiveStep((previousActive) => previousActive + 1)

  return (
    <Modal onClose={onClose} modalSize="m">
      <StepperModalWrapper>
        <Stepper steps={steps} active={active} />
        <StepperBody>
          {active === 0 && (
            <TestStep
              title="First step body"
              step={0}
              onValidChange={(valid) => dispatchValidStep({ step: 0, valid })}
            />
          )}
          {active === 1 && (
            <TestStep
              title="Second step body"
              step={1}
              onValidChange={(valid) => dispatchValidStep({ step: 0, valid })}
            />
          )}
        </StepperBody>
      </StepperModalWrapper>
      <ModalFooter>
        <ButtonPrimary onClick={onClick} size="medium" disabled={!validSteps[active]}>
          Next step
          <Arrow direction="right" />
        </ButtonPrimary>
      </ModalFooter>
    </Modal>
  )
}

describe('Stepper', () => {
  it('First step', () => {
    renderModal()

    expect(screen.getByText('Step 1')).toBeDefined()
    expect(screen.getByText('First step body')).toBeDefined()
  })

  it('Second step', () => {
    isStepValid[0] = true
    renderModal()
    fireEvent.click(screen.getByRole('button', { name: 'Next step' }))
    expect(screen.getByText('Second step body')).toBeDefined()
  })

  it('Cannot access second step when first is invalid', () => {
    isStepValid[0] = false
    renderModal()
    expect(screen.getByRole('button', { name: 'Next step' })).toBeDisabled()
  })

  function renderModal() {
    return render(<TestModal />)
  }
})

const TestStep = ({
  title,
  step,
  onValidChange,
}: {
  title: string
  step: number
  onValidChange: (isValid: boolean) => void
}) => {
  useEffect(() => {
    onValidChange(isStepValid[step])
  }, [])

  return <div>{title}</div>
}
