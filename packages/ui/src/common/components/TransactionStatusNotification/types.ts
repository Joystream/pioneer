export type TransactionState = 'loading' | 'pending' | 'successful' | 'failure'
export type StepState = 'past' | 'active' | undefined

export interface TransactionStatusStepProps {
	stepState: StepState
}

export interface TransactionStatusSteperProps {
	steps: TransactionStatusStepProps[]
	state: TransactionState
}

export interface TransactionStatusStateProps {
  state: TransactionState
}