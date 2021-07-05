/* eslint-disable no-console */
import { ApplicationMetadata } from '@joystream/metadata-protobuf'
import yargs from 'yargs'

import { metadataToBytes } from '../../../src/common/model/JoystreamNode'
import { getAccount } from '../data/addresses'
import { signAndSend, withApi } from '../lib/api'
import { controllerAccountOption, memberIdOption, stakingAccountOption } from '../lib/options'

const options = {
  c: controllerAccountOption,
  s: stakingAccountOption,
  m: memberIdOption,
  o: {
    type: 'string',
    default: '0',
    alias: 'openingId',
  } as const,
}

type CommandOptions = yargs.InferredOptionTypes<typeof options>
export type ApplyOnOpeningArgs = yargs.Arguments<CommandOptions>

const opening = async (args: ApplyOnOpeningArgs) => {
  await withApi(async (api) => {
    const tx = api.tx.membershipWorkingGroup.applyOnOpening({
      opening_id: 0,
      member_id: 0,
      role_account_id: getAccount(args.c),
      reward_account_id: getAccount(args.s),
      description: metadataToBytes(ApplicationMetadata, { answers: ['foo', 'ab'] }),
      stake_parameters: {
        stake: '10000',
        staking_account_id: getAccount(args.s),
      },
    })
    await signAndSend(tx, getAccount(args.c))
  })
}

export const applyOnOpeningModule = {
  command: 'opening:apply',
  describe: 'Apply on opening',
  handler: opening,
  builder: (argv: yargs.Argv<unknown>) => argv.options(options),
}
