import React, { ChangeEvent, useCallback, useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import styled from 'styled-components'

import { BasicLinkButtonGhostStyles } from '@/common/components/buttons/LinkButtons'
import { AlertSymbol } from '@/common/components/icons/symbols'
import { Row } from '@/common/components/Modal'
import { ColumnGapBlock, RowGapBlock } from '@/common/components/page/PageContent'
import { TextMedium } from '@/common/components/typography'
import { BorderRad } from '@/common/constants'
import { resizeImageFile } from '@/common/helpers'
import { info } from '@/common/logger'
import { enhancedGetErrorMessage, enhancedHasError } from '@/common/utils/validation'
import { Avatar } from '@/memberships/components/Avatar'
import { SUPPORTED_IMAGES } from '@/memberships/model/validation'

interface SmallFileUploadProps {
  name: string
  onUpload: (event: ChangeEvent<HTMLInputElement>, resizedImage?: Blob | null | File) => void
  initialPreview?: string
}

export const SmallFileUpload = ({ onUpload, name, initialPreview }: SmallFileUploadProps) => {
  const [localValue, setLocalValue] = useState<{ blob: Blob | null; file: File | null }>({
    blob: null,
    file: null,
  })
  const { formState } = useFormContext()
  const [avatarPreview, setAvatarPreview] = useState<string>(initialPreview ?? '')
  useEffect(() => {
    if (localValue.blob && SUPPORTED_IMAGES.includes(localValue.file?.type ?? '')) {
      const objectUrl = URL.createObjectURL(localValue.blob)
      setAvatarPreview(objectUrl)

      return () => {
        objectUrl && URL.revokeObjectURL(objectUrl)
      }
    }
  }, [localValue])

  const onChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.item(0) ?? null

      if (file && SUPPORTED_IMAGES.includes(file.type)) {
        try {
          resizeImageFile(file, 192, 192, 'image/webp').then((blob) => {
            setLocalValue({ blob, file })
            return onUpload(event, blob)
          })
        } catch (e) {
          info(e)
        }
      }
      setLocalValue({ blob: null, file })
      onUpload(event, file)
    },
    [onUpload]
  )

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
          Browse for file <input type="file" onChange={onChange} />
        </BrowseButton>
        <TextMedium>{localValue.file?.name}</TextMedium>
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
