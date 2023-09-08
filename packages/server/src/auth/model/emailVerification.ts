import { emailProvider } from '@/common/api/email'
import { PIONEER_URL } from '@/common/config'
import { renderPioneerEmail } from '@/common/email-templates/pioneer-email'

import { createEmailToken } from './token'

type SendVerificationEmailOpts = {
  email: string
  memberId: number
  name: string
  referer?: string
}

export const sendVerificationEmail = async ({ email, memberId, name, referer }: SendVerificationEmailOpts) => {
  const token = createEmailToken({ email, memberId })
  const verificationUrl = `${referer || PIONEER_URL}/#/?verify-email=${token}`

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
}
