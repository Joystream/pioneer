import fs from 'fs'

import { DeepMerger } from '@apollo/client/utilities'
import yargs from 'yargs'

import configs from './configs'
import spec from './data/chain-spec.json'

const handlerFor = (stage: 'announcing' | 'voting' | 'revealing') => () => {
  const merger = new DeepMerger()
  const newSpec = merger.merge(spec, configs[stage])
  const pathName = `${__dirname}/data/chain-spec.json`
  const content = JSON.stringify(newSpec, null, 2) + '\n'
  fs.writeFileSync(pathName, content)
}

yargs(process.argv.slice(2))
  .usage('yarn set-chain-spec <command>')
  .scriptName('')
  .command('announcing', 'Make the node start at the Announcing stage', handlerFor('announcing'))
  .command('voting', 'Make the node start at the Voting stage', handlerFor('voting'))
  .command('revealing', 'Make the node start at the Revealing stage', handlerFor('revealing'))
  .demandCommand().argv
