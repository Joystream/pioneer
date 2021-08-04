import React from 'react'

import { CKEditor } from '@/common/components/CKEditor'
import { InputComponent, InputTextarea } from '@/common/components/forms'
import { Row } from '@/common/components/Modal'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { TextMedium } from '@/common/components/typography'
import { WorkingGroupAndOpeningDetailsParameters } from '@/proposals/modals/AddNewProposal/components/SpecificParameters/WorkingGroupLeadOpening/types'
import { SelectWorkingGroup } from '@/working-groups/components/SelectWorkingGroup'

interface Props extends WorkingGroupAndOpeningDetailsParameters {
  setDescription(description: string): void
  setShortDescription(shortDescription: string): void
  setGroupId(groupId: string): void
}

export const CreateWorkingGroupLeadOpening = ({
  groupId,
  setGroupId,
  description,
  setDescription,
  shortDescription,
  setShortDescription,
}: Props) => {
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
          <InputComponent label="Short description" required inputSize="l">
            <InputTextarea value={shortDescription} onChange={(event) => setShortDescription(event.target.value)} />
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
