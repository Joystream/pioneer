import React, { useEffect, useCallback, useReducer } from 'react'
import { useFormContext } from 'react-hook-form'
import * as Yup from 'yup'

import { FileEntry, FileInput } from '@/common/components/forms/FileInput'
import { JOY_DECIMAL_PLACES } from '@/common/constants'
import { GroupIdName } from '@/working-groups/types'

import { CreateOpeningForm, OpeningSchema } from '../types'

type Value = FileEntry & { formContent?: CreateOpeningForm }
type Action = { type: 'set-file'; value: File } | { type: 'set-content'; value: string;  groupId?: GroupIdName}

interface Props {
  groupId?: GroupIdName
}

const parseContent = (contentJson: any, groupId?: GroupIdName): Pick<Value, 'errors' | 'formContent'> => {
  try {
    const fileContent = JSON.parse(contentJson)
    const formContent: CreateOpeningForm = {
      target: fileContent.hiringLimit,
      applicationForm: {
        questions: fileContent.applicationFormQuestions?.map((qValue: any) => {
          return {questionField: qValue.question, shortValue: qValue.type === 'TEXT'}
        })
      },
      durationAndProcess: {
        duration: 100000,
        details: fileContent.applicationDetails,
        isLimited: false,
      },
      stakingPolicyAndReward: {
        stakingAmount: fileContent.stakingPolicy?.amount,
        leavingUnstakingPeriod: fileContent.stakingPolicy?.unstakingPeriod,
        rewardPerBlock: fileContent.rewardPerBlock
      },
      workingGroupAndDescription: {
        groupId: groupId,
        title: fileContent.title,
        description: fileContent.description,
        shortDescription: fileContent.shortDescription
      }
    }
    OpeningSchema.validateSync(formContent)
    return { formContent, errors: [] }
  } catch (error) {
    if (error instanceof SyntaxError) {
      return { errors: [new Yup.ValidationError(error.message)] }
    } else if (error instanceof Yup.ValidationError) {
      return { errors: [error] }
    } else throw error
  }
}

const valueReducer = (value: undefined | Value, action: Action,): undefined | Value => {
  switch (action.type) {
    case 'set-file':
      return { file: action.value }

    case 'set-content':
      if (value) {
        return { file: value.file, ...parseContent(action.value,action.groupId) }
      }
  }
}

export const ImportOpening = ({ groupId }: Props) => {
  const [value, dispatch] = useReducer(valueReducer, undefined)
  const form = useFormContext<CreateOpeningForm>()
  

  const onUpload = useCallback(async ([file]: File[]) => {
    if (!file) return
    dispatch({ type: 'set-file', value: file })
    const contentJson = await file.text()
    dispatch({ type: 'set-content', value: contentJson, groupId })
  }, [])

  useEffect(() => {
    if(value?.formContent){
      form.setValue('target',value.formContent.target)
      form.setValue('applicationForm.questions', value.formContent.applicationForm.questions)
      form.setValue('durationAndProcess.duration', value.formContent.durationAndProcess.duration)
      form.setValue('durationAndProcess.details', value.formContent.durationAndProcess.details)
      form.setValue('stakingPolicyAndReward.stakingAmount', value.formContent.stakingPolicyAndReward.stakingAmount * Math.pow(10,JOY_DECIMAL_PLACES))
      form.setValue('stakingPolicyAndReward.leavingUnstakingPeriod', value.formContent.stakingPolicyAndReward.leavingUnstakingPeriod)
      form.setValue('stakingPolicyAndReward.rewardPerBlock', value.formContent.stakingPolicyAndReward.rewardPerBlock * Math.pow(10,JOY_DECIMAL_PLACES))
      form.setValue('workingGroupAndDescription.groupId', value.formContent.workingGroupAndDescription.groupId)
      form.setValue('workingGroupAndDescription.title', value.formContent.workingGroupAndDescription.title)
      form.setValue('workingGroupAndDescription.description', value.formContent.workingGroupAndDescription.description)
      form.setValue('workingGroupAndDescription.shortDescription', value.formContent.workingGroupAndDescription.shortDescription)
      form.trigger()
    }
  },[value])
  /**
  useEffect(() => {
    if (value?.content) {
      handleChange(value.content)
      onHide()
    }
  }, [value])
**/

  return (
    <>
      Note: This will override current form input.
      <FileInput title="Drag and drop file here to restore" accept="application/json" value={[]} onChange={onUpload} />
      {value?.errors?.length && value.errors.length > 0 ? value.errors.map((error, index) => <div key={index}>{new String(error)}</div>):''}
      {value?.formContent && 'File imported successfully, preview your input'}
    </>
  )
}
