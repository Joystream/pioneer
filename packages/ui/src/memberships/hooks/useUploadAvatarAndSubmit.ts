import { useCallback, useState } from 'react'

import { uploadAvatarImage } from '@/common/modals/OnBoardingModal'

export const useUploadAvatarAndSubmit = <T extends { avatarUri?: string | File | null }>(
  onSubmit: (fields: T) => void
) => {
  const [isUploading, setIsUploading] = useState(false)
  const uploadAvatarAndSubmit = useCallback(
    async (fields: T) => {
      setIsUploading(true)
      const avatarUri = await uploadAvatarImage(fields.avatarUri)
      setIsUploading(false)
      onSubmit({ ...fields, avatarUri })
    },
    [onSubmit]
  )
  return { isUploading, uploadAvatarAndSubmit }
}
