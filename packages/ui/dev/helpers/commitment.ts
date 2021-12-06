import chalk from 'chalk'
import yargs from 'yargs'

import { calculateCommitment } from '../../src/council/model/calculateCommitment'
import { ALICE } from '../node-mocks/data/addresses'

const options = {
  account: { type: 'string', alias: 'a', default: ALICE },
  option: { type: 'number', alias: 'o', default: 0 },
  salt: { type: 'string', alias: 's', demand: true },
  cycle: { type: 'number', alias: 'c', default: 0 },
} as const

type CommandOptions = yargs.InferredOptionTypes<typeof options>
type TransferArgs = yargs.Arguments<CommandOptions>
const handler = ({ account, option, salt, cycle }: TransferArgs) => {
  const commitment = calculateCommitment(account, String(option), salt, cycle)
  const inputJSON = JSON.stringify({ account, option, salt, cycle }, null, 2)
  process.stdout.write(`\n${inputJSON}\nCommitment: ${chalk.green(commitment)}\n\n`)
}

export const commitmentModule = {
  command: 'commitment',
  describe: 'Calculate a commitment',
  handler,
  builder: (argv: yargs.Argv<unknown>) => argv.options(options),
}
