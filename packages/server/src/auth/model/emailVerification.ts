import { error } from 'npmlog'

import { emailProvider } from '@/common/api/email'
import { PIONEER_URL } from '@/common/config'
import { renderPioneerEmail } from '@/common/email-templates/pioneer-email'
import { errorMessage } from '@/common/utils'

import { createEmailToken } from './token'

type SendVerificationEmailOpts = {
  email: string
  memberId: number
  name: string
  referer?: string
}

export const sendVerificationEmail = async ({ email, memberId, name, referer }: SendVerificationEmailOpts) => {
  const token = createEmailToken({ email, memberId })
  const baseUrl = (referer || PIONEER_URL).replace(/\/$/, '') // get rid of trailing slash
  const verificationUrl = `${baseUrl}/#/settings?emailVerificationToken=${token}`

  try {
    await emailProvider.sendEmail({
      to: email,
      subject: 'Confirm your email for Pioneer',
      html: renderPioneerEmail({
        memberHandle: name,
        summary: 'Confirm your email for Pioneer',
        text: `Please use the link below to confirm your email address "${email}" for Pioneer notifications.`,
        button: {
          label: 'Confirm email',
          href: verificationUrl,
        },
      }),
    })
  } catch (err) {
    error('Auth', errorMessage(err), JSON.stringify(err, null, 2))
    throw err
  }
}
