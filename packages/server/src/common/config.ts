import { config } from 'dotenv'
import { pick } from 'lodash'
import log from 'npmlog'

config()

const {
  PORT = 3000,
  APP_SECRET_KEY, // TODO check this is defined when running the api
  APP_LOG_LEVEL = 'info',
  QUERY_NODE_ENDPOINT = 'https://query.joystream.org/graphql',
  PIONEER_URL = 'https://pioneerapp.xyz',
  STARTING_BLOCK: _STARTING_BLOCK,
  EMAIL_SENDER,
  MAILGUN_DOMAIN,
  INITIAL_MEMBERSHIPS: _INITIAL_MEMBERSHIPS,
} = process.env as { [k: string]: string }

log.level = APP_LOG_LEVEL

const emailProvidersConfig = ['SENDGRID_API_KEY', 'MAILGUN_CONFIG'] as const
const emailProvider = pick(process.env, emailProvidersConfig)

export { PORT, APP_SECRET_KEY, QUERY_NODE_ENDPOINT, PIONEER_URL, EMAIL_SENDER, emailProvider, MAILGUN_DOMAIN }

export const STARTING_BLOCK = Number(_STARTING_BLOCK ?? 0)

export const INITIAL_MEMBERSHIPS = _INITIAL_MEMBERSHIPS ? [JSON.parse(_INITIAL_MEMBERSHIPS)].flat() : []
