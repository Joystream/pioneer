import { access, readFile } from 'fs/promises'
import { isAbsolute, resolve } from 'path'

import { createType } from '@joystream/types'
import yargs from 'yargs'

import memberData from '../../../../src/mocks/data/raw/members.json'
import { signAndSend, withApi } from '../../lib/api'
import { createMembersCommand } from '../members/create'

const options = {
  upgrade: {
    type: 'string',
    alias: 'u',
    describe: 'Path to the runtime upgrade wasm file',
  },
} as const

type CommandOptions = yargs.InferredOptionTypes<typeof options>
export type Args = yargs.Arguments<CommandOptions>

const createProposal = (args: Args) => {
  withApi(async (api) => {
    const aliceMember = memberData[0]

    // Create accounts
    const nextId = await api.query.members.nextMemberId()
    if (Number(nextId) < 1) {
      await createMembersCommand()
    }

    // Create proposal
    const id = aliceMember.id
    const address = aliceMember.controllerAccount

    const commonParams = {
      member_id: id,
      title: `Lorem ${Object.keys(args)[0]}`,
      description: JSON.stringify(args, null, 2),
      staking_account_id: address,
    }
    const proposalDetails = await specificParams(args)

    const tx = api.tx.proposalsCodex.createProposal(commonParams, proposalDetails)
    await signAndSend(tx, address)
  })
}

const specificParams = async (args: Args) => {
  if (args.upgrade) {
    const file = await readFile(await filePath(args.upgrade))
    return createType('ProposalDetailsOf', {
      RuntimeUpgrade: [createType('Bytes', new Uint8Array(file))],
    })
  } else {
    throw Error('Unknown proposal type')
  }
}

const filePath = async (path: string) => {
  if (isAbsolute(path)) {
    return path
  }
  try {
    const fromPackageRoot = resolve(process.cwd(), path)
    await access(fromPackageRoot)
    return fromPackageRoot
  } catch (err) {
    const fromProjectRoot = resolve(process.cwd(), '../..', path)
    await access(fromProjectRoot)
    return fromProjectRoot
  }
}

export const createProposalModule = {
  command: 'proposal:create',
  describe: 'Create a proposal',
  handler: createProposal,
  builder: (argv: yargs.Argv<unknown>) => argv.options(options),
}
