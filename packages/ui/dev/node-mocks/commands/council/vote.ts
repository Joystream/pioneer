import { mapP } from '../../../../src/common/utils'
import { calculateCommitment } from '../../../../src/council/model/calculateCommitment'
import memberData from '../../../../src/mocks/data/raw/members.json'
import { accountsMap } from '../../data/addresses'
import { signAndSend, withApi } from '../../lib/api'

const SALT = '0x0000000000000000000000000000000000000000000000000000000000000001'
export const votes = ([
  { by: 'alice', voteFor: 'alice' },
  { by: 'bob', voteFor: 'bob' },
  { by: 'charlie', voteFor: 'charlie' },
] as const).map(({ by, voteFor }) => ({
  accountId: accountsMap[by],
  optionsId: memberData.find(({ handle }) => handle === voteFor)?.id as string,
  salt: SALT,
}))

const castVotes = () =>
  withApi(async (api) => {
    const stage = await api.query.referendum.stage()
    const cycleId = stage.asVoting.current_cycle_id.toNumber()
    await mapP(votes, async ({ accountId, optionsId, salt }) => {
      const commitment = calculateCommitment(accountId, optionsId, salt, cycleId)
      await signAndSend(api.tx.referendum.vote(commitment, 10_000), accountId)
    })
  })

export const castVotesModule = {
  command: 'council:vote',
  describe: 'Votes for candidates',
  handler: castVotes,
}
