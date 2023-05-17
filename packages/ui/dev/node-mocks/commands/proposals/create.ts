/* eslint-disable no-console */
import { access, readFile } from 'fs/promises'
import { isAbsolute, resolve } from 'path'

import { ApiPromise } from '@polkadot/api'
import { PalletProposalsCodexProposalDetails } from '@polkadot/types/lookup'
import { mnemonicGenerate } from '@polkadot/util-crypto'
import yargs from 'yargs'

import { createType } from '@/common/model/createType'
import { getDataFromEvent } from '@/common/model/JoystreamNode'
import memberData from '@/mocks/data/raw/members.json'
import { proposalConstants } from '@/proposals/hooks/useProposalConstants'
import { typenameToProposalDetails } from '@/proposals/model/proposalDetails'

import { keyring, signAndSend, withApi } from '../../lib/api'
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

export const createProposal = async (api: ApiPromise, proposalDetails: PalletProposalsCodexProposalDetails) => {
  const { id: memberId, controllerAccount } = memberData[0]

  const proposalType = typenameToProposalDetails(proposalDetails.type)
  const requiredStake = proposalConstants(api, proposalType)?.requiredStake
  if (!requiredStake) throw `Not supported proposal ${proposalDetails.type}`

  // 1. Create and fund the staking account
  const stakingSigner = keyring.createFromUri(mnemonicGenerate(), { name: 'proposal author' })
  const stackingAccount = stakingSigner.address
  const fundingTx = api.tx.balances.transfer(stackingAccount, requiredStake.muln(1.5))
  await signAndSend(fundingTx, controllerAccount)

  // 2. Bind the staking account to Alice
  await signAndSend(api.tx.members.addStakingAccountCandidate(memberId), stakingSigner)
  await signAndSend(api.tx.members.confirmStakingAccount(memberId, stackingAccount), controllerAccount)

  // 3. Create the proposal
  const commonParams = {
    memberId,
    title: `Lorem ${proposalDetails.type}`,
    description: JSON.stringify(proposalDetails.toJSON(), null, 2),
    stakingAccountId: stackingAccount,
  }
  const tx = api.tx.proposalsCodex.createProposal(commonParams, proposalDetails)
  const events = await signAndSend(tx, controllerAccount)

  const proposalId = Number(getDataFromEvent(events, 'proposalsCodex', 'ProposalCreated'))
  const proposalData = getDataFromEvent(events, 'proposalsCodex', 'ProposalCreated', 1)
  const threadId = Number(getDataFromEvent(events, 'proposalsDiscussion', 'ThreadCreated'))
  return [proposalId, threadId, proposalData] as const
}

const specificParams = async (args: Args) => {
  if (args.upgrade) {
    const file = await readFile(await filePath(args.upgrade))
    return createType('PalletProposalsCodexProposalDetails', {
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
  handler: async (args: Args) => {
    withApi(async (api) => {
      await createMembersCommand(api)
      const proposalDetails = await specificParams(args)
      const [proposalId, threadId, proposalData] = await createProposal(api, proposalDetails)
      console.log({ proposalId, ...(proposalData?.toJSON() ?? []), threadId })
    })
  },
  builder: (argv: yargs.Argv<unknown>) => argv.options(options),
}
