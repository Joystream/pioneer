import React, { useState, useEffect } from 'react'

import { SettingsInformation } from '@/common/components/SettingsInformation'
import { TextMedium } from '@/common/components/typography'
import { InfoBannerIcon } from '@/common/components/icons'
import { Warning } from '@/common/components/Warning'
import { GenerateNewLinkButton } from './GenerateNewLinkButton'

export type InputEmailState = 'verified' | 'unverified' | 'active'
interface Props {
  emailState: InputEmailState
}
export const InformationBanner = ({ emailState }: Props) => {
  switch (emailState) {
    case 'verified':
      return (
        <SettingsInformation icon={<InfoBannerIcon />} title="Your email will never be shared and does not go on chain">
          <TextMedium lighter>
            We use your email only to send you important notifications. You can change this email or opt out from
            anytime in settings.
          </TextMedium>
        </SettingsInformation>
      )
    case 'unverified':
      return (
        <Warning
          withIcon
          title="Verify your email account with a link in a message we sent you"
          content="We sent a link to your email account that you have to use to verify. If you don't see any message from us
          checkthe spam folder, if you cannot find the message you can generate a new link."
          button={<GenerateNewLinkButton />}
          description="Next link can be generated in 30 min..."
        />
      )
  }
  return (
    <Warning
      withIcon
      title="Your email will never be shared and does not go on chain"
      content="We use your email only to send you important notifications. You can change this email or opt out from anytime in
      settings."
      button={<GenerateNewLinkButton />}
      description="Check your email. Next link can be generated in 30 min"
    />
  )
}
