import { useCallback, useState } from 'react'

import { error } from '@/common/logger'

const uploadAvatarImage = async (image?: File | string | null): Promise<string> => {
  if (!image || !(image instanceof File)) return image ?? ''
  try {
    const body = new FormData()
    body.append('file', image, image.name)
    const data = await fetch(process.env.REACT_APP_AVATAR_UPLOAD_URL ?? '', {
      method: 'POST',
      body,
    }).then((res) => res.json())
    return `${process.env.REACT_APP_AVATAR_UPLOAD_URL}/${data.fileName}`
  } catch (err) {
    error('Error while uploading the avatar:', err)
    return ''
  }
}

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
