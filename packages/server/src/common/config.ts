import { config } from 'dotenv'

const { QUERY_NODE_ENDPOINT } = config().parsed ?? {}
if (!QUERY_NODE_ENDPOINT) {
  throw Error('QUERY_NODE_ENDPOINT should be defined in .env')
}

export { QUERY_NODE_ENDPOINT }
