import { ReactNode } from 'react'

import { Step } from '@/common/model/machines/getSteps'

export interface StepperStep extends Step {
  details?: ReactNode
}

export interface StepToRender extends StepperStep {
  number: null | number
  hideNumber?: boolean
  isPast: boolean
  isActive: boolean
}

export const asStepsToRender = (steps: StepperStep[]): StepToRender[] => {
  let stepCounter = 1

  return steps.map((step) => ({
    ...step,
    number: step.isBaby ? null : stepCounter++,
    hideNumber: step.type === 'hideNumber',
    isActive: step.type === 'active',
    isPast: step.type === 'past',
  }))
}
