import yargs from 'yargs'

import { announceCandidaciesModule } from './commands/council/announce'
import { createMembersModule } from './commands/members/create'
import { createOpeningModule } from './commands/opening/create'
import { fillOpeningModule } from './commands/opening/fill'
import { setBudgetModule } from './commands/setBudget'
import { transferModule } from './commands/transfer'

yargs(process.argv.slice(2))
  .usage('yarn node-mocks <command>')
  .scriptName('')
  .command(announceCandidaciesModule)
  .command(createMembersModule)
  .command(setBudgetModule)
  .command(createOpeningModule)
  .command(fillOpeningModule)
  .command(transferModule)
  .demandCommand().argv
