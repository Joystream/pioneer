export interface TransactionStep {
  title: string
}

export interface MultiTransactionConfig {
  steps: TransactionStep[]
  active: number
}
