import sgMail from '@sendgrid/mail'
import formData from 'form-data'
import Mailgun from 'mailgun.js'
import type MailgunClient from 'mailgun.js/client'

import { EMAIL_SENDER, SENDGRID_CONFIG, MAILGUN_CONFIG } from '@/common/config'

const createMissingEnvError = (name: string) => Error(`${name} should be defined in environment`)

export type EmailBody = { text: string } | { html: string }
export type EmailWithoutRecipient = { subject: string } & EmailBody
export type Email = { to: string } & EmailWithoutRecipient

const toFullEmail = (email: Email) => ({ ...email, from: EMAIL_SENDER })

interface EmailProvider {
  sendEmail: (email: Email) => Promise<void>
}

class MailgunEmailProvider implements EmailProvider {
  private mailgun: MailgunClient
  private mailgunDomain: string

  constructor(config: Exclude<typeof MAILGUN_CONFIG, null>) {
    this.mailgun = new Mailgun(formData).client({ username: 'api', key: config.apiKey })
    this.mailgunDomain = config.domain
  }

  async sendEmail(email: Email): Promise<void> {
    await this.mailgun.messages.create(this.mailgunDomain, toFullEmail(email))
  }
}

class SendgridEmailProvider implements EmailProvider {
  constructor(config: Exclude<typeof SENDGRID_CONFIG, null>) {
    sgMail.setApiKey(config.apiKey)
  }

  async sendEmail(email: Email): Promise<void> {
    await sgMail.send(toFullEmail(email))
  }
}

if (!EMAIL_SENDER) {
  throw createMissingEnvError('EMAIL_SENDER')
}

if (!SENDGRID_CONFIG && !MAILGUN_CONFIG) {
  throw Error('The email provider is not defined correctly')
}

if (SENDGRID_CONFIG && MAILGUN_CONFIG) {
  throw Error('Multiple email providers are defined')
}

export const emailProvider = SENDGRID_CONFIG
  ? new SendgridEmailProvider(SENDGRID_CONFIG)
  : // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    new MailgunEmailProvider(MAILGUN_CONFIG!)
