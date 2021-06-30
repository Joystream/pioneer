import yargs from 'yargs'

import { addMembersCommand } from './commands/addMemberAccounts'
import { AddMembersCommandArgs, addStakingAccountCommand, options } from './commands/addStakingAccount'

yargs(process.argv.slice(2))
  .scriptName('mocks')
  .command({
    command: 'add-staking-account',
    describe: 'Add & confirm staking account',
    handler: (args: yargs.Arguments<AddMembersCommandArgs>) => addStakingAccountCommand(args),
    builder: (argv) => argv.options(options),
  })
  .command({
    command: 'create-members',
    describe: 'Create member accounts from mocks',
    handler: addMembersCommand,
  })
  .demandCommand().argv
