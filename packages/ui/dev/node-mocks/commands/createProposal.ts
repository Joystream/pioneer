/* eslint-disable no-console */
import BN from 'bn.js'
import yargs from 'yargs'

import { getAccount } from '../data/addresses'
import { signAndSend, withApi } from '../lib/api'
import { controllerAccountOption, memberIdOption, stakingAccountOption } from '../lib/options'

const options = {
  c: controllerAccountOption,
  s: stakingAccountOption,
  m: memberIdOption,
} as const

type CommandOptions = yargs.InferredOptionTypes<typeof options>
export type ProposalArgs = yargs.Arguments<CommandOptions>

const handler = async ({ c, s, m }: ProposalArgs) => {
  await withApi(async (api) => {
    console.log(c, getAccount(c), s, getAccount(s), m)
    const tx = api.tx.proposalsCodex.createProposal(
      {
        staking_account_id: getAccount(s),
        member_id: m,
        title: 'A proposal',
        description: 'This is a proposal',
      },
      {
        FundingRequest: [
          {
            account: getAccount(c),
            amount: new BN(1000),
          },
        ],
      }
    )

    await signAndSend(tx, getAccount(c))
  })
}

export const createProposalModule = {
  command: 'proposal:create',
  describe: 'Create Funding request proposal',
  handler,
  builder: (argv: yargs.Argv<unknown>) => argv.options(options),
}
