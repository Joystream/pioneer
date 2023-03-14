import { ApiPromise } from '@polkadot/api'

import { flatMapP, mapP } from '../../../../src/common/utils'
import { calculateCommitment } from '../../../../src/council/model/calculateCommitment'
import { signAndSend, withApi } from '../../lib/api'

const SALT = '0x0000000000000000000000000000000000000000000000000000000000000001'

export const castVotesCommand = async (api: ApiPromise) => {
  const stage = await api.query.referendum.stage()
  const cycleId = stage.asVoting.currentCycleId.toNumber()
  const votingStake = api.consts.referendum.minimumStake

  await mapP(await votes(api), async ({ accountId, optionsId, salt }) => {
    const commitment = calculateCommitment(accountId, optionsId, salt, cycleId)
    await signAndSend(api.tx.referendum.vote(commitment, votingStake), accountId)
  })
}

export const votes = async (api: ApiPromise) => {
  const entries = await api.query.council.candidates.entries()
  return await flatMapP(entries, async ([, value]) => {
    const accountId = (value.toJSON() as any)?.stakingAccountId
    if (!accountId) return []

    const { memberId } = await api.query.members.stakingAccountIdMemberStatus(accountId)
    return { accountId, optionsId: String(Number(memberId)), salt: SALT }
  })
}

export const castVotesModule = {
  command: 'council:vote',
  describe: 'Votes for candidates',
  handler: () => withApi(castVotesCommand),
}
