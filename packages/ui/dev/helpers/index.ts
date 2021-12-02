import yargs from 'yargs'

import { setChainSpecModule } from './chain-spec'

yargs(process.argv.slice(2))
  .usage('yarn helpers <command>')
  .scriptName('')
  .command(setChainSpecModule)
  .demandCommand().argv
