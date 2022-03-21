import React from 'react'
import * as Yup from 'yup'

import { CKEditor } from '@/common/components/CKEditor'
import { InputComponent, InputText, InputTextarea } from '@/common/components/forms'
import { getErrorMessage, hasError } from '@/common/components/forms/FieldError'
import { Row } from '@/common/components/Modal'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { TextMedium } from '@/common/components/typography'
import { useSchema } from '@/common/hooks/useSchema'
import { WorkingGroupAndDescriptionParameters } from '@/proposals/modals/AddNewProposal/components/SpecificParameters/WorkingGroupLeadOpening/types'
import { SelectWorkingGroup } from '@/working-groups/components/SelectWorkingGroup'
import { GroupIdName } from '@/working-groups/types'

interface Props extends WorkingGroupAndDescriptionParameters {
  setTitle(title: string): void
  setDescription(description: string): void
  setShortDescription(shortDescription: string): void
  setGroupId(groupId: GroupIdName): void
}

const schema = Yup.object().shape({
  title: Yup.string().max(55, 'Max length is 55 characters'),
})

export const WorkingGroupAndDescription = ({
  groupId,
  setGroupId,
  title,
  setTitle,
  description,
  setDescription,
  shortDescription,
  setShortDescription,
}: Props) => {
  const { errors } = useSchema({ title }, schema)

  return (
    <RowGapBlock gap={24}>
      <Row>
        <RowGapBlock gap={8}>
          <h4>Specific parameters</h4>
          <TextMedium lighter>Create Working Group Lead Opening</TextMedium>
        </RowGapBlock>
      </Row>
      <Row>
        <RowGapBlock gap={20}>
          <InputComponent
            id="working-group-select"
            label="Working Group"
            required
            inputSize="l"
            tooltipText="Please select an identifier for working group"
          >
            <SelectWorkingGroup
              id="working-group-select"
              selectedGroupId={groupId}
              onChange={(selected) => setGroupId(selected.id)}
            />
          </InputComponent>
          <InputComponent
            id="opening-title"
            label="Opening title"
            required
            inputSize="m"
            message={hasError('title', errors) ? getErrorMessage('title', errors) : 'MAX 55'}
            validation={hasError('title', errors) ? 'invalid' : undefined}
          >
            <InputText
              id="opening-title"
              value={title ?? ''}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="Opening title"
            />
          </InputComponent>
          <InputComponent id="short-description" label="Short description" required inputSize="l">
            <InputTextarea
              id="short-description"
              value={shortDescription}
              onChange={(event) => setShortDescription(event.target.value)}
            />
          </InputComponent>
          <InputComponent label="Description" required inputSize="auto" id="field-description">
            <CKEditor
              id="field-description"
              onReady={(editor) => editor.setData(description || '')}
              onChange={(event, editor) => setDescription(editor.getData())}
            />
          </InputComponent>
        </RowGapBlock>
      </Row>
    </RowGapBlock>
  )
}
