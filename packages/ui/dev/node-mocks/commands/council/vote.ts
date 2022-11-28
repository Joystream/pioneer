import { ApiPromise } from '@polkadot/api'

import { mapP } from '../../../../src/common/utils'
import { calculateCommitment } from '../../../../src/council/model/calculateCommitment'
import memberData from '../../../../src/mocks/data/raw/members.json'
import { signAndSend, withApi } from '../../lib/api'

const SALT = '0x0000000000000000000000000000000000000000000000000000000000000001'

export const castVotesCommand = async (api: ApiPromise) => {
  const stage = await api.query.referendum.stage()
  const cycleId = stage.asVoting.currentCycleId.toNumber()
  const votingStake = api.consts.referendum.minimumStake

  await mapP(votes(api), async ({ accountId, optionsId, salt }) => {
    const commitment = calculateCommitment(accountId, optionsId, salt, cycleId)
    await signAndSend(api.tx.referendum.vote(commitment, votingStake), accountId)
  })
}

export const votes = (api: ApiPromise) => {
  const councilSize = api.consts.council.councilSize.toNumber()
  return memberData
    .slice(0, councilSize)
    .map(({ id: optionsId, controllerAccount: accountId }) => ({ accountId, optionsId, salt: SALT }))
}

export const castVotesModule = {
  command: 'council:vote',
  describe: 'Votes for candidates',
  handler: () => withApi(castVotesCommand),
}
