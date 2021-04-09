import BN from 'bn.js'

export const getMessage = (fee?: BN) => {
  return `Insufficient funds to cover the membership creation. You need at least ${fee?.toString()} JOY on your account for this action.`
}
