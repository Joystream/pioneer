import React, { useEffect } from 'react'
import { useFormContext } from 'react-hook-form'

import { CKEditor } from '@/common/components/CKEditor'
import { InputComponent, InputText, InputTextarea } from '@/common/components/forms'
import { Row } from '@/common/components/Modal'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { SelectWorkingGroup } from '@/working-groups/components/SelectWorkingGroup'
import { GroupIdToGroupParam } from '@/working-groups/constants'
import { GroupIdName } from '@/working-groups/types'

interface Props {
  groupId?: GroupIdName
}

export const WorkingGroupAndDescription = ({ groupId }: Props) => {
  const { watch, setValue } = useFormContext()
  const MappedGroupedParams = {
    ...GroupIdToGroupParam,
    operationsWorkingGroupAlpha: 'Builders',
    operationsWorkingGroupBeta: 'HR',
    operationsWorkingGroupGamma: 'Marketing',
  }

  useEffect(() => {
    setValue('workingGroupAndDescription.groupId', groupId, { shouldValidate: true })
    setValue('groupId', groupId)
  }, [groupId])

  return (
    <Row>
      <RowGapBlock gap={20}>
        {groupId ? (
          <div>Group: {MappedGroupedParams[groupId]}</div>
        ) : (
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
        )}
        <InputComponent
          id="opening-title"
          label="Opening title"
          required
          inputSize="m"
          name="workingGroupAndDescription.title"
        >
          <InputText id="opening-title" name="workingGroupAndDescription.title" placeholder="Opening title" />
        </InputComponent>
        <InputComponent
          id="short-description"
          label="Short description"
          name="workingGroupAndDescription.shortDescription"
          required
          inputSize="l"
        >
          <InputTextarea id="short-description" name="workingGroupAndDescription.shortDescription" />
        </InputComponent>
        <InputComponent
          label="Description"
          required
          inputSize="auto"
          id="field-description"
          name="workingGroupAndDescription.description"
        >
          <CKEditor id="field-description" name="workingGroupAndDescription.description" />
        </InputComponent>
      </RowGapBlock>
    </Row>
  )
}
