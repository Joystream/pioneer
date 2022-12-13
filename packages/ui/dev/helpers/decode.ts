import { createType } from '@joystream/types'
import chalk from 'chalk'
import yargs from 'yargs'

const options = {
  type: { choices: ['text'], alias: 't', default: 'text' },
  value: { type: 'string', alias: 'b', demand: true },
} as const

type CommandOptions = yargs.InferredOptionTypes<typeof options>
type Args = yargs.Arguments<CommandOptions>

const decode = (type: Args['type'], value: string) => {
  switch (type) {
    case 'text':
      return createType('Text', value).toHuman()
  }
}
const handler = ({ type, value }: Args) => {
  process.stdout.write(chalk.green(decode(type, value)) + '\n')
}

export const decodeModule = {
  command: 'decode',
  describe: 'Decode chain data',
  handler,
  builder: (argv: yargs.Argv<unknown>) => argv.options(options),
}
