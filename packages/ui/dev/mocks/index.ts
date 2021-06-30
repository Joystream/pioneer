import yargs from 'yargs'

import { addMembersModule } from './commands/addMemberAccounts'
import { addStakingAccountModule } from './commands/addStakingAccount'
import { removeStakingAccountModule } from './commands/removeStaking'

yargs(process.argv.slice(2))
  .scriptName('mocks')
  .command(addStakingAccountModule)
  .command(removeStakingAccountModule)
  .command(addMembersModule)
  .demandCommand().argv
