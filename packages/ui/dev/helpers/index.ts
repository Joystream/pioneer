import yargs from 'yargs'

import { apiBenchmarking } from './apiBenchmarking'
import { setChainSpecModule } from './chain-spec'
import { commitmentModule } from './commitment'
import { nextCouncilStageModule } from './nextCouncilStage'

yargs(process.argv.slice(2))
  .usage('yarn helpers <command>')
  .scriptName('')
  .command(apiBenchmarking)
  .command(setChainSpecModule)
  .command(commitmentModule)
  .command(nextCouncilStageModule)
  .demandCommand().argv
