import BN from 'bn.js'

import { useGetRewardsQuery } from '../queries'

export const useWorkerEarnings = (workerId: string) => {
  const { loading, data } = useGetRewardsQuery({ variables: { where: { worker: { id_eq: workerId } } } })
  const earnings = data?.rewardPaidEvents.reduce(
    (accumulator, event) => accumulator.add(new BN(event.amount)),
    new BN(0)
  )
  return {
    isLoading: loading,
    earnings,
  }
}
