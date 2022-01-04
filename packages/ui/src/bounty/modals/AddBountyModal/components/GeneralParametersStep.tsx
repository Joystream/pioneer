import React, { useEffect } from 'react'
import styled from 'styled-components'

import { GeneralParametersContext } from '@/bounty/modals/AddBountyModal/machine'
import { CKEditor } from '@/common/components/CKEditor'
import { InputComponent, InputNotificationMessage, InputText } from '@/common/components/forms'
import { Row } from '@/common/components/Modal'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { TextMedium } from '@/common/components/typography'
import { SelectedMember } from '@/memberships/components/SelectMember'
import { Member } from '@/memberships/types'

interface Props extends Omit<GeneralParametersContext, 'creator'> {
  setCreator: (creator: Member) => void
  setTitle: (title: string) => void
  setCoverPhoto: (link: string) => void
  setDescription: (description: string) => void
  activeMember?: Member
}

export const GeneralParametersStep = ({
  setCreator,
  title,
  description,
  setDescription,
  setTitle,
  coverPhotoLink,
  setCoverPhoto,
  activeMember,
}: Props) => {
  useEffect(() => {
    if (activeMember) setCreator(activeMember)
  }, [activeMember])

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
            message={title?.length > 70 ? 'Max length is 70 characters' : 'MAX 70'}
            validation={title?.length > 70 ? 'invalid' : undefined}
          >
            <InputText id="field-title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Type" />
          </StyledInputComponent>
          <StyledInputComponent
            id="field-photo"
            label="Cover photo"
            inputSize="m"
            required
            message="JPG, PNG: 800x450px or aspect ratio: 16:9"
          >
            <InputText
              id="field-photo"
              value={coverPhotoLink}
              onChange={(e) => setCoverPhoto(e.target.value)}
              placeholder="Paste link to bounty’s cover photo"
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

const StyledInputComponent = styled(InputComponent)`
  ${InputNotificationMessage} {
    text-align: right;
  }
`
