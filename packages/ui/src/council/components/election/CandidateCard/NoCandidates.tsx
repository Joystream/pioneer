import React from 'react'

import { NoData } from '@/common/components/NoData'
import { TextMedium } from '@/common/components/typography'
import { AnnounceCandidacyButton } from '@/council/components/election/announcing/AnnounceCandidacyButton'

export const NoCandidates = () => (
  <NoData>
    <h3>There are no candidates yet</h3>
    <TextMedium>Be the first one to announce your candidacy. </TextMedium>
    <AnnounceCandidacyButton />
  </NoData>
)
