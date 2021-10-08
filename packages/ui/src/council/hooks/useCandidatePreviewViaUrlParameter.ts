import { useEffect } from 'react'

import { useModal } from '@/common/hooks/useModal'
import { useRouteQuery } from '@/common/hooks/useRouteQuery'

import { CandidacyPreviewModalCall } from '../modals/CandidacyPreview/types'

export const useCandidatePreviewViaUrlParameter = () => {
  const { showModal } = useModal()
  const query = useRouteQuery()
  const candidateId = query.get('candidate')
  useEffect(() => {
    if (candidateId) {
      showModal<CandidacyPreviewModalCall>({ modal: 'CandidacyPreview', data: { id: candidateId } })
    }
  }, [candidateId])
}
