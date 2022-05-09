import { mapP } from '../../../../src/common/utils'
import { signAndSend, withApi } from '../../lib/api'

import { votes } from './vote'

const revealVotes = () =>
  withApi(async (api) => {
    await mapP(votes(api), ({ accountId, optionsId, salt }) =>
      signAndSend(api.tx.referendum.revealVote(salt, optionsId), accountId)
    )
  })

export const revealVotesModule = {
  command: 'council:reveal',
  describe: 'Reveal votes',
  handler: revealVotes,
}
