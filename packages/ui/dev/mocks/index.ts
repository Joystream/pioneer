import yargs from 'yargs'

import { addStakingAccountModule } from './commands/addStakingAccount'
import { applyOnOpeningModule } from './commands/applyOnOpening'
import { createMembersModule } from './commands/createMembers'
import { createOpeningModule } from './commands/createOpening'
import { fillOpeningModule } from './commands/fillOpening'
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
  .command(applyOnOpeningModule)
  .command(fillOpeningModule)
  .demandCommand().argv
