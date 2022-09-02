import { useCallback, useState } from 'react'

import { uploadAvatarImage } from '@/common/modals/OnBoardingModal'
import { MemberFormFields } from '@/memberships/modals/BuyMembershipModal/BuyMembershipFormModal'

export const useUploadAvatarAndSubmit = (onSubmit: (fields: MemberFormFields) => void) => {
  const [isUploading, setIsUploading] = useState(false)
  const uploadAvatarAndSubmit = useCallback(
    async (fields: MemberFormFields) => {
      setIsUploading(true)
      const avatarUri = await uploadAvatarImage(fields.avatarUri)
      setIsUploading(false)
      onSubmit({ ...fields, avatarUri })
    },
    [onSubmit]
  )
  return { isUploading, uploadAvatarAndSubmit }
}
