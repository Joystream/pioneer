import React from 'react'
import styled from 'styled-components'

import { CKEditor } from '@/common/components/CKEditor'
import { InputText, InputComponent, InputNotification } from '@/common/components/forms'
import { Row } from '@/common/components/Modal'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { TextMedium } from '@/common/components/typography'
import { ValidationHelpers } from '@/common/utils/validation'
import { SelectedMember } from '@/memberships/components/SelectMember'
import { Member } from '@/memberships/types'

interface Props extends ValidationHelpers {
  activeMember?: Member
}

export const GeneralParametersStep = ({ activeMember, errorMessageGetter, errorChecker }: Props) => {
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
          <SelectedMember name="generalParameters.creator" disabled member={activeMember} label="Creator" />
          <StyledInputComponent
            id="field-title"
            label="Bounty title"
            inputSize="m"
            required
            message={errorChecker('title') ? errorMessageGetter('title') : 'MAX 70'}
            validation={errorChecker('title') ? 'invalid' : undefined}
          >
            <InputText name="generalParameters.title" id="field-title" placeholder="Title" />
          </StyledInputComponent>
          <StyledInputComponent
            id="field-photo"
            label="Cover photo"
            inputSize="m"
            message={
              errorChecker('coverPhotoLink')
                ? errorMessageGetter('coverPhotoLink')
                : 'JPG, PNG: 800x450px or aspect ratio: 16:9'
            }
            validation={errorChecker('coverPhotoLink') ? 'invalid' : undefined}
          >
            <InputText
              id="field-photo"
              name="generalParameters.coverPhotoLink"
              placeholder="Paste a link to bounty cover photo"
            />
          </StyledInputComponent>
          <InputComponent id="field-description" inputSize="auto" label="Bounty description" required>
            <CKEditor id="field-description" minRows={5} name="generalParameters.description" />
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
