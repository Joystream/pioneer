import React from 'react'
import { useFormContext } from 'react-hook-form'

import { CKEditor } from '@/common/components/CKEditor'
import { InputComponent, InputText, InputTextarea } from '@/common/components/forms'
import { Row } from '@/common/components/Modal'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { TextMedium } from '@/common/components/typography'
import { ValidationHelpers } from '@/common/utils/validation'
import { SelectWorkingGroup } from '@/working-groups/components/SelectWorkingGroup'

export const WorkingGroupAndDescription = ({ errorMessageGetter, errorChecker }: ValidationHelpers) => {
  const { watch, setValue } = useFormContext()
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
              selectedGroupId={watch('workingGroupAndDescription.groupId')}
              onChange={(selected) => {
                setValue('workingGroupAndDescription.groupId', selected.id, { shouldValidate: true })
                setValue('groupId', selected.id)
              }}
            />
          </InputComponent>
          <InputComponent
            id="opening-title"
            label="Opening title"
            required
            inputSize="m"
            message={errorChecker('title') ? errorMessageGetter('title') : 'MAX 55'}
            validation={errorChecker('title') ? 'invalid' : undefined}
          >
            <InputText id="opening-title" name="workingGroupAndDescription.title" placeholder="Opening title" />
          </InputComponent>
          <InputComponent id="short-description" label="Short description" required inputSize="l">
            <InputTextarea id="short-description" name="workingGroupAndDescription.shortDescription" />
          </InputComponent>
          <InputComponent label="Description" required inputSize="auto" id="field-description">
            <CKEditor id="field-description" name="workingGroupAndDescription.description" />
          </InputComponent>
        </RowGapBlock>
      </Row>
    </RowGapBlock>
  )
}
