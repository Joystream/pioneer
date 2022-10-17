import {
  useIsCandidateLockRecoverable,
  useIsVoteLockRecoverable,
  useIsWGLockRecoverable,
} from '@/accounts/hooks/useGroupLocks/helpers'
import { BalanceLock } from '@/accounts/types'

interface UseGroupLocks {
  recoverable: BalanceLock[]
  unRecoverable: BalanceLock[]
}

export const useGroupLocks = (address: string, locks: BalanceLock[]): UseGroupLocks => {
  const hasWGLock = locks.some(({ type }) => type.endsWith('Worker'))
  const hasCandidateLock = locks.some(({ type }) => type === 'Council Candidate')
  const hasVoteLock = locks.some(({ type }) => type === 'Voting')

  const isWGLockRecoverable = useIsWGLockRecoverable(hasWGLock, address)
  const isCandidateLockRecoverable = useIsCandidateLockRecoverable(hasCandidateLock, address)
  const isVoteLockRecoverable = useIsVoteLockRecoverable(hasVoteLock, address)

  return locks.reduce(
    (prev, lock) => {
      if (lock.type.endsWith('Worker')) {
        prev[isWGLockRecoverable ? 'recoverable' : 'unRecoverable'].push(lock)
        return prev
      }

      if (lock.type === 'Council Candidate') {
        prev[isCandidateLockRecoverable ? 'recoverable' : 'unRecoverable'].push(lock)
        return prev
      }

      if (lock.type === 'Voting') {
        prev[isVoteLockRecoverable ? 'recoverable' : 'unRecoverable'].push(lock)
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
