export interface StakingTransactionModalCall {
  modal: 'StakingTransaction'
  data: {
    type: 'nominate' | 'stake' | 'bond' | 'unbond' | 'payout'
    validatorAddress: string
    amount?: string
  }
}
