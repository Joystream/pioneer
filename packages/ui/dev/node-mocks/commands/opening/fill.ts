import { registry } from '@joystream/types'
import { ApplicationId } from '@joystream/types/working-group'
import { BTreeSet } from '@polkadot/types'
import yargs from 'yargs'

import { GroupIdName } from '../../../../src/working-groups/types'
import { getSudoAccount } from '../../data/addresses'
import { signAndSend, withApi } from '../../lib/api'

const GROUP = 'membershipWorkingGroup' // TODO pass as a parameter

const options = {
  applicationId: {
    type: 'string',
    default: '0',
    alias: 'a',
  },
  openingId: {
    type: 'string',
    default: '0',
    alias: 'o',
  },
} as const

type CommandOptions = yargs.InferredOptionTypes<typeof options>
type FillOpeningArgs = { group?: GroupIdName } & (
  | yargs.Arguments<CommandOptions>
  | { applicationId: string; openingId: string }
)

export const fillOpeningCommand = async ({ applicationId, openingId, group = GROUP }: FillOpeningArgs) => {
  await withApi(async (api) => {
    const applicationsSet = new (BTreeSet.with(ApplicationId))(registry, [String(applicationId)])
    const fillOpening = api.tx[group].fillOpening(String(openingId), applicationsSet)

    await signAndSend(api.tx.sudo.sudo(fillOpening), getSudoAccount())
  })
}

export const fillOpeningModule = {
  command: 'opening:fill',
  describe: 'Apply on opening',
  handler: fillOpeningCommand,
  builder: (argv: yargs.Argv<unknown>) => argv.options(options),
}
