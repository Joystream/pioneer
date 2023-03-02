import { config } from 'dotenv'

const errMsg = (name: string) => Error(`${name} should be defined in .env`)
const { QUERY_NODE_ENDPOINT, APP_SECRET_KEY, PIONEER_URL = 'https://pioneerapp.xyz' } = config().parsed ?? {}

if (!QUERY_NODE_ENDPOINT) throw errMsg('QUERY_NODE_ENDPOINT')
if (!APP_SECRET_KEY) throw errMsg('APP_SECRET_KEY')

export { QUERY_NODE_ENDPOINT, APP_SECRET_KEY, PIONEER_URL }
