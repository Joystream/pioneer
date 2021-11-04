import { readFileSync, writeFileSync } from 'fs'

import { DeepMerger } from '@apollo/client/utilities'
import yargs from 'yargs'

import configs from './configs'

const handlerFor = (stage: 'announcing' | 'voting' | 'revealing') => () => {
  const merger = new DeepMerger()
  const pathName = `${__dirname}/data/chain-spec.json`
  const oldSpec = JSON.parse(readFileSync(pathName, 'utf8'))
  const newSpec = merger.merge(oldSpec, configs[stage])
  writeFileSync(pathName, `${JSON.stringify(newSpec, null, 2)}\n`)
}

yargs(process.argv.slice(2))
  .usage('yarn set-chain-spec <command>')
  .scriptName('')
  .command('announcing', 'Make the node start at the Announcing stage', handlerFor('announcing'))
  .command('voting', 'Make the node start at the Voting stage', handlerFor('voting'))
  .command('revealing', 'Make the node start at the Revealing stage', handlerFor('revealing'))
  .demandCommand().argv
