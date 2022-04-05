import BN from 'bn.js'

export const getMessage = (fee?: BN) => {
  return `Insufficient funds to cover the thread creation. You need at least ${fee?.toString()} tJOY on your account for this action.`
}
