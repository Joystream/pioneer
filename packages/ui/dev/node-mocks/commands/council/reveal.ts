import { ApiPromise } from '@polkadot/api'

import { mapP } from '../../../../src/common/utils'
import { signAndSend, withApi } from '../../lib/api'

import { votes } from './vote'

export const revealVotesCommand = async (api: ApiPromise) => {
  await mapP(await votes(api), ({ accountId, optionsId, salt }) =>
    signAndSend(api.tx.referendum.revealVote(salt, optionsId), accountId)
  )
}

export const revealVotesModule = {
  command: 'council:reveal',
  describe: 'Reveal votes',
  handler: () => withApi(revealVotesCommand),
}
