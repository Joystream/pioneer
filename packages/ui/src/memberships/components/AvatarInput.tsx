import React, { useCallback } from 'react'
import { useFormContext } from 'react-hook-form'

import { InputComponent, InputText } from '@/common/components/forms'
import { SmallFileUpload } from '@/common/components/SmallFileUpload/SmallFileUpload'
import { TextMedium } from '@/common/components/typography'
import { resizeImageFile } from '@/common/helpers'

export const AvatarInput = ({ initialPreview }: { initialPreview?: string }) => {
  const formContext = useFormContext()

  const onUpload = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.item(0) ?? null
      if (file) {
        try {
          const fileBlob = await resizeImageFile(file, 192, 192, 'image/webp')
          formContext.setValue('avatarUri', fileBlob, { shouldValidate: true })
        } catch (e) {
          formContext.setValue('avatarUri', file, { shouldValidate: true })
        }
      }
    },
    [formContext.setValue]
  )

  return process.env.REACT_APP_AVATAR_UPLOAD_URL ? (
    <>
      <TextMedium bold value>
        Member avatar
      </TextMedium>
      <SmallFileUpload name="avatarUri" initialPreview={initialPreview} onUpload={onUpload} />
    </>
  ) : (
    <InputComponent
      id="member-avatar"
      label="Member Avatar"
      name="avatarUri"
      message="Paste an URL of your avatar image. Text lorem ipsum."
      placeholder="Image URL"
    >
      <InputText id="member-avatar" name="avatarUri" />
    </InputComponent>
  )
}
