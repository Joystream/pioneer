import { config } from 'dotenv'

const errMsg = (name: string) => Error(`${name} should be defined in .env`)
const {
  QUERY_NODE_ENDPOINT,
  APP_SECRET_KEY,
  PIONEER_URL = 'https://pioneerapp.xyz',
  STARTING_BLOCK: _STARTING_BLOCK,
} = config().parsed ?? {}

if (!QUERY_NODE_ENDPOINT) throw errMsg('QUERY_NODE_ENDPOINT')
if (!APP_SECRET_KEY) throw errMsg('APP_SECRET_KEY')

export { QUERY_NODE_ENDPOINT, APP_SECRET_KEY, PIONEER_URL }

export const STARTING_BLOCK = Number(_STARTING_BLOCK ?? 0)
