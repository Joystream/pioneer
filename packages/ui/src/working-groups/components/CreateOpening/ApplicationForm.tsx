import React from 'react'
import { useFormContext } from 'react-hook-form'

import EditableInputList from '@/common/components/EditableInputList/EditableInputList'

export const ApplicationForm = () => {
  const { watch, setValue } = useFormContext()
  return (
    <EditableInputList
      title="Application form"
      buttonText="Add new question"
      value={watch('applicationForm.questions')}
      onChange={(questions) => setValue('applicationForm.questions', questions, { shouldValidate: true })}
    />
  )
}
