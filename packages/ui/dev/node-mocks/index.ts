import yargs from 'yargs'

// import { createBountyModule } from './commands/bounty/create'
import { announceCandidaciesModule } from './commands/council/announce'
import { electCouncilModule } from './commands/council/elect'
import { revealVotesModule } from './commands/council/reveal'
import { castVotesModule } from './commands/council/vote'
import { createForumCategoryModule } from './commands/forumCategory/create'
import { createMembersModule } from './commands/members/create'
import { createOpeningModule } from './commands/opening/create'
import { fillOpeningModule } from './commands/opening/fill'
import { createProposalModule } from './commands/proposals/create'
import { setBudgetModule } from './commands/setBudget'
import { transferModule } from './commands/transfer'
import { createUpcomingOpeningModule } from './commands/upcomingOpening/create'

yargs(process.argv.slice(2))
  .usage('yarn node-mocks <command>')
  .scriptName('')
  // .command(createBountyModule)
  .command(createProposalModule)
  .command(announceCandidaciesModule)
  .command(castVotesModule)
  .command(createForumCategoryModule)
  .command(revealVotesModule)
  .command(electCouncilModule)
  .command(createMembersModule)
  .command(setBudgetModule)
  .command(createOpeningModule)
  .command(createUpcomingOpeningModule)
  .command(fillOpeningModule)
  .command(transferModule)
  .demandCommand().argv
