import React, { useEffect } from 'react'

import { GeneralParametersContext } from '@/bounty/modals/AddBountyModal/machine'
import { CKEditor } from '@/common/components/CKEditor'
import { InputComponent, InputText } from '@/common/components/forms'
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
          <InputComponent id="field-title" label="Bounty title" inputSize="m" required>
            <InputText id="field-title" value={title} onChange={(e) => setTitle(e.target.value)} />
          </InputComponent>
          <InputComponent id="field-photo" label="Cover photo" inputSize="m" required>
            <InputText id="field-photo" value={coverPhotoLink} onChange={(e) => setCoverPhoto(e.target.value)} />
          </InputComponent>
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
