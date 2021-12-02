import yargs from 'yargs'

import { setChainSpecModule } from './chain-spec'
import { commitmentModule } from './commitment'

yargs(process.argv.slice(2))
  .usage('yarn helpers <command>')
  .scriptName('')
  .command(setChainSpecModule)
  .command(commitmentModule)
  .demandCommand().argv
