import { Step } from '@/common/model/machines/getSteps'

export const isLastStepActive = (steps: Step[]) => {
  return steps[steps.length - 1].type === 'active' || steps[steps.length - 1].type === 'past'
}
