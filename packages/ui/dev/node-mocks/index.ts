import yargs from 'yargs'

import { addStakingAccountModule } from './commands/addStakingAccount'
import { announceModule } from './commands/announce'
import { applyOnOpeningModule } from './commands/applyOnOpening'
import { createMembersModule } from './commands/createMembers'
import { createOpeningModule } from './commands/createOpening'
import { createProposalModule } from './commands/createProposal'
import { fillOpeningModule } from './commands/fillOpening'
import { removeStakingAccountModule } from './commands/removeStaking'
import { setBudgetModule } from './commands/setBudget'
import { transferModule } from './commands/transfer'
import { voteModule } from './commands/vote'

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
  .command(voteModule)
  .command(announceModule)
  .command(transferModule)
  .command(createProposalModule)
  .demandCommand().argv
