import {
  isCandidateLockRecoverable,
  isVoteLockRecoverable,
  isWGLockRecoverable,
  useLockOrientedAddressInformation,
} from '@/accounts/hooks/useGroupLocks/helpers'
import { BalanceLock } from '@/accounts/types'

interface UseGroupLocks {
  recoverable: BalanceLock[]
  unRecoverable: BalanceLock[]
}

export const useGroupLocks = (address: string, locks: BalanceLock[]): UseGroupLocks => {
  const { unstakingPeriodEnd, latestElection, voteElection, application, vote } =
    useLockOrientedAddressInformation(address)

  return locks.reduce(
    (prev, lock) => {
      if (lock.type.endsWith('Worker')) {
        prev[isWGLockRecoverable(application, unstakingPeriodEnd) ? 'recoverable' : 'unRecoverable'].push(lock)
        return prev
      }

      if (lock.type === 'Council Candidate') {
        prev[isCandidateLockRecoverable(latestElection?.candidates, address) ? 'recoverable' : 'unRecoverable'].push(
          lock
        )
        return prev
      }

      if (lock.type === 'Voting') {
        prev[
          isVoteLockRecoverable(vote, latestElection?.cycleId === voteElection?.cycleId)
            ? 'recoverable'
            : 'unRecoverable'
        ].push(lock)
        return prev
      }

      prev.unRecoverable.push(lock)
      return prev
    },
    {
      recoverable: [],
      unRecoverable: [],
    } as UseGroupLocks
  )
}
