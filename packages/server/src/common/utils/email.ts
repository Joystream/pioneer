import sgMail from '@sendgrid/mail'
import formData from 'form-data'
import { isString } from 'lodash'
import Mailgun from 'mailgun.js'

import { emailProvider, EMAIL_SENDER, MAILGUN_DOMAIN } from '@/common/config'

const errMsg = (name: string) => Error(`${name} should be defined in .env`)

if (!EMAIL_SENDER) throw errMsg('EMAIL_SENDER')
if (Object.values(emailProvider).filter(isString).length !== 1) {
  throw errMsg(`A unique value out of: ${Object.values(emailProvider).join(', ')}`)
}
if (emailProvider.MAILGUN_CONFIG && !MAILGUN_DOMAIN) throw errMsg('If MAILGUN_CONFIG is defined, MAILGUN_DOMAIN')

export type EmailBody = { text: string } | { html: string }
export type Email = { to: string; subject: string } & EmailBody

export const configEmailProvider = (): ((email: Email) => Promise<void>) => {
  const toFullEmail = (email: Email) => ({ ...email, from: EMAIL_SENDER })

  if (emailProvider.SENDGRID_API_KEY) {
    sgMail.setApiKey(emailProvider.SENDGRID_API_KEY)
    return async (email) => {
      await sgMail.send(toFullEmail(email))
    }
  } else if (emailProvider.MAILGUN_CONFIG) {
    const mailgun = new Mailgun(formData)
    const mg = mailgun.client({ username: 'api', key: JSON.parse(emailProvider.MAILGUN_CONFIG) })
    return async (email) => {
      await mg.messages.create(MAILGUN_DOMAIN, toFullEmail(email))
    }
  }

  throw Error('The email provider is not defined correctly')
}
