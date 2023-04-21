import { SubmittableExtrinsic } from '@polkadot/api/types'

import { Api } from '@/api'

import { EmailSubscriptionForm } from './types'

export function createBatch(transactionParams: EmailSubscriptionForm, api: Api | undefined) {
  const transactions: SubmittableExtrinsic<'rxjs'>[] = []

  if (!api || !transactionParams.email) {
    return
  }

  if (transactionParams.email) {
    // const emailSubscription = api.tx.members.emailSubscription(transactionParams)
    // transactions.push(emailSubscription)
  }

  return api.tx.utility.batch(transactions)
}
