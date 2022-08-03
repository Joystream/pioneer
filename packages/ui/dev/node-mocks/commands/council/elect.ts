import { nextCouncilStageCommand } from '../../../helpers/nextCouncilStage'
import { withApi } from '../../lib/api'
import { createMembersCommand } from '../members/create'

import { announceCandidaciesCommand } from './announce'
import { revealVotesCommand } from './reveal'
import { castVotesCommand } from './vote'

export const electCouncilModule = {
  command: 'council:elect',
  describe: 'Elect a full council',
  handler: async () => {
    await createMembersCommand()
    await withApi(async (api) => {
      await announceCandidaciesCommand(api)
      await nextCouncilStageCommand(api)
      await castVotesCommand(api)
      await nextCouncilStageCommand(api)
      await revealVotesCommand(api)
    })
  },
}
