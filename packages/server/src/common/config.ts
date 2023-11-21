import { config } from 'dotenv'
import log from 'npmlog'

config()

const {
  PORT = 3000,
  APP_SECRET_KEY,
  APP_LOG_LEVEL = 'info',
  QUERY_NODE_ENDPOINT = 'https://query.joystream.org/graphql',
  PIONEER_URL = 'https://pioneerapp.xyz',
  STARTING_BLOCK: _STARTING_BLOCK,
  EMAIL_SENDER,
  SENDGRID_API_KEY,
  MAILGUN_API_KEY,
  MAILGUN_API_URL,
  MAILGUN_DOMAIN,
  INITIAL_MEMBERSHIPS: _INITIAL_MEMBERSHIPS,
} = process.env as { [k: string]: string }

log.level = APP_LOG_LEVEL

const SENDGRID_CONFIG = SENDGRID_API_KEY ? { apiKey: SENDGRID_API_KEY } : null
const MAILGUN_CONFIG =
  MAILGUN_API_KEY && MAILGUN_DOMAIN ? { apiKey: MAILGUN_API_KEY, domain: MAILGUN_DOMAIN, url: MAILGUN_API_URL } : null

export { PORT, APP_SECRET_KEY, QUERY_NODE_ENDPOINT, PIONEER_URL, EMAIL_SENDER, SENDGRID_CONFIG, MAILGUN_CONFIG }

export const STARTING_BLOCK = Number(_STARTING_BLOCK ?? 0)

export const INITIAL_MEMBERSHIPS = _INITIAL_MEMBERSHIPS ? [JSON.parse(_INITIAL_MEMBERSHIPS)].flat() : []

export const EMAIL_MAX_RETRY_COUNT = 3
