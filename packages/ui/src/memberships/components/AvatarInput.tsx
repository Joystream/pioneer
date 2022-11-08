import React, { useCallback } from 'react'
import { useFormContext } from 'react-hook-form'

import { InputComponent, InputText } from '@/common/components/forms'
import { SmallFileUpload } from '@/common/components/SmallFileUpload/SmallFileUpload'
import { TextMedium } from '@/common/components/typography'

export const AvatarInput = ({ initialPreview }: { initialPreview?: string }) => {
  const formContext = useFormContext()

  const onUpload = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>, resizedImage?: Blob | null | File) => {
      if (resizedImage) {
        formContext.setValue('avatarUri', resizedImage, { shouldValidate: true })
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
