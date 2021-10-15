import { stringToU8a } from '@polkadot/util'
import { blake2AsHex, randomAsHex } from '@polkadot/util-crypto'
import { useEffect, useMemo, useState } from 'react'

import { useCandidate } from '@/council/hooks/useCandidate'

export const useCommitment = (accountId: string, candidateId: string) => {
  const { candidate } = useCandidate(candidateId)

  const vote = useMemo(() => {
    if (!candidate) return

    // See https://polkadot.js.org/docs/util-crypto/examples/encrypt-decrypt
    const salt = randomAsHex()

    const optionId = candidate.member.id
    const cycleId = String(candidate.cycleId)

    // See https://github.com/Joystream/joystream/blob/db3885858a7812377a19390968bdbf65221f0270/tests/integration-tests/src/fixtures/council/ElectCouncilFixture.ts#L62
    const payload = Buffer.concat([accountId, optionId, salt, cycleId].map(stringToU8a))

    return {
      cycleId,
      optionId,
      salt,
      commitment: blake2AsHex(payload),
    }
  }, [candidate])

  const [isSaltStored, setIsSaltStored] = useState(false)
  useEffect(() => {
    if (!vote) return

    const key = `votes:${vote.cycleId}`
    const value = JSON.stringify({ optionId: vote.optionId, salt: vote.salt })
    localStorage.setItem(key, value)

    setIsSaltStored(true)
  }, [vote])

  return { commitment: vote?.commitment, isSaltStored }
}
