import { FileError } from 'react-dropzone'
import { FieldErrors } from 'react-hook-form'
import * as Yup from 'yup'

import { convertYupErrorVectorToFieldErrors } from '@/common/utils/validation'

const ChannelPayoutsSchema = Yup.array().of(
  Yup.object().shape({
    channelId: Yup.number().required('This field is required'),
    cumulativeRewardEarned: Yup.string().required('This field is required'),
    reason: Yup.string().required('This field is required'),
  })
)

const channelPayoutSchemaErrorsToSingleMessage = (errors: FieldErrors) => {
  const rowsWithProblems = Object.keys(errors).map((errorKey) => errorKey.split('.')[0].charAt(1))

  return `Invaild interface at payouts with index: ${rowsWithProblems.join(', ')}`
}

export const channelPayoutsFileValidator = (file: ValidatedFile): FileError | null => {
  let fileJSON
  try {
    fileJSON = JSON.parse(file.parsedText ?? '')
  } catch (e) {
    return {
      code: 'invaild-json',
      message: 'File is not valid JSON',
    }
  }

  try {
    ChannelPayoutsSchema.validateSync(fileJSON, { abortEarly: false, stripUnknown: true })

    return null
  } catch (e: any) {
    return {
      code: 'json-invaild-schema',
      message: channelPayoutSchemaErrorsToSingleMessage(convertYupErrorVectorToFieldErrors(e.inner ?? [])),
    }
  }
}

interface ValidatedFile extends File {
  isValidJSON?: boolean
  parsedText?: string
}

export const getChannelPayoutsValidatedFiles = async (files: File[]): Promise<ValidatedFile[]> => {
  const transformedFiles = []

  for (let i = 0; i < files.length; i++) {
    const file = files[i]
    if (file) {
      const text = await file.text()
      const isValidJSON = validateJSON(text)
      Object.assign(file, { isValidJSON, parsedText: text })
      transformedFiles.push(file)
    }
  }

  return transformedFiles
}

const validateJSON = (text: string): boolean => {
  try {
    JSON.parse(text)
    return true
  } catch (e) {
    return false
  }
}
