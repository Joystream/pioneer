import React from 'react'
import styled from 'styled-components'
import * as Yup from 'yup'

import { GeneralParametersContext } from '@/bounty/modals/AddBountyModal/machine'
import { CKEditor } from '@/common/components/CKEditor'
import { InputComponent, InputNotification, InputText } from '@/common/components/forms'
import { getErrorMessage, hasError } from '@/common/components/forms/FieldError'
import { Row } from '@/common/components/Modal'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { TextMedium } from '@/common/components/typography'
import { useSchema } from '@/common/hooks/useSchema'
import { SelectedMember } from '@/memberships/components/SelectMember'
import { Member } from '@/memberships/types'

interface Props extends Omit<GeneralParametersContext, 'creator'> {
  setTitle: (title: string) => void
  setCoverPhoto: (link: string) => void
  setDescription: (description: string) => void
  activeMember?: Member
}

const schema = Yup.object().shape({
  title: Yup.string().max(70, 'Max length is 70 characters'),
  coverPhotoLink: Yup.string().url('Invalid URL'),
})

export const GeneralParametersStep = ({
  title,
  description,
  setDescription,
  setTitle,
  coverPhotoLink,
  setCoverPhoto,
  activeMember,
}: Props) => {
  const { errors } = useSchema({ title, coverPhotoLink }, schema)

  return (
    <RowGapBlock gap={24}>
      <Row>
        <RowGapBlock gap={8}>
          <h4>General parameters</h4>
          <TextMedium lighter>Bounty details</TextMedium>
        </RowGapBlock>
      </Row>
      <Row>
        <RowGapBlock gap={20}>
          <SelectedMember disabled member={activeMember} label="Creator" />
          <StyledInputComponent
            id="field-title"
            label="Bounty title"
            inputSize="m"
            required
            message={hasError('title', errors) ? getErrorMessage('title', errors) : 'MAX 70'}
            validation={hasError('title', errors) ? 'invalid' : undefined}
          >
            <InputText id="field-title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
          </StyledInputComponent>
          <StyledInputComponent
            id="field-photo"
            label="Cover photo"
            inputSize="m"
            required
            message={
              hasError('coverPhotoLink', errors)
                ? getErrorMessage('coverPhotoLink', errors)
                : 'JPG, PNG: 800x450px or aspect ratio: 16:9'
            }
            validation={hasError('coverPhotoLink', errors) ? 'invalid' : undefined}
          >
            <InputText
              id="field-photo"
              value={coverPhotoLink}
              onChange={(e) => setCoverPhoto(e.target.value)}
              placeholder="Paste a link to bounty cover photo"
            />
          </StyledInputComponent>
          <InputComponent id="field-description" inputSize="auto" label="Bounty description" required>
            <CKEditor
              id="field-description"
              minRows={3}
              onChange={(event, editor) => setDescription(editor.getData())}
              onReady={(editor) => editor.setData(description)}
            />
          </InputComponent>
        </RowGapBlock>
      </Row>
    </RowGapBlock>
  )
}

const StyledInputComponent = styled(InputComponent)<{ validation?: string | undefined }>`
  ${InputNotification} {
    justify-content: ${({ validation }) => validation === undefined && 'end'};
  }
`
