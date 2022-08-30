import React, { ChangeEvent, useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import styled from 'styled-components'

import { BasicLinkButtonGhostStyles } from '@/common/components/buttons/LinkButtons'
import { AlertSymbol } from '@/common/components/icons/symbols'
import { Row } from '@/common/components/Modal'
import { ColumnGapBlock, RowGapBlock } from '@/common/components/page/PageContent'
import { TextMedium } from '@/common/components/typography'
import { BorderRad } from '@/common/constants'
import { enhancedGetErrorMessage, enhancedHasError } from '@/common/utils/validation'
import { Avatar } from '@/memberships/components/Avatar'

interface SmallFileUploadProps {
  name: string
  onUpload: (event: ChangeEvent<HTMLInputElement>) => void
}

export const SmallFileUpload = ({ onUpload, name }: SmallFileUploadProps) => {
  const [localValue, setLocalValue] = useState<File | null>()
  const { formState } = useFormContext()
  const [avatarPreview, setAvatarPreview] = useState<string>()

  useEffect(() => {
    if (localValue) {
      const objectUrl = URL.createObjectURL(localValue)
      setAvatarPreview(objectUrl)
      return () => URL.revokeObjectURL(objectUrl)
    }
  }, [localValue])

  return (
    <RowGapBlock gap={10}>
      {avatarPreview && (
        <Row>
          <AvatarPreviewContainer>
            <Avatar avatarUri={avatarPreview} />
          </AvatarPreviewContainer>
        </Row>
      )}
      <UpdateButtonWrapper>
        <BrowseButton size="small">
          Browse for file{' '}
          <input
            type="file"
            onChange={(event) => {
              setLocalValue(event.target.files?.item(0) ?? null)
              onUpload(event)
            }}
          />
        </BrowseButton>
        <TextMedium>{localValue?.name}</TextMedium>
      </UpdateButtonWrapper>
      {enhancedHasError(formState.errors)(name) && (
        <AvatarErrorMessage gap={4}>
          <AlertSymbol />
          {enhancedGetErrorMessage(formState.errors)(name)}
        </AvatarErrorMessage>
      )}
    </RowGapBlock>
  )
}

const AvatarErrorMessage = styled(ColumnGapBlock)`
  color: red;

  .blackPart,
  .primaryPart {
    fill: currentColor;
  }
`

const UpdateButtonWrapper = styled(ColumnGapBlock)`
  align-items: center;
`

const AvatarPreviewContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80px;
  height: 80px;
  border-radius: ${BorderRad.round};
  overflow: hidden;
`

const BrowseButton = styled.label`
  ${BasicLinkButtonGhostStyles};

  text-transform: none;
  display: inline-flex;

  input {
    opacity: 0;
    position: absolute;
    pointer-events: none;
  }
`
