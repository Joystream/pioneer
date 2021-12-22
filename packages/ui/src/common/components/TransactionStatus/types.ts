export type TransactionState = 'loading' | 'pending' | 'successful' | 'failure'
export type StepState = 'past' | 'active' | undefined
export type StepNumber = 1 | 2 | 3 | 4

export interface TransactionStatusStepProps {
  stepState: StepState
}

export interface TransactionStatusSteperProps {
  stepNumber: StepNumber
  state: TransactionState
}

export interface TransactionStatusStateProps {
  state: TransactionState
}
