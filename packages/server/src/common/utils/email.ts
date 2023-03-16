import sgMail from '@sendgrid/mail'
import formData from 'form-data'
import Mailgun from 'mailgun.js'

import { emailProvider, EMAIL_SENDER, MAILGUN_DOMAIN } from '@/common/config'

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
