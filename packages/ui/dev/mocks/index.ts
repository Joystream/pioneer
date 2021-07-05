import yargs from 'yargs'

import { addStakingAccountModule } from './commands/addStakingAccount'
import { createOpeningModule } from './commands/createAnOnOpening'
import { createMembersModule } from './commands/createMembers'
import { removeStakingAccountModule } from './commands/removeStaking'
import { setBudgetModule } from './commands/setBudget'

yargs(process.argv.slice(2))
  .usage('yarn node-mocks <command>')
  .scriptName('')
  .command(createMembersModule)
  .command(addStakingAccountModule)
  .command(removeStakingAccountModule)
  .command(setBudgetModule)
  .command(createOpeningModule)
  .demandCommand().argv
