import React, { useState, useEffect } from 'react'

import { SettingsInformation } from '@/common/components/SettingsInformation'
import { TextMedium } from '@/common/components/typography'
import { InfoBannerIcon } from './InfoBannerIcon'
import { WarningWithAction } from './WarningWithAction'
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
        <WarningWithAction
          icon={<InfoBannerIcon />}
          title="Verify your email account with a link in a message we sent you"
          button={<GenerateNewLinkButton />}
          description="Next link can be generated in 30 min..."
        >
          <TextMedium lighter>
            We sent a link to your email account that you have to use to verify. If you don't see any message from us
            checkthe spam folder, if you cannot find the message you can generate a new link.
          </TextMedium>
        </WarningWithAction>
      )
  }
  return (
    <WarningWithAction
      icon={<InfoBannerIcon />}
      title="Your email will never be shared and does not go on chain"
      button={<GenerateNewLinkButton />}
      description="Check your email. Next link can be generated in 30 min"
    >
      <TextMedium lighter>
        We use your email only to send you important notifications. You can change this email or opt out from anytime in
        settings.
      </TextMedium>
    </WarningWithAction>
  )
}
