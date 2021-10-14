import React from 'react'

import { ButtonGhost } from '@/common/components/buttons'
import { WatchIcon } from '@/common/components/icons'
import { useToggle } from '@/common/hooks/useToggle'
import { CandidacyProfilePreview } from '@/council/modals/AnnounceCandidacy/components/CandidacyProfilePreview'
import { CandidacyThumbnailPreview } from '@/council/modals/AnnounceCandidacy/components/CandidacyThumbnailPreview'
import { ElectionCandidateWithDetails } from '@/council/types'

interface PreviewButtonsProps {
  candidate: ElectionCandidateWithDetails
  disabled: boolean
}

export const PreviewButtons = ({ candidate, disabled }: PreviewButtonsProps) => {
  const [showProfilePreview, toggleProfilePreview] = useToggle()
  const [showThumbnailPreview, toggleThumbnailPreview] = useToggle()

  return (
    <>
      <ButtonGhost disabled={disabled} onClick={toggleThumbnailPreview} size="medium">
        <WatchIcon /> Preview thumbnail
      </ButtonGhost>
      <ButtonGhost disabled={disabled} onClick={toggleProfilePreview} size="medium">
        <WatchIcon /> Preview profile
      </ButtonGhost>
      {showProfilePreview && <CandidacyProfilePreview candidate={candidate} closeModal={toggleProfilePreview} />}
      {showThumbnailPreview && <CandidacyThumbnailPreview candidate={candidate} closeModal={toggleThumbnailPreview} />}
    </>
  )
}
