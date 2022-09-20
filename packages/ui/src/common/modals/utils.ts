import { Step } from '@/common/model/machines/getSteps'

export const isLastStepActive = (steps: Step[]) => {
  return steps[steps.length - 1].type === 'active' || steps[steps.length - 1].type === 'past'
}

interface TransactionModalFinalStatusesFactory {
  metaMessages?: {
    success?: string
    error?: string
  }
  cancel?: {
    target: string
    action: string
  }
}

export const transactionModalFinalStatusesFactory = (props?: TransactionModalFinalStatusesFactory) => {
  return {
    success: { type: 'final', meta: { message: props?.metaMessages?.success } },
    error: { type: 'final', meta: { message: props?.metaMessages?.error } },
    canceled: {
      ...(props?.cancel
        ? {
            on: {
              [props.cancel.action]: props.cancel.target,
            },
            meta: {
              backTarget: props.cancel.action,
            },
          }
        : {
            type: 'final' as const,
          }),
    },
  } as const
}
