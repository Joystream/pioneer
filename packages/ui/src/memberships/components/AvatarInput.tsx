import React from 'react'
import { useFormContext } from 'react-hook-form'

import { InputComponent, InputText } from '@/common/components/forms'
import { SmallFileUpload } from '@/common/components/SmallFileUpload/SmallFileUpload'
import { TextMedium } from '@/common/components/typography'

export const AvatarInput = ({ initialPreview }: { initialPreview?: string }) => {
  const formContext = useFormContext()

  return process.env.REACT_APP_AVATAR_UPLOAD_URL ? (
    <>
      <TextMedium bold value>
        Member avatar
      </TextMedium>
      <SmallFileUpload
        name="avatarUri"
        initialPreview={initialPreview}
        onUpload={(event) =>
          formContext.setValue('avatarUri', event.target.files?.item(0) ?? null, { shouldValidate: true })
        }
      />
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
