import yargs from 'yargs'

import { addStakingAccountModule } from './commands/addStakingAccount'
import { createMembersModule } from './commands/createMembers'
import { removeStakingAccountModule } from './commands/removeStaking'
import { setBudgetModule } from './commands/setBudget'

yargs(process.argv.slice(2))
  .scriptName('mocks/index')
  .command(createMembersModule)
  .command(addStakingAccountModule)
  .command(removeStakingAccountModule)
  .command(setBudgetModule)
  .demandCommand().argv
