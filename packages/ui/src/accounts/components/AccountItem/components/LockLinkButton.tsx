import React, { useEffect } from 'react'

import { LinkButtonGhost } from '@/common/components/buttons/LinkButtons'
import { Arrow } from '@/common/components/icons'
import { useModal } from '@/common/hooks/useModal'
import { CandidacyPreviewModalCall } from '@/council/modals/CandidacyPreview/types'

interface LockLinkButtonProps {
  label: string
  to: string
  candidateId?: string
}

export const LockLinkButton = React.memo(({ label, to, candidateId }: LockLinkButtonProps) => {
  const { showModal } = useModal()

  useEffect(() => {
    if (candidateId) {
      showModal<CandidacyPreviewModalCall>({ modal: 'CandidacyPreview', data: { id: candidateId } })
    }
  }, [candidateId])

  return (
    <LinkButtonGhost size="medium" to={to}>
      {label}
      <Arrow direction="right" />
    </LinkButtonGhost>
  )
})
